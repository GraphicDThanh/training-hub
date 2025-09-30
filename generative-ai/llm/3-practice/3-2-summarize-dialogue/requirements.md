## PRACTICE 2
For this practice, we will examine a few techniques of Prompt Engineering to achieve the desired results. To gain a better understanding, we will need to practice with two models: Google Flan T5 Base and GPT-3.5 Turbo. This practice will consist of two parts:
1. Utilizing the Google/Flan-T5-Base Hugging Face Inference API (refer to the Inference API on the right side):
https://huggingface.co/google/flan-t5-base
2. Hands-on practice using OpenAI's Playground

### Requirements:
- Dataset: https://huggingface.co/datasets/knkarthick/dialogsum
    - Utilize this dataset for practicing and evaluating the result.
- Summarize Dialogue without Prompt Engineering.
- Summarize Dialogue with an Instruction Prompt.
    - Zero Shot Inference with an Instruction Prompt.
- Summarize Dialogue with One Shot and Few Shot Inference.
    - One Shot Inference.
    - Few Shot Inference.
- [For OpenAI Playground Chat] Generative Configuration Parameters for Inference.
You can change the configuration parameters of the method to see a different output from the LLM.


### Models
| Model | Size parameters | Link |
| --- | --- | --- |
| Google/Flan-T5-Base | 248M | https://huggingface.co/google/flan-t5-base |
| GPT-3.5 Turbo | 175B | https://platform.openai.com/playground/chat?models=gpt-3.5-turbo |