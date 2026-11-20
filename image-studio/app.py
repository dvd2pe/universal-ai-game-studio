import gc
import os
import time
from pathlib import Path

os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")
os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

import gradio as gr
import torch

OUTPUT_DIR = Path(os.environ.get("IMAGE_STUDIO_OUTPUT", "outputs"))
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# key -> (kind, Hugging Face model id, UI label)
MODEL_ROWS = [
    ("zimage", "zimage", "Tongyi-MAI/Z-Image-Turbo", "Z-Image Turbo · fast text to image"),
    ("qwen21", "qwen21", "Qwen/Qwen-Image-2.1-Turbo", "Qwen Image 2.1 Turbo · text to image"),
    ("qwen_edit", "qwen_edit", "Qwen/Qwen-Image-Edit-2509", "Qwen Image Edit 2509 · image editing"),
    ("flux_schnell", "flux", "black-forest-labs/FLUX.1-schnell", "FLUX.1 Schnell · experimental / high RAM"),
    ("moss", "moss", "OpenMOSS-Team/MOSS-Image-Base", "MOSS-Image Base · text rendering / layout"),
    ("cpu_tiny", "cpu_tiny", "hf-internal-testing/tiny-stable-diffusion-pipe", "CPU Lite · tiny test model (low quality)"),
]
MODELS = {label: (key, kind, model_id) for key, kind, model_id, label in MODEL_ROWS}
_PIPELINES = {}


def _qwen_nf4_config():
    from diffusers.quantizers import PipelineQuantizationConfig
    return PipelineQuantizationConfig(
        quant_backend="bitsandbytes_4bit",
        quant_kwargs={
            "load_in_4bit": True,
            "bnb_4bit_quant_type": "nf4",
            "bnb_4bit_compute_dtype": torch.float16,
            "bnb_4bit_use_double_quant": True,
        },
        components_to_quantize=["transformer", "text_encoder"],
    )


def load_pipeline(key):
    row = next(row for row in MODEL_ROWS if row[0] == key)
    _, kind, model_id, _ = row
    if kind != "cpu_tiny" and not torch.cuda.is_available():
        raise gr.Error("This model requires a CUDA GPU. Choose CPU Lite for CPU-only testing.")
    if key in _PIPELINES:
        return _PIPELINES[key]

    # Keep only one large model resident; release the previous model before loading.
    _PIPELINES.clear()
    gc.collect()
    if torch.cuda.is_available():
        torch.cuda.empty_cache()

    dtype = torch.float16

    if kind == "cpu_tiny":
        from diffusers import StableDiffusionPipeline
        pipe = StableDiffusionPipeline.from_pretrained(
            model_id, torch_dtype=torch.float32,
            safety_checker=None, requires_safety_checker=False,
        ).to("cpu")
        pipe.set_progress_bar_config(disable=True)
    elif kind == "zimage":
        from diffusers import ZImagePipeline
        pipe = ZImagePipeline.from_pretrained(
            model_id, dtype=dtype, low_cpu_mem_usage=True
        )
        pipe.enable_model_cpu_offload()
    elif kind == "flux":
        from diffusers import FluxPipeline
        pipe = FluxPipeline.from_pretrained(
            model_id, dtype=dtype, low_cpu_mem_usage=True
        )
        pipe.enable_model_cpu_offload()
    elif kind == "moss":
        # Official MOSS-Image custom Diffusers pipeline; review remote model code
        # and its license before use. Float16 is selected for T4 compatibility.
        from diffusers import DiffusionPipeline
        pipe = DiffusionPipeline.from_pretrained(
            model_id,
            custom_pipeline="pipeline_moss_image",
            trust_remote_code=True,
            torch_dtype={"default": dtype, "vae": torch.float32},
            low_cpu_mem_usage=True,
        )
        pipe.to("cuda")
    else:
        quant_config = _qwen_nf4_config()
        if kind == "qwen21":
            from diffusers import QwenImage21Pipeline
            pipeline_cls = QwenImage21Pipeline
        else:
            from diffusers import QwenImageEditPlusPipeline
            pipeline_cls = QwenImageEditPlusPipeline
        pipe = pipeline_cls.from_pretrained(
            model_id,
            dtype=dtype,
            quantization_config=quant_config,
            low_cpu_mem_usage=True,
            device_map="cuda",
        )

    vae = getattr(pipe, "vae", None)
    if vae is not None:
        try:
            vae.enable_tiling()
            vae.enable_slicing()
        except Exception:
            pass
    _PIPELINES[key] = pipe
    return pipe


