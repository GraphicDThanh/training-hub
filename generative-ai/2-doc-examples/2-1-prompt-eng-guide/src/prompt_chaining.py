from utils import get_completion

if __name__ == "__main__":
    document = """
    Prompt engineering is the process of structuring an instruction that can be interpreted and understood by a generative artificial intelligence (AI) model.[1][2] A prompt is natural language text describing the task that an AI should perform:[3] a prompt for a text-to-text language model can be a query such as "what is Fermat's little theorem?",[4] a command such as "write a poem in the style of Edgar Allan Poe about leaves falling",[5] or a longer statement including context, instructions,[6] and conversation history.

    Prompt engineering may involve phrasing a query, specifying a style,[5] providing relevant context[7] or assigning a role to the AI such as "act as a native French speaker".[8] A prompt may include a few examples for a model to learn from, such as asking the model to complete "maison → house, chat → cat, chien →" (the expected response being dog),[9] an approach called few-shot learning.[10]

    When communicating with a text-to-image or a text-to-audio model, a typical prompt is a description of a desired output such as "a high-quality photo of an astronaut riding a horse"[11] or "Lo-fi slow BPM electro chill with organic samples".[12] Prompting a text-to-image model may involve adding, removing, emphasizing, and re-ordering words to achieve a desired subject, style,[1] layout, lighting,[13] and aesthetic.

    In-context learning
    Prompt engineering is enabled by in-context learning, defined as a model's ability to temporarily learn from prompts. The ability for in-context learning is an emergent ability[14] of large language models. In-context learning itself is an emergent property of model scale, meaning breaks[15] in downstream scaling laws occur such that its efficacy increases at a different rate in larger models than in smaller models.[16][17]

    In contrast to training and fine-tuning for each specific task, which are not temporary, what has been learnt during in-context learning is of a temporary nature. It does not carry the temporary contexts or biases, except the ones already present in the (pre)training dataset, from one conversation to the other.[18] This result of "mesa-optimization"[19][20] within transformer layers, is a form of meta-learning or "learning to learn".[21]

    History
    In 2018, researchers first proposed that all previously separate tasks in NLP could be cast as a question answering problem over a context. In addition, they trained a first single, joint, multi-task model that would answer any task-related question like "What is the sentiment" or "Translate this sentence to German" or "Who is the president?"[22]

    In 2021, researchers fine-tuned one generatively pretrained model (T0) on performing 12 NLP tasks (using 62 datasets, as each task can have multiple datasets). The model showed good performance on new tasks, surpassing models trained directly on just performing one task (without pretraining). To solve a task, T0 is given the task in a structured prompt, for example If {{premise}} is true, is it also true that {{hypothesis}}? ||| {{entailed}}. is the prompt used for making T0 solve entailment.[23]

    A repository for prompts reported that over 2,000 public prompts for around 170 datasets were available in February 2022.[24]

    In 2022 the chain-of-thought prompting technique was proposed by Google researchers.[17][25]

    In 2023 several text-to-text and text-to-image prompt databases were publicly available.[26][27]

    Text-to-text
    Chain-of-thought
    Chain-of-thought (CoT) prompting is a technique that allows large language models (LLMs) to solve a problem as a series of intermediate steps[28] before giving a final answer. Chain-of-thought prompting improves reasoning ability by inducing the model to answer a multi-step problem with steps of reasoning that mimic a train of thought.[29][17][30] It allows large language models to overcome difficulties with some reasoning tasks that require logical thinking and multiple steps to solve, such as arithmetic or commonsense reasoning questions.[31][32][33]

    For example, given the question "Q: The cafeteria had 23 apples. If they used 20 to make lunch and bought 6 more, how many apples do they have?", a CoT prompt might induce the LLM to answer "A: The cafeteria had 23 apples originally. They used 20 to make lunch. So they had 23 - 20 = 3. They bought 6 more apples, so they have 3 + 6 = 9. The answer is 9."[17]

    As originally proposed,[17] each CoT prompt included a few Q&A examples. This made it a few-shot prompting technique. However, simply appending the words "Let's think step-by-step",[34] has also proven effective, which makes CoT a zero-shot prompting technique. This allows for better scaling as a user no longer needs to formulate many specific CoT Q&A examples.[35]

    When applied to PaLM, a 540B parameter language model, CoT prompting significantly aided the model, allowing it to perform comparably with task-specific fine-tuned models on several tasks, achieving state of the art results at the time on the GSM8K mathematical reasoning benchmark.[17] It is possible to fine-tune models on CoT reasoning datasets to enhance this capability further and stimulate better interpretability.[36][37]

    Example:[34]

    Q: {question}
    A: Let's think step by step.
    Other techniques
    Chain-of-thought prompting is just one of many prompt-engineering techniques. Various other techniques have been proposed. At least 29 distinct techniques have been published.[38]

    Chain-of-Symbol (CoS) Prompting

    Chain-of-Symbol prompting in conjunction with CoT prompting assists LLMs with its difficulty of spatial reasoning in text. In other words, using arbitrary symbols such as ' / ' assist the LLM to interpret spacing in text. This assists in reasoning and increases the performance of the LLM.[39]

    Example:[39]

    Input:

    There are a set of bricks. The yellow brick C is on top of the brick E. The yellow brick D is on top of the brick A. The yellow brick E is on top of the brick D. The white brick A is on top of the brick B. For the brick B, the color is white. Now we have to get a specific brick. The bricks must now be grabbed from top to bottom, and if the lower brick is to be grabbed, the upper brick must be removed first. How to get brick D?

    B/A/D/E/C
    C/E
    E/D
    D

    Output:

    So we get the result as C, E, D.
    Generated knowledge prompting
    Generated knowledge prompting[40] first prompts the model to generate relevant facts for completing the prompt, then proceed to complete the prompt. The completion quality is usually higher, as the model can be conditioned on relevant facts.

    Example:[40]

    Generate some knowledge about the concepts in the input.
    Input: {question}
    Knowledge:
    Least-to-most prompting
    Least-to-most prompting[41] prompts a model to first list the sub-problems to a problem, then solve them in sequence, such that later sub-problems can be solved with the help of answers to previous sub-problems.

    Example:[41]

    Input:
    Q: {question}
    A: Let's break down this problem:
        1.
    Self-consistency decoding
    Self-consistency decoding[42] performs several chain-of-thought rollouts, then selects the most commonly reached conclusion out of all the rollouts. If the rollouts disagree by a lot, a human can be queried for the correct chain of thought.[43]

    Complexity-based prompting
    Complexity-based prompting[44] performs several CoT rollouts, then select the rollouts with the longest chains of thought, then select the most commonly reached conclusion out of those.

    Self-refine
    Self-refine[45] prompts the LLM to solve the problem, then prompts the LLM to critique its solution, then prompts the LLM to solve the problem again in view of the problem, solution, and critique. This process is repeated until stopped, either by running out of tokens, time, or by the LLM outputting a "stop" token.

    Example critique:[45]

    I have some code. Give one suggestion to improve readability. Don't fix the code, just give a suggestion.
    Code: {code}
    Suggestion:
    Example refinement:

    Code: {code}
    Let's use this suggestion to improve the code.
    Suggestion: {suggestion}
    New Code:
    Tree-of-thought
    Tree-of-thought prompting[46] generalizes chain-of-thought by prompting the model to generate one or more "possible next steps", and then running the model on each of the possible next steps by breadth-first, beam, or some other method of tree search.[47]

    Maieutic prompting
    Maieutic prompting is similar to tree-of-thought. The model is prompted to answer a question with an explanation. The model is then prompted to explain parts of the explanation, and so on. Inconsistent explanation trees are pruned or discarded. This improves performance on complex commonsense reasoning.[48]

    Example:[48]

    Q: {question}
    A: True, because
    Q: {question}
    A: False, because
    Directional-stimulus prompting
    Directional-stimulus prompting[49] includes a hint or cue, such as desired keywords, to guide a language model toward the desired output.

    Example:[49]

    Article: {article}
    Keywords:
    Article: {article}
    Q: Write a short summary of the article in 2-4 sentences that accurately incorporates the provided keywords.
    Keywords: {keywords}
    A:
    Prompting to disclose uncertainty
    By default, the output of language models may not contain estimates of uncertainty. The model may output text that appears confident, though the underlying token predictions have low likelihood scores. Large language models like GPT-4 can have accurately calibrated likelihood scores in their token predictions,[50] and so the model output uncertainty can be directly estimated by reading out the token prediction likelihood scores.

    But if one cannot access such scores (such as when one is accessing the model through a restrictive API), uncertainty can still be estimated and incorporated into the model output. One simple method is to prompt the model to use words to estimate uncertainty.[51] Another is to prompt the model to refuse to answer in a standardized way if the input does not satisfy conditions.[citation needed]

    Automatic prompt generation
    Retrieval-augmented generation

    This section may be confusing or unclear to readers. In particular, it dives into the technical vector implementation before positioning the overall concept. Please help clarify the section. There might be a discussion about this on the talk page. (July 2024) (Learn how and when to remove this message)

    Two-phase process of document retrieval using dense embeddings and Large Language Model (LLM) for answer formulation
    Retrieval-augmented generation (RAG) is a two-phase process involving document retrieval and answer formulation by a Large Language Model (LLM). The initial phase utilizes dense embeddings to retrieve documents. This retrieval can be based on a variety of database formats depending on the use case, such as a vector database, summary index, tree index, or keyword table index.[52]

    In response to a query, a document retriever selects the most relevant documents. This relevance is typically determined by first encoding both the query and the documents into vectors, then identifying documents whose vectors are closest in Euclidean distance to the query vector. Following document retrieval, the LLM generates an output that incorporates information from both the query and the retrieved documents.[53] This method is particularly beneficial for handling proprietary or dynamic information that was not included in the initial training or fine-tuning phases of the model. RAG is also notable for its use of "few-shot" learning, where the model uses a small number of examples, often automatically retrieved from a database, to inform its outputs.

    Graph retrieval-augmented generation

    GraphRAG with a knowledge graph combining access patterns for unstructured, structured and mixed data.
    GraphRAG,[54] coined by Microsoft Research, extends RAG such that instead of relying solely on vector similarity (as in most RAG approaches), GraphRAG uses the LLM-generated knowledge graph. This graph allows the model to connect disparate pieces of information, synthesize insights, and holistically understand summarized semantic concepts over large data collections.

    Researchers have demonstrated GraphRAG's effectiveness using datasets like the Violent Incident Information from News Articles (VIINA).[55] By combining LLM-generated knowledge graphs with graph machine learning, GraphRAG substantially improves both the comprehensiveness and diversity of generated answers for global sensemaking questions.

    Earlier work showed the effectiveness of using a knowledge graph for question answering using text-to-query generation.[56] These techniques can be combined to perform search across both unstructured and structured data, providing expanded context and improved ranking.

    Using language models to generate prompts
    Large language models (LLM) themselves can be used to compose prompts for large language models.[57][58][59][60]

    The automatic prompt engineer algorithm uses one LLM to beam search over prompts for another LLM:[61]

    There are two LLMs. One is the target LLM, and another is the prompting LLM.
    Prompting LLM is presented with example input-output pairs, and asked to generate instructions that could have caused a model following the instructions to generate the outputs, given the inputs.
    Each of the generated instructions is used to prompt the target LLM, followed by each of the inputs. The log-probabilities of the outputs are computed and added. This is the score of the instruction.
    The highest-scored instructions are given to the prompting LLM for further variations.
    Repeat until some stopping criteria is reached, then output the highest-scored instructions.
    CoT examples can be generated by LLM themselves. In "auto-CoT",[62] a library of questions are converted to vectors by a model such as BERT. The question vectors are clustered. Questions nearest to the centroids of each cluster are selected. An LLM does zero-shot CoT on each question. The resulting CoT examples are added to the dataset. When prompted with a new question, CoT examples to the nearest questions can be retrieved and added to the prompt.

    Text-to-image
    See also: Artificial intelligence art § Prompt engineering and sharing
    In 2022, text-to-image models like DALL-E 2, Stable Diffusion, and Midjourney were released to the public.[63] These models take text prompts as input and use them to generate AI art images. Text-to-image models typically do not understand grammar and sentence structure in the same way as large language models,[64] and require a different set of prompting techniques.

    Prompt formats
    A text-to-image prompt commonly includes a description of the subject of the art (such as bright orange poppies), the desired medium (such as digital painting or photography), style (such as hyperrealistic or pop-art), lighting (such as rim lighting or crepuscular rays), color and texture.[65]

    The Midjourney documentation encourages short, descriptive prompts: instead of "Show me a picture of lots of blooming California poppies, make them bright, vibrant orange, and draw them in an illustrated style with colored pencils", an effective prompt might be "Bright orange California poppies drawn with colored pencils".[64]

    Word order affects the output of a text-to-image prompt. Words closer to the start of a prompt may be emphasized more heavily.[1]

    Artist styles
    Some text-to-image models are capable of imitating the style of particular artists by name. For example, the phrase in the style of Greg Rutkowski has been used in Stable Diffusion and Midjourney prompts to generate images in the distinctive style of Polish digital artist Greg Rutkowski.[66]

    Negative prompts

    Demonstration of the effect of negative prompts on images generated with Stable Diffusion
    Top: no negative prompt
    Centre: "green trees"
    Bottom: "round stones, round rocks"
    Text-to-image models do not natively understand negation. The prompt "a party with no cake" is likely to produce an image including a cake.[64] As an alternative, negative prompts allow a user to indicate, in a separate prompt, which terms should not appear in the resulting image.[67] A common approach is to include generic undesired terms such as ugly, boring, bad anatomy in the negative prompt for an image.

    Text-to-video
    Text-to-video (TTV) generation is an emerging technology enabling the creation of videos directly from textual descriptions. This field holds potential for transforming video production, animation, and storytelling. By utilizing the power of artificial intelligence, TTV allows users to bypass traditional video editing tools and translate their ideas into moving images.

    Models include:

    Runway Gen-2 – Offers a user-friendly interface and supports various video styles
    Lumiere – Designed for high-resolution video generation[68]
    Make-a-Video – Focuses on creating detailed and diverse video outputs[69]
    OpenAI's Sora – As yet unreleased, Sora purportedly can produce high-resolution videos[70][71]
    Non-text prompts
    Some approaches augment or replace natural language text prompts with non-text input.

    Textual inversion and embeddings
    For text-to-image models, "Textual inversion"[72] performs an optimization process to create a new word embedding based on a set of example images. This embedding vector acts as a "pseudo-word" which can be included in a prompt to express the content or style of the examples.

    Image prompting
    In 2023, Meta's AI research released Segment Anything, a computer vision model that can perform image segmentation by prompting. As an alternative to text prompts, Segment Anything can accept bounding boxes, segmentation masks, and foreground/background points.[73]

    Using gradient descent to search for prompts
    In "prefix-tuning",[74] "prompt tuning" or "soft prompting",[75] floating-point-valued vectors are searched directly by gradient descent, to maximize the log-likelihood on outputs.

    Criticism
    While the process of writing and refining a prompt for an LLM or generative AI shares some parallels with an iterative engineering design process, such as through discovering 'best principles' to reuse and discovery through reproducible experimentation, the actual learned principles and skills depend heavily on the specific model being learned rather than being generalizable across the entire field of prompt-based generative models. In other words, learning to manipulate one company's particular generative tool is not rigorous or generalizable enough to be rightfully called a field of engineering.[78]

    Prompt injection
    Main article: Prompt injection
    See also: SQL injection and Cross-site scripting
    Prompt injection is a family of related computer security exploits carried out by getting a machine learning model (such as an LLM) which was trained to follow human-given instructions to follow instructions provided by a malicious user. This stands in contrast to the intended operation of instruction-following systems, wherein the ML model is intended only to follow trusted instructions (prompts) provided by the ML model's operator.[79][80][81]
    """
    system_prompt = f"""
    You are a helpful assistant. Your task is to help answer a question given in a document. The first step is to extract relevant to the question from the document, delimited by ###.
    Please output the list of quotes using <quotes></quotes>.
    Response with "No relevant quotes found" if no relevant quotes were found.

    ###
    {document}
    ###
    """
    prompt_1 = """
    Question: What are the prompting techniques mentioned in the document?
    """
    response_1 = get_completion(system_prompt + prompt_1)
    # Response:
    # <quotes>
    # - Chain-of-thought (CoT) prompting is a technique that allows large language models (LLMs) to solve a problem as a series of intermediate steps[28] before giving a final answer. Chain-of-thought prompting improves reasoning ability by inducing the model to answer a multi-step problem with steps of reasoning that mimic a train of thought.[29][17][30] It allows large language models to overcome difficulties with some reasoning tasks that require logical thinking and multiple steps to solve, such as arithmetic or commonsense reasoning questions.[31][32][33]
    # - Chain-of-Symbol (CoS) prompting in conjunction with CoT prompting assists LLMs with its difficulty of spatial reasoning in text. In other words, using arbitrary symbols such as ' / ' assist the LLM to interpret spacing in text. This assists in reasoning and increases the performance of the LLM.
    # - Self-consistency decoding performs several chain-of-thought rollouts, then selects the most commonly reached conclusion out of all the rollouts. If the rollouts disagree by a lot, a human can be queried for the correct chain of thought.
    # - Complexity-based prompting performs several CoT rollouts, then select the rollouts with the longest chains of thought, then select the most commonly reached conclusion out of those.
    # - Self-refine prompts the LLM to solve the problem, then prompts the LLM to critique its solution, then prompts the LLM to solve the problem again in view of the problem, solution, and critique. This process is repeated until stopped, either by running out of tokens, time, or by the LLM outputting a "stop" token.
    # - Tree-of-thought prompting generalizes chain-of-thought by prompting the model to generate one or more "possible next steps", and then running the model on each of the possible next steps by breadth-first, beam, or some other method of tree search.
    # - Maieutic prompting is similar to tree-of-thought. The model is prompted to answer a question with an explanation. The model is then prompted to explain parts of the explanation, and so on. Inconsistent explanation trees are pruned or discarded. This improves performance on complex commonsense reasoning.
    # - Directional-stimulus prompting includes a hint or cue, such as desired keywords, to guide a language model toward the desired output.
    # </quotes>

    prompt_2 = f"""
    Given a set of relevant quotes (delimited by <quotes></quotes>) extracted from a document and the original document (delimited by ####), please compose an answer to the question. Ensure that the answer is accurate, has a friendly tone, and sounds helpful.
    ####
    {document}
    ####
    {response_1}
    """
    response_2 = get_completion(prompt_2)
    print(response_2)
    # Response:
    # Prompt engineering techniques play a vital role in guiding
    # large language models through complex tasks by breaking them down into manageable steps.
    # Let's explore some of these techniques in more detail:

    # 1. **Chain-of-thought (CoT) prompting**: Allows models to solve problems step-by-step,
    # enhancing reasoning abilities and enabling complex problem-solving.

    # 2. **Chain-of-Symbol (CoS) Prompting**: Aids in spatial reasoning by using symbols
    # to interpret text spacing effectively.

    # 3. **Generated knowledge prompting**: Initiates by generating relevant facts to complete prompts,
    # improving completion quality by leveraging conditioned facts.

    # 4. **Least-to-most prompting**: Guides models to solve sub-problems in sequence,
    # enabling later sub-problems to be tackled based on previous answers.

    # 5. **Self-consistency decoding**: Utilizes multiple chain-of-thought
    # rollouts to select the most commonly reached conclusion.

    # 6. **Complexity-based prompting**: Conducts CoT rollouts to determine
    # the longest chains of thought and select commonly reached conclusions.

    # 7. **Self-refine**: Prompts models to solve problems, critique solutions,
    # and iterate until stopped, leading to refined problem-solving processes.

    # 8. **Tree-of-thought prompting**: Challenges models to generate multiple possible next steps,
    # enhancing problem-solving through structured exploration.

    # 9. **Maieutic prompting**: Encourages models to explain answers and
    # subsequent explanations to improve reasoning and performance.

    # 10. **Directional-stimulus prompting**: Provides cues or keywords
    # to guide models towards desired outputs, aiding in effective prompt responses.

    # By utilizing these diverse prompt engineering techniques,
    # users can empower AI models to navigate intricate tasks
    # with greater precision and efficiency,
    # thereby enhancing problem-solving capabilities and overall performance.
    # Each technique brings a unique approach to prompt formulation,
    # catering to specific needs and complexities within the AI landscape.