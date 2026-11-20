 # Image Studio (Kaggle GPU, no ComfyUI)

A direct Gradio studio for prompt-to-image and image editing. The Kaggle notebook is the launcher; the app loads only the selected model and serializes GPU work through Gradio's queue.

## Supported pipelines
- Z-Image Turbo — fast text-to-image (Tongyi-MAI/Z-Image-Turbo).
- Qwen Image 2.1 Turbo — text-to-image (Qwen/Qwen-Image-2.1-Turbo).
- Qwen Image Edit 2509 — instruction-based image editing (Qwen/Qwen-Image-Edit-2509).

No ComfyUI, no node graphs, no manual code edits per prompt.

## Start on Kaggle
1. Open notebooks/ImageStudio_Kaggle.ipynb in this repository in Kaggle (or download/import it).
2. Enable Internet and a GPU accelerator (T4 x1/x2 or better).
3. Run the single launcher cell. It mounts Google Drive when available, installs dependencies, checks out this branch, and starts the web UI.
4. Open the Gradio public URL printed by the cell. Keep the Kaggle session running while jobs are processing.

Generated images are saved under MyDrive/OpenImageHub/outputs when Drive is mounted.

## Runtime notes
- Kaggle GPU sessions are temporary; the notebook must remain active.
- The first run downloads dependencies and model weights.
- Qwen Image Edit 2509 is significantly heavier than Turbo generation and may require a larger GPU or memory optimizations.
- GPU inference has not yet been validated in this environment. Verify actual outputs on the selected Kaggle accelerator.
- Model weights are governed by their own licenses; review each model card before commercial use.
