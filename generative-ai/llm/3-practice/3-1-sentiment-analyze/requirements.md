## PRACTICE 1
Develop an assistant that utilizes the GPT-3.5-turbo model to classify a given text into either neutral, negative, or positive categories.
- Dataset: https://huggingface.co/datasets/mteb/tweet_sentiment_extraction
    - Utilize this dataset for practicing and evaluating the result.


### Prompt 1
```markdown
Define if the sentiment from given text is neutral, negative, or positive.
Only respond with 'neutral', 'negative', or 'positive'.

Text: {text}
Sentiment:

```

### Prompt 2
```markdown
Define sentiment as neutral, negative, or positive.

### Negative sentiment ###
**Description**
- **Emotional Tone**: Reflects dissatisfaction, anger, or disappointment.
- **Contextual Clues**: Words imply negativity based on their usage.
- **Comparisons**: Highlights deficiencies or unfavorable comparisons.
- **Intensifiers**: Words like "extremely" heightening the negative emotion.
**Common indicators**
1. **Adjectives**: Bad, terrible, awful, disappointing.
2. **Verbs**: Hate, regret, despise.
3. **Nouns**: Problem, disaster, failure.
4. **Adverbs/Modifiers**: Never, hardly.
5. **Phrases**: "Went wrong," "not what I expected," "worst experience."

**Samples**
- "Service was terrible."
- "Regret buying this."

### Positive Sentiment ###
**Description**
- **Emotional Tone**: Reflects satisfaction, happiness, or approval.
- **Contextual Clues**: Words that imply positivity and upliftment.
- **Comparisons**: Highlights strengths or favorable comparisons.
- **Intensifiers**: Words like "extremely" that heighten positive emotion.

**Common Indicators**
1. **Adjectives**: Great, excellent, wonderful, delightful.
2. **Verbs**: Love, enjoy, appreciate.
3. **Nouns**: Success, joy, achievement.
4. **Adverbs/Modifiers**: Always, often (in positive context).
5. **Phrases**: "Exceeded expectations," "best experience," "highly recommend."

**Samples**
- "Service was excellent."
- "Absolutely love this product."

### Neutral Sentiment ###
**Description**
- **Emotional Tone**: Reflects impartiality, objectivity, or indifference. The language is used simply to convey information without emotional influence or subjective bias.
- **Contextual Clues**: Words and phrases that do not express strong feelings or emotions, instead focusing on facts or straightforward descriptions.
- **Comparison**: Does not lean towards favor or criticism when comparisons are made, maintaining a balanced view.
- **Intensity**: Lacks emotional intensifiers or diminishing words, maintaining a moderate tone.

**Common Indicators**
1. **Adjectives**: Average, standard, typical, ordinary.
2. **Verbs**: Go, see, occur, report (used to describe actions or states in a factual manner).
3. **Nouns**: Information, event, situation, details.
4. **Adverbs/Modifiers**: Generally, somewhat, typically.
5. **Phrases**: "As expected," "routine process," "in line with standards."

**Samples**
- "The product functions as described."
- "The meeting is scheduled for 10 AM."
- "The weather today is typical for this time of year."

Special: cannot categorize, labeled it "neutral".
Reply: one word.

Text: {text}
Sentiment:
```

### Evaluation
| Prompt | Token | Total | Correct | Accuracy |
| --- | --- | --- | --- | --- |
| 1 | 47 | 20 | 16 | 80% |
| 2 | 445 | 20 | 75% |
| 1 | 47 | 100 | 62 | 62% |
| 2 | 445 | 100 | 71 | 71% |
