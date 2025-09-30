from datetime import datetime
from langchain_core.prompts import PromptTemplate

def _get_datetime():
    now = datetime.now()
    return now.strftime("%m/%d/%Y, %H:%M:%S")


if __name__ == "__main__":
    # Partial with strings - 1
    prompt = PromptTemplate.from_template("{foo}{bar}")
    partial_prompt = prompt.partial(foo="foo")
    print(partial_prompt.format(bar="baz"))
    # Output
    # foobaz

    # Partial with strings - 2
    prompt = PromptTemplate.from_template(
        template="{foo}{bar}",
        input_variables=["bar"],
        partial_variables={"foo": "foo"}
    )
    print(prompt.format(bar="baz"))

    # Partial with functions
    prompt = PromptTemplate(
        template="Tell me a {adjective} joke about the day {date}",
        input_variables=["adjective", "date"],
    )
    partial_prompt = prompt.partial(date=_get_datetime)
    print(partial_prompt.format(adjective="funny"))
    # Output
    # Tell me a funny joke about the day 11/11/2024, 15:25:51

    # Partial with functions - adjust
    prompt = PromptTemplate(
        template="Tell me a {adjective} joke about the day {date}",
        input_variables=["adjective"],
        partial_variables={"date": _get_datetime}
    )
    print(prompt.format(adjective="funny"))