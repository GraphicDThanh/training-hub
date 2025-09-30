from io import StringIO
from pprint import pprint

import jsonlines
import pandas as pd
from datasets import load_dataset

# Finetuning data: compare to pretraining and basic preparation

# 1. Look at pretraining data set
# print("Look at pretraining data set!")
# #pretrained_dataset = load_dataset("EleutherAI/pile", split="train", streaming=True)
# pretrained_dataset = load_dataset("allenai/c4", "en", split="train", streaming=True)

# n = 5
# print("Pretrained dataset:")
# top_n = itertools.islice(pretrained_dataset, n)
# for i in top_n:
#   print(i)

# 2. Contrast with company finetuning dataset you will be using
print("Contrast with company finetuning dataset you will be using!")
filename = "./where-finetune-fits-in/lamini_docs.jsonl"
with open(filename, "r") as file:
    json_str = file.read()
instruction_dataset_df = pd.read_json(StringIO(json_str), lines=True)
# print("instruction_dataset_df:")
# print(instruction_dataset_df)

# 3. Various ways of formatting your data
examples = instruction_dataset_df.to_dict()
text = examples["question"][0] + examples["answer"][0]
# print("text example concatenation:")
# print(text)


# if "question" in examples and "answer" in examples:
#   text = examples["question"][0] + examples["answer"][0]
# elif "instruction" in examples and "response" in examples:
#   text = examples["instruction"][0] + examples["response"][0]
# elif "input" in examples and "output" in examples:
#   text = examples["input"][0] + examples["output"][0]
# else:
#   text = examples["text"][0]

prompt_template_qa = """### Question:
{question}

### Answer:
{answer}"""

question = examples["question"][0]
answer = examples["answer"][0]

text_with_prompt_template = prompt_template_qa.format(question=question, answer=answer)
# print("text with prompt template:")
# print(text_with_prompt_template)


# Load the dataset
prompt_template_q = """### Question:
{question}

### Answer:"""
num_examples = len(examples["question"])
finetuning_dataset_text_only = []
finetuning_dataset_question_answer = []
for i in range(num_examples):
    question = examples["question"][i]
    answer = examples["answer"][i]

    text_with_prompt_template_qa = prompt_template_qa.format(
        question=question, answer=answer
    )
    finetuning_dataset_text_only.append({"text": text_with_prompt_template_qa})

    text_with_prompt_template_q = prompt_template_q.format(question=question)
    finetuning_dataset_question_answer.append(
        {"question": text_with_prompt_template_q, "answer": answer}
    )

print("Finetuning dataset text only:")
pprint(finetuning_dataset_text_only[0])
print("Finetuning dataset question answer:")
pprint(finetuning_dataset_question_answer[0])

# 4. Common ways of storing your data
with jsonlines.open(
    "./where-finetune-fits-in/lamini_docs_processed.jsonl", "w"
) as writer:
    writer.write_all(finetuning_dataset_question_answer)

# upload to huggingface
finetuning_dataset_name = "lamini/lamini_docs"
finetuning_dataset = load_dataset(finetuning_dataset_name)
print("Finetuning dataset:")
print(finetuning_dataset)


