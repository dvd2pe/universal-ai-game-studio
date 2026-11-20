# Open Image Studio (Kaggle GPU, no ComfyUI)

A direct Gradio studio for prompt-to-image and instruction-based image editing. The Kaggle notebook launches the app; models load only when selected and GPU work is serialized through Gradio's queue.

## Integrated models

| Model | Task | Runtime notes |
|---|---|---|
| Z-Image Turbo | Text to image | Diffusers pipeline with model CPU offload. |
| Qwen Image 2.1 Turbo | Text to image | NF4 4-bit quantization for the transformer and text encoder. |
| Qwen Image Edit 2509 | Image editing | Upload a source image and describe the requested edit; NF4 quantization. |
| FLUX.1 Schnell | Text to image | Experimental on Kaggle T4; CPU offload, high host-RAM and download requirements. Uses the distilled 4-step / guidance 0 recipe. |
| MOSS-Image Base | Text to image, typography and layout | Official custom Diffusers pipeline. The loader uses `trust_remote_code=True`; review the model repository code and license before running. |

No ComfyUI, node graphs, or manual code edits per prompt. The app also includes a CPU Lite test backend, and GitHub Actions runs an actual tiny-model CPU inference test.

## Start on Kaggle

1. Open `image-studio/notebooks/ImageStudio_Kaggle.ipynb` in Kaggle (or download/import it).
2. Enable Internet and a GPU accelerator.
3. Run the launcher cell. It checks out this branch, installs dependencies, and starts the web UI.
4. Open the temporary Gradio public URL printed by the cell.
5. Download generated PNGs from `/kaggle/working/outputs` before the session ends.

Keep the Kaggle session running while generating. The notebook currently saves to Kaggle session storage; Google Drive persistence is not configured.

## CPU-only mode (GitHub Actions or local CPU)\n\n- Select **CPU Lite · tiny test model** in the app to run a real, very small Stable Diffusion test checkpoint on CPU without CUDA. It generates a 64×64 image and is intended only to validate the inference path; output quality is deliberately poor and it is not a production model.\n- The separate GitHub Actions workflow installs CPU-only PyTorch, downloads the same tiny checkpoint, performs two inference steps, validates the PNG, and uploads it as the `image-studio-cpu-smoke` artifact (retained for 7 days).\n- This proves CPU inference works for the tiny fixture; it does not mean the large Z-Image, Qwen, FLUX, or MOSS models can run practically on GitHub-hosted CPU runners.\n\n## Hardware and model selection

- Z-Image Turbo is the recommended first model to try on a T4.
- Qwen Turbo and Qwen Edit use 4-bit NF4 quantization. Edit is heavier than text-to-image.
- FLUX.1 Schnell is included as an experimental backend. Its weights and CPU offload can exceed Kaggle host RAM or session storage limits; use a larger accelerator/runtime if it fails to load.
- MOSS-Image has a custom pipeline and can use substantial system RAM. Its official repository documents lower-memory modes in its own Gradio application; this simple adapter does not expose all those modes.
- HiDream-I1 Full/Dev/Fast are not enabled: the published checkpoints are very large (about 47 GB). PixelDiT is not enabled: the available Diffusers path requires a separate model conversion/checkpoint workflow and its cited checkpoint license is non-commercial research/evaluation. Neither is presented as a ready-to-run Kaggle option.

## Runtime behavior and limitations

- Models are loaded lazily and only one pipeline is retained at a time.
- Gradio queue is in-memory and session-scoped; it is not a durable job queue.
- Output PNGs remain in `/kaggle/working/outputs` only until the Kaggle session ends.
- The first run downloads dependencies and model weights; allow time and disk space.
- The `Image Studio Checks` workflow checks Python compilation and notebook syntax. The separate `Image Studio CPU Inference` workflow performs a real CPU inference with a tiny test checkpoint and uploads the PNG. Neither proves GPU compatibility, quality, or successful inference of the large models on Kaggle.
- Model weights and remote pipeline code are governed by their respective licenses and terms. Review them before commercial use.

## References

- [Z-Image Turbo](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo)
- [Qwen Image 2.1 Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo)
- [Qwen Image Edit 2509](https://huggingface.co/Qwen/Qwen-Image-Edit-2509)
- [FLUX.1 Schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell)
- [MOSS-Image Base](https://huggingface.co/OpenMOSS-Team/MOSS-Image-Base)
- [HiDream-I1 Full](https://huggingface.co/HiDream-ai/HiDream-I1-Full)
- [PixelDiT Diffusers conversion](https://huggingface.co/BiliSakura/PixelDiT-diffusers)
