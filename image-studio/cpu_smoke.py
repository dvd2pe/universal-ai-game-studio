"""Real CPU-only image-generation smoke test using Diffusers' tiny test checkpoint.

This validates the inference path and PNG output. The checkpoint is deliberately
small and is not representative of production image quality.
"""
import os
from pathlib import Path

import torch
from diffusers import StableDiffusionPipeline
from PIL import Image

torch.set_num_threads(min(2, os.cpu_count() or 1))
torch.manual_seed(1234)

model_id = "hf-internal-testing/tiny-stable-diffusion-pipe"
output_dir = Path(os.environ.get("IMAGE_STUDIO_OUTPUT", "outputs"))
output_dir.mkdir(parents=True, exist_ok=True)
output_path = output_dir / "cpu-smoke-test.png"

pipe = StableDiffusionPipeline.from_pretrained(
    model_id,
    torch_dtype=torch.float32,
    safety_checker=None,
    requires_safety_checker=False,
).to("cpu")
pipe.set_progress_bar_config(disable=True)

with torch.inference_mode():
    result = pipe(
        prompt="a small red apple on a plain table",
        height=64,
        width=64,
        num_inference_steps=2,
        guidance_scale=7.5,
        generator=torch.Generator(device="cpu").manual_seed(1234),
    )

image = result.images[0]
if not isinstance(image, Image.Image):
    raise TypeError("Pipeline did not return a PIL image")
image.save(output_path, format="PNG")
with Image.open(output_path) as check:
    check.verify()
with Image.open(output_path) as check:
    if check.format != "PNG" or check.width <= 0 or check.height <= 0:
        raise RuntimeError("Invalid generated PNG")

print(f"CPU inference succeeded: {output_path} ({image.width}x{image.height})")