"""
Look at pretraining data set!
Pretrained dataset:
{'text': 'Beginners BBQ Class Taking Place in Missoula!\nDo you want to get better at making delicious BBQ? You will have the opportunity, put this on your calendar now. Thursday, September 22nd join World Class BBQ Champion, Tony Balay from Lonestar Smoke Rangers. He will be teaching a beginner level class for everyone who wants to get better with their culinary skills.\nHe will teach you everything you need to know to compete in a KCBS BBQ competition, including techniques, recipes, timelines, meat selection and trimming, plus smoker and fire information.\nThe cost to be in the class is $35 per person, and for spectators it is free. Included in the cost will be either a t-shirt or apron and you will be tasting samples of each meat that is prepared.', 'timestamp': '2019-04-25 12:57:54', 'url': 'https://klyq.com/beginners-bbq-class-taking-place-in-missoula/'}
{'text': 'Discussion in \'Mac OS X Lion (10.7)\' started by axboi87, Jan 20, 2012.\nI\'ve got a 500gb internal drive and a 240gb SSD.\nWhen trying to restore using disk utility i\'m given the error "Not enough space on disk ____ to restore"\nBut I shouldn\'t have to do that!!!\nAny ideas or workarounds before resorting to the above?\nUse Carbon Copy Cloner to copy one drive to the other. I\'ve done this several times going from larger HDD to smaller SSD and I wound up with a bootable SSD drive. One step you have to remember not to skip is to use Disk Utility to partition the SSD as GUID partition scheme HFS+ before doing the clone. If it came Apple Partition Scheme, even if you let CCC do the clone, the resulting drive won\'t be bootable. CCC usually works in "file mode" and it can easily copy a larger drive (that\'s mostly empty) onto a smaller drive. If you tell CCC to clone a drive you did NOT boot from, it can work in block copy mode where the destination drive must be the same size or larger than the drive you are cloning from (if I recall).\nI\'ve actually done this somehow on Disk Utility several times (booting from a different drive (or even the dvd) so not running disk utility from the drive your cloning) and had it work just fine from larger to smaller bootable clone. Definitely format the drive cloning to first, as bootable Apple etc..\nThanks for pointing this out. My only experience using DU to go larger to smaller was when I was trying to make a Lion install stick and I was unable to restore InstallESD.dmg to a 4 GB USB stick but of course the reason that wouldn\'t fit is there was slightly more than 4 GB of data.', 'timestamp': '2019-04-21 10:07:13', 'url': 'https://forums.macrumors.com/threads/restore-from-larger-disk-to-smaller-disk.1311329/'}
{'text': 'Foil plaid lycra and spandex shortall with metallic slinky insets. Attached metallic elastic belt with O-ring. Headband included. Great hip hop or jazz dance costume. Made in the USA.', 'timestamp': '2019-04-25 10:40:23', 'url': 'https://awishcometrue.com/Catalogs/Clearance/Tweens/V1960-Find-A-Way'}
{'text': "How many backlinks per day for new site?\nDiscussion in 'Black Hat SEO' started by Omoplata, Dec 3, 2010.\n1) for a newly created site, what's the max # backlinks per day I should do to be safe?\n2) how long do I have to let my site age before I can start making more blinks?\nI did about 6000 forum profiles every 24 hours for 10 days for one of my sites which had a brand new domain.\nThere is three backlinks for every of these forum profile so thats 18 000 backlinks every 24 hours and nothing happened in terms of being penalized or sandboxed. This is now maybe 3 months ago and the site is ranking on first page for a lot of my targeted keywords.\nbuild more you can in starting but do manual submission and not spammy type means manual + relevant to the post.. then after 1 month you can make a big blast..\nWow, dude, you built 18k backlinks a day on a brand new site? How quickly did you rank up? What kind of competition/searches did those keywords have?", 'timestamp': '2019-04-21 12:46:19', 'url': 'https://www.blackhatworld.com/seo/how-many-backlinks-per-day-for-new-site.258615/'}
{'text': 'The Denver Board of Education opened the 2017-18 school year with an update on projects that include new construction, upgrades, heat mitigation and quality learning environments.\nWe are excited that Denver students will be the beneficiaries of a four year, $572 million General Obligation Bond. Since the passage of the bond, our construction team has worked to schedule the projects over the four-year term of the bond.\nDenver voters on Tuesday approved bond and mill funding measures for students in Denver Public Schools, agreeing to invest $572 million in bond funding to build and improve schools and $56.6 million in operating dollars to support proven initiatives, such as early literacy.\nDenver voters say yes to bond and mill levy funding support for DPS students and schools. Click to learn more about the details of the voter-approved bond measure.\nDenver voters on Nov. 8 approved bond and mill funding measures for DPS students and schools. Learn more about what’s included in the mill levy measure.', 'timestamp': '2019-04-20 14:33:21', 'url': 'http://bond.dpsk12.org/category/news/'}


Contrast with company finetuning dataset you will be using!
instruction_dataset_df:
                                               question                                             answer
0     What are the different types of documents avai...  Lamini has documentation on Getting Started, A...
1     What is the recommended way to set up and conf...  Lamini can be downloaded as a python package a...
2     How can I find the specific documentation I ne...  You can ask this model about documentation, wh...
3     Does the documentation include explanations of...  Our documentation provides both real-world and...
4     Does the documentation provide information abo...  External dependencies and libraries are all av...
...                                                 ...                                                ...
1395  What is Lamini and what is its collaboration w...  Lamini is a library that simplifies the proces...
1396  How does Lamini simplify the process of access...  Lamini simplifies data access in Databricks by...
1397  What are some of the key features provided by ...  Lamini automatically manages the infrastructur...
1398  How does Lamini ensure data privacy during the...  During the training process, Lamini ensures da...
1399  Can you provide an example use case where Lami...  An example use case where Lamini outperforms C...

[1400 rows x 2 columns]

text example concatenation:
What are the different types of documents available in the repository (e.g., installation guide, API documentation, developer's guide)?Lamini has documentation on Getting Started, Authentication, Question Answer Model, Python Library, Batching, Error Handling, Advanced topics, and class documentation on LLM Engine available at https://lamini-ai.github.io/.

text with prompt template:
### Question:
What are the different types of documents available in the repository (e.g., installation guide, API documentation, developer's guide)?

### Answer:
Lamini has documentation on Getting Started, Authentication, Question Answer Model, Python Library, Batching, Error Handling, Advanced topics, and class documentation on LLM Engine available at https://lamini-ai.github.io/.


Finetuning dataset text only:
{'text': '### Question:\n'
         'What are the different types of documents available in the '
         "repository (e.g., installation guide, API documentation, developer's "
         'guide)?\n'
         '\n'
         '### Answer:\n'
         'Lamini has documentation on Getting Started, Authentication, '
         'Question Answer Model, Python Library, Batching, Error Handling, '
         'Advanced topics, and class documentation on LLM Engine available at '
         'https://lamini-ai.github.io/.'}

Finetuning dataset question answer:
{'answer': 'Lamini has documentation on Getting Started, Authentication, '
           'Question Answer Model, Python Library, Batching, Error Handling, '
           'Advanced topics, and class documentation on LLM Engine available '
           'at https://lamini-ai.github.io/.',
 'question': '### Question:\n'
             'What are the different types of documents available in the '
             'repository (e.g., installation guide, API documentation, '
             "developer's guide)?\n"
             '\n'
             '### Answer:'}

Finetuning dataset:
DatasetDict({
    train: Dataset({
        features: ['question', 'answer', 'input_ids', 'attention_mask', 'labels'],
        num_rows: 1260
    })
    test: Dataset({
        features: ['question', 'answer', 'input_ids', 'attention_mask', 'labels'],
        num_rows: 140
    })
})
"""
