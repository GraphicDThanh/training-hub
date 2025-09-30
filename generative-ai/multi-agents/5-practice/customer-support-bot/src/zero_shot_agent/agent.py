from datetime import datetime
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import Runnable, RunnableConfig

from .state import State
from utils.constants import constants
from tools.users.fetch_user_flight_information import fetch_user_flight_information
from tools.flights.search_flights import search_flights
from tools.policies.lookup_company_policies import lookup_policy
from tools.flights.update_ticket_to_new_flight import update_ticket_to_new_flight
from tools.flights.cancel_ticket import cancel_ticket
from tools.car_rentals.search_car_rentals import search_car_rentals
from tools.car_rentals.book_car_rental import book_car_rental
from tools.car_rentals.cancel_car_rental import cancel_car_rental
from tools.car_rentals.update_car_rental import update_car_rental
from tools.hotels.search_hotels import search_hotels
from tools.hotels.book_hotel import book_hotel
from tools.hotels.update_hotel import update_hotel
from tools.hotels.cancel_hotel import cancel_hotel
from tools.execursions.search_trip_recommendations import search_trip_recommendations
from tools.execursions.book_excursion import book_excursion
from tools.execursions.update_excursion import update_excursion
from tools.execursions.cancel_excursion import cancel_excursion


class Assistant:
    def __init__(self, runnable: Runnable):
        self.runnable = runnable

    def __call__(self, state: State, config: RunnableConfig):
        while True:
            configuration = config.get("configurable", {})
            passenger_id = configuration.get("passenger_id", None)
            state = {**state, "user_info": passenger_id}
            result = self.runnable.invoke(state)
            # If the LLM happens to return an empty response, we will re-prompt it for an actual response.
            if not result.tool_calls and (
                not result.content
                or isinstance(result.content, list)
                and not result.content[0].get("text")
            ):
                messages = state["messages"] + [("user", "Respond with a real output.")]
                state = {**state, "messages": messages}
            else:
                break

        return {"messages": result}


llm = constants.CHAT_MODEL
primary_assistant_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are helpful customer support assistant for Swiss Airlines. "
            " Use the provided tools to search for flights, company policies, and other information to assist the user's queries. "
            " When searching, be persistent. Expand your query bounds if the first search returns no results. "
            " If a search comes up empty, expand your search before giving up. "
            "\n\nCurrent user: \n<User>\n{user_info}\n</User>"
            "\nCurrent time: {time}.",
        ),
        ("placeholder", "{messages}"),
    ]
).partial(time=datetime.now)

tools = [
    TavilySearchResults(max_results=1),
    fetch_user_flight_information,
    search_flights,
    lookup_policy,
    update_ticket_to_new_flight,
    cancel_ticket,
    search_car_rentals,
    book_car_rental,
    update_car_rental,
    cancel_car_rental,
    search_hotels,
    book_hotel,
    update_hotel,
    cancel_hotel,
    search_trip_recommendations,
    book_excursion,
    update_excursion,
    cancel_excursion,
]

assistant_runnable = primary_assistant_prompt | llm.bind_tools(tools)