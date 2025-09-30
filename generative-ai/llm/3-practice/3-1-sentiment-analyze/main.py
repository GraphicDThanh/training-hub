from datasets import load_dataset
from utils import evaluate_model


if __name__ == "__main__":
    # Load dataset
    dataset = load_dataset("mteb/tweet_sentiment_extraction")
    evaluate_model(dataset, sample_size=100)