def generate(model_label, prompt, source_image, width, height, steps, seed):
    if not prompt or not prompt.strip():
        raise gr.Error("Enter a prompt.")

    key, kind, _ = MODELS[model_label]
    editing = kind == "qwen_edit"
    if editing and source_image is None:
        raise gr.Error("Upload a source image for editing.")
    if not editing and source_image is not None:
        raise gr.Error("Select Qwen Image Edit 2509 to use a source image.")

    width, height, steps = int(width), int(height), int(steps)
    if kind == "moss" and (width % 16 or height % 16):
        raise gr.Error("MOSS-Image dimensions must be multiples of 16.")

    pipe = load_pipeline(key)
    seed_value = int(seed)
    generator_device = "cpu" if kind in ("moss", "cpu_tiny") else "cuda"
    generator = torch.Generator(device=generator_device).manual_seed(seed_value) if seed_value >= 0 else None
    started = time.time()

    with torch.inference_mode():
        if kind == "cpu_tiny":
            # This is a tiny pipeline fixture for CPU functionality checks, not a quality model.
            result = pipe(
                prompt=prompt, width=64, height=64,
                num_inference_steps=2, guidance_scale=7.5,
                generator=generator,
            )
        elif kind == "zimage":
            result = pipe(
                prompt=prompt, width=width, height=height,
                num_inference_steps=steps, generator=generator,
            )
        elif kind == "qwen21":
            result = pipe(
                prompt=prompt, width=width, height=height,
                num_inference_steps=steps, true_cfg_scale=1.0,
                generator=generator,
            )
        elif kind == "qwen_edit":
            result = pipe(
                image=source_image.convert("RGB"), prompt=prompt,
                num_inference_steps=steps, true_cfg_scale=4.0,
                generator=generator,
            )
        elif kind == "flux":
            # FLUX.1 Schnell is timestep-distilled: guidance 0 and 4 steps.
            result = pipe(
                prompt=prompt, width=width, height=height,
                num_inference_steps=min(steps, 4), guidance_scale=0.0,
                max_sequence_length=256, generator=generator,
            )
        else:
            result = pipe(
                prompt, height=height, width=width,
                num_inference_steps=steps, guidance_scale=3.0,
                uncond_skip_layers=[22], generator=generator,
            )

    image = result.images[0]
    stamp = time.strftime("%Y%m%d-%H%M%S")
    filename = f"{key}-{stamp}-{time.time_ns() % 1000000:06d}-{seed_value}.png"
    path = OUTPUT_DIR / filename
    image.save(path, format="PNG")
    return image, str(path), (
        f"Completed in {time.time()-started:.1f}s · "
        f"{image.width}×{image.height} · seed {seed_value}"
    )


with gr.Blocks(title="Open Image Studio", theme=gr.themes.Soft()) as demo:
    gr.Markdown(
        "# Open Image Studio\n"
        "Prompt-to-image and instruction-based editing. No node graphs or ComfyUI."
    )
    with gr.Row():
        with gr.Column():
            model = gr.Dropdown(
                list(MODELS), value=list(MODELS)[0], label="Model"
            )
            prompt = gr.Textbox(label="Prompt / edit instruction", lines=5)
            source = gr.Image(type="pil", label="Source image (Qwen Edit only)")
            with gr.Row():
                width = gr.Dropdown(
                    [512, 640, 768, 896, 1024], value=768, label="Width"
                )
                height = gr.Dropdown(
                    [512, 640, 768, 896, 1024], value=768, label="Height"
                )
            with gr.Row():
                steps = gr.Slider(4, 50, value=9, step=1, label="Steps")
                seed = gr.Number(value=-1, precision=0, label="Seed (-1 = random)")
            run = gr.Button("Generate", variant="primary")
        with gr.Column():
            output = gr.Image(type="pil", label="Result")
            saved = gr.Textbox(label="Saved PNG", interactive=False)
            status = gr.Textbox(label="Status", interactive=False)

    run.click(
        generate, [model, prompt, source, width, height, steps, seed],
        [output, saved, status], concurrency_limit=1,
    )
    gr.Markdown(
        "**CPU Lite** uses a tiny test-only Stable Diffusion checkpoint at 64×64; "
        "it proves the CPU path works but is not intended for attractive outputs. "
        "Z-Image and FLUX use CPU offload; Qwen uses NF4 quantization; MOSS uses "
        "its official custom pipeline. FLUX and MOSS may need substantial host RAM. "
        "Models load on first use, one at a time."
    )

demo.queue(default_concurrency_limit=1, max_size=32).launch(
    server_name="0.0.0.0", share=True, show_error=True
)
