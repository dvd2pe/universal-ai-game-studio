import os
import gc
import time
from pathlib import Path

import gradio as gr
import torch

OUTPUT_DIR = Path(os.environ.get("IMAGE_STUDIO_OUTPUT", "outputs"))
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

MODELS = {
    "Z-Image Turbo · fast text to image": ("zimage", "Tongyi-MAI/Z-Image-Turbo"),
    "Qwen Image 2.1 Turbo · text to image": ("qwen21", "Qwen/Qwen-Image-2.1-Turbo"),
    "Qwen Image Edit 2509 · image editing": ("qwen_edit", "Qwen/Qwen-Image-Edit-2509"),
}
_PIPELINES = {}

def load_pipeline(key):
    if not torch.cuda.is_available():
        raise gr.Error("CUDA GPU required. Enable a Kaggle GPU accelerator.")
    if key in _PIPELINES:
        return _PIPELINES[key]
    for old in list(_PIPELINES.values()):
        del old
    _PIPELINES.clear()
    gc.collect()
    torch.cuda.empty_cache()
    kind, model_id = MODELS[key]
    dtype = torch.bfloat16 if torch.cuda.is_bf16_supported() else torch.float16
    if kind == "zimage":
        from diffusers import ZImagePipeline
        pipe = ZImagePipeline.from_pretrained(model_id, torch_dtype=dtype)
    elif kind == "qwen21":
        from diffusers import QwenImage21Pipeline
        pipe = QwenImage21Pipeline.from_pretrained(model_id, torch_dtype=dtype)
    else:
        from diffusers import QwenImageEditPlusPipeline
        pipe = QwenImageEditPlusPipeline.from_pretrained(model_id, torch_dtype=dtype)
    pipe.to("cuda")
    _PIPELINES[key] = pipe
    return pipe

def generate(model_label, prompt, source_image, width, height, steps, seed):
    if not prompt or not prompt.strip():
        raise gr.Error("Enter a prompt.")
    key = MODELS[model_label][0]
    editing = key == "qwen_edit"
    if editing and source_image is None:
        raise gr.Error("Upload a source image for editing.")
    if not editing and source_image is not None:
        raise gr.Error("Select Qwen Image Edit to use a source image.")
    pipe = load_pipeline(key)
    generator = torch.Generator(device="cuda").manual_seed(int(seed)) if int(seed) >= 0 else None
    started = time.time()
    with torch.inference_mode():
        if key == "zimage":
            image = pipe(prompt=prompt, width=int(width), height=int(height),
                         num_inference_steps=int(steps), generator=generator).images[0]
        elif key == "qwen21":
            image = pipe(prompt=prompt, width=int(width), height=int(height),
                         num_inference_steps=int(steps), generator=generator).images[0]
        else:
            image = pipe(image=source_image.convert("RGB"), prompt=prompt,
                         num_inference_steps=int(steps), generator=generator).images[0]
    stamp = time.strftime("%Y%m%d-%H%M%S")
    path = OUTPUT_DIR / f"{key}-{stamp}-{int(seed)}.png"
    image.save(path, format="PNG")
    return image, str(path), f"Completed in {time.time()-started:.1f}s · {image.width}×{image.height}"

with gr.Blocks(title="Open Image Studio", theme=gr.themes.Soft()) as demo:
    gr.Markdown("# Open Image Studio\nPrompt-to-image and instruction-based editing. No node graphs.")
    with gr.Row():
        with gr.Column():
            model = gr.Dropdown(list(MODELS), value=list(MODELS)[0], label="Model")
            prompt = gr.Textbox(label="Prompt / edit instruction", lines=5)
            source = gr.Image(type="pil", label="Source image (editing only)")
            with gr.Row():
                width = gr.Dropdown([512, 640, 768, 896, 1024], value=768, label="Width")
                height = gr.Dropdown([512, 640, 768, 896, 1024], value=768, label="Height")
            with gr.Row():
                steps = gr.Slider(4, 50, value=9, step=1, label="Steps")
                seed = gr.Number(value=-1, precision=0, label="Seed (-1 = random)")
            run = gr.Button("Generate", variant="primary")
        with gr.Column():
            output = gr.Image(type="pil", label="Result")
            saved = gr.Textbox(label="Saved file", interactive=False)
            status = gr.Textbox(label="Status", interactive=False)
    run.click(generate, [model, prompt, source, width, height, steps, seed],
              [output, saved, status], concurrency_limit=1)
    gr.Markdown("Models load on first use and stay cached for the session. Keep Kaggle running.")
demo.queue(default_concurrency_limit=1, max_size=32).launch(
    server_name="0.0.0.0", share=True, show_error=True
)
