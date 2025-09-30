import os

# Load environment variables
from dotenv import find_dotenv, load_dotenv
from lamini import Lamini

load_dotenv(find_dotenv())


def try_fine_tuned_models():
    print("Try Finetuned models")

    finetuned = Lamini(
        model_name="meta-llama/Llama-2-7b-chat-hf",  # https://huggingface.co/meta-llama/Llama-2-7b-chat-hf
        api_url=os.getenv("POWERML__PRODUCTION__URL"),
        api_key=os.getenv("POWERML__PRODUCTION__KEY"),
    )
    finetuned_output = finetuned.generate("Tell me how to train my dog to sit")

    print("Input: Tell me how to train my dog to sit")
    print("Output ------------------------------------")
    print(finetuned_output)
    print("-------------------------------------------")

    print("Input: What do you think of Mars?")
    print("Output ------------------------------------")
    print(finetuned.generate("What do you think of Mars?"))
    print("-------------------------------------------")

    print("Input: taylor swift's best friend")
    print("Output ------------------------------------")
    print(finetuned.generate("taylor swift's best friend"))
    print("-------------------------------------------")

    print("Input: conversation between a customer and an agent")
    print("Output ------------------------------------")
    print(
        finetuned.generate("""Agent: I'm here to help you with your Amazon deliver order.
    Customer: I didn't get my item
    Agent: I'm sorry to hear that. Which item was it?
    Customer: the blanket
    Agent:""")
    )
    print("-------------------------------------------")


if __name__ == "__main__":
    try_fine_tuned_models()

# ------------------------------------------------------------
"""
Try Finetuned models
Input: Tell me how to train my dog to sit
Output ------------------------------------
on command.
Training a dog to sit on command is a basic obedience command that can be achieved with patience, consistency, and positive reinforcement. Here's a step-by-step guide on how to train your dog to sit on command:

1. Choose a quiet and distraction-free area: Find a quiet area with minimal distractions where your dog can focus on you.
2. Have treats ready: Choose your dog's favorite treats and have them ready to use as rewards.
3. Stand in front of your dog: Stand in front of your dog and hold a treat close to their nose.
4. Move the treat up and back: Slowly move the treat up and back, towards your dog's tail, while saying "sit" in a calm and clear voice.
5. Dog will sit: As you move the treat, your dog will naturally sit down to follow the treat. The moment their bottom touches the ground, say "good sit" and give them the treat.
6. Repeat the process: Repeat steps 3-5 several times, so your dog learns to associate the command "sit" with the action of sitting.
7. Gradually phase out the treats: As your dog becomes more comfortable with the command, start phasing out the treats. Instead, use praise and affection as rewards.
8. Practice, practice, practice: Practice the "sit" command in different locations, with different distractions, and at different times of the day. This will help your dog understand that the command is universal and applies in all situations.
9. Be consistent: Consistency is key when training a dog. Make sure everyone in the household is using the same command and reward system.
10. Be patient: Training a dog takes time and patience. Don't get frustrated if your dog doesn't pick up the command immediately. Keep practicing and eventually, your dog will learn.

Remember, training a dog is a journey, and it's important to be patient, consistent, and positive. With time and practice, your dog will learn to sit on command and other basic obedience commands.
-------------------------------------------
Input: What do you think of Mars?
Output ------------------------------------


Mars is a fascinating planet that has captured the imagination of humans for centuries. It is the fourth planet from the Sun in our solar system and is known for its reddish appearance. Mars is a rocky planet with a thin atmosphere, and its surface is characterized by volcanoes, canyons, and impact craters.

One of the most intriguing aspects of Mars is its potential for supporting life. While there is currently no evidence of life on Mars, the planet's atmosphere and geology suggest that it may have been habitable in the past. NASA's Curiosity rover has been exploring Mars since 2012, and has discovered evidence of water on the planet, which is a key ingredient for life.

Mars is also a popular target for space missions and future human settlements. Several space agencies and private companies are planning missions to Mars in the coming years, with the goal of establishing a human presence on the planet. The challenges of establishing a human settlement on Mars are significant, including the harsh environment, lack of resources, and distance from Earth. However, many experts believe that Mars is the next logical step in the exploration of the solar system and the expansion of human civilization.

Overall, Mars is a fascinating and complex planet that continues to capture the imagination of scientists and the public alike. Its potential for supporting life and serving as a stepping stone for human exploration of the solar system make it an important target for future space missions and settlements.
-------------------------------------------
Input: taylor swift's best friend
Output ------------------------------------


Taylor Swift's best friend is a person who has been by her side through thick and thin. Here are some possible candidates:

1. Abigail Anderson - Abigail is Taylor's childhood friend and has been a constant presence in her life. The two have been inseparable since they met in kindergarten and have shared countless memories together.
2. Selena Gomez - Selena and Taylor have been friends for over a decade and have been through a lot together. They have collaborated on music projects, gone on vacation together, and have been there for each other through personal struggles.
3. Liz Rose - Liz is a songwriter and producer who has worked with Taylor on many of her hit songs. The two have a close professional relationship and have also become close friends over the years.
4. Joe Jonas - Joe and Taylor were in a relationship for a few years in the early 2000s and have remained close friends since then. They have been spotted together at various events and have even collaborated on music projects.
5. Ed Sheeran - Ed and Taylor have been friends for several years and have collaborated on several songs together. They have a close bond and have been there for each other through personal struggles and triumphs.

Overall, Taylor Swift's best friend is someone who has been a constant source of support and encouragement in her life. Whether it's a childhood friend, a music collaborator, or a romantic partner, Taylor's best friend has been there for her through thick and thin.
-------------------------------------------
Input: conversation between a customer and an agent
Output ------------------------------------
I see. Can you please provide me with your order number so I can look into this for you?
    Customer: I don't have the order number. I just got the blanket yesterday.
    Agent: I see. Can you please tell me more about the blanket? What is the brand and the color?
    Customer: It's a blue and white striped blanket from the Home Collection.
    Agent: Thank you for providing that information. I'm going to check on the status of your order for you. Can you please hold for just a moment?
    Customer: Okay, thank you.

In this example, the agent is trying to gather information from the customer in order to help them with their issue. The agent is asking for the order number, the brand and color of the blanket, and other details in order to look into the matter. The agent is being polite and professional throughout the conversation, and is providing the customer with updates on the status of their order.
-------------------------------------------
"""
