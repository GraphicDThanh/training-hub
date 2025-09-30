from common.config import settings
from common.entities import PaymentMethod, ShippingAddress, User
from common.enums import OrderStatus
from langsmith import Client
from services import auth_service, cart_service, order_service, user_service
from services.auth import AuthService
from services.cart import CartService
from services.user import UserService

from .types import AgentEval
from .utils import (
    get_or_create_cart,
    get_payment_method,
    get_shipping_address,
    get_shipping_options,
    random_eval_user,
)


class EvaluationService:
    """
    A service to handle evaluation tasks using LangSmith.
    This service provides methods to create datasets, add examples, and run evaluations.
    It uses the LangSmith client to interact with the LangSmith API.
    """

    def __init__(self):
        self.client = Client()

    def get_example(self, dataset_name, example_id):
        """
        Get an example by its ID.
        Args:
            dataset_name (str): The name of the dataset.
            example_id (str): The ID of the example.
        Returns:
            Example: The example object.
        """
        examples = self.client.list_examples(dataset_name=dataset_name)

        for example in examples:
            if str(example.id) == example_id:
                return example

        return None

    def create_dataset_with_examples(self, name, description, examples, is_reset=False):
        """
        Create a dataset and examples on LangSmith.
        If the dataset already exists, it will be reset if is_reset is True.
        If the dataset does not exist, it will be created.
        Args:
            name (str): The name of the dataset.
            description (str): The description of the dataset.
            examples (list): A list of examples to add to the dataset.
            is_reset (bool): Whether to reset the dataset if it already exists.
        """
        existing_dataset = list(self.client.list_datasets(dataset_name=name))

        if is_reset and existing_dataset:
            self.client.delete_dataset(dataset_name=name)
            existing_dataset = []

        if existing_dataset:
            dataset = existing_dataset[0]
        else:
            dataset = self.client.create_dataset(dataset_name=name, description=description)

        dataset_id = dataset.id
        if not dataset.example_count:
            self.client.create_examples(
                dataset_id=dataset_id,
                examples=examples,
            )

    def run_evaluation(self, target, data, evaluators=None, experiment_prefix="agent-eval"):
        """
        Run an evaluator on the dataset.
        """
        experiment_results = self.client.evaluate(
            target,
            data=data,
            evaluators=evaluators if evaluators else [],
            experiment_prefix=experiment_prefix,
            max_concurrency=1,
        )
        return experiment_results

    def run_evaluations(self, list_agents: list[AgentEval]):
        for agent in list_agents:
            if not agent.is_run:
                continue

            print(f"Running evaluation for {agent.key}...")
            # Step 1: Create dataset
            self.create_dataset_with_examples(
                name=agent.dataset_name,
                description=agent.description,
                examples=agent.examples,
                is_reset=agent.is_reset_examples,
            )

            # Step 2: Run evaluation
            self.run_evaluation(
                target=agent.target,
                data=agent.dataset_name,
                evaluators=agent.evaluators,
                experiment_prefix=f"{agent.key}-experiment",
            )

    def run_single_example(self, list_agents: list[AgentEval], agent_key, example_id):
        """
        Run a single example by its ID.
        """
        agent = next((agent for agent in list_agents if agent.key == agent_key), None)
        if not agent:
            raise ValueError(f"Agent with key {agent_key} not found.")

        example = self.get_example(agent.dataset_name, example_id)
        if example is None:
            raise ValueError(f"Example with ID {example_id} not found in dataset {agent.dataset_name}.")

        self.run_evaluation(
            agent.target,
            data=[example],
            evaluators=agent.evaluators,
            experiment_prefix=f"{agent.key}-experiment",
        )


class TestEvalDataService:
    def __init__(
        self,
        auth_service: AuthService,
        cart_service: CartService,
        user_service: UserService,
    ):
        self.auth_service = auth_service
        self.cart_service = cart_service
        self.user_service = user_service

    def init_authenticated_user_data(self, state=None, cart_items=None):
        # Authenticated user
        eval_user = self.get_or_create_user()
        eval_user_id = eval_user.id

        # Preparation user data
        self.create_user_data(eval_user)

        # Get user data and set up the state
        active_cart = get_or_create_cart(eval_user_id)

        # Cart items preparation for evaluation
        if cart_items:
            self.add_items_to_cart(active_cart, cart_items)
        else:
            # If no cart items are provided, clear the cart
            self.clear_cart(active_cart)

        # Update active cart in state after add/remove items
        active_cart = self.get_cart(active_cart.id)

        state = {
            "user_id": str(eval_user_id),
            "active_cart": active_cart,
        }

        return state, eval_user

    def get_or_create_user(self) -> User:
        eval_user_data = random_eval_user()
        response = self.auth_service.get_or_create_user(
            email=eval_user_data["email"], password=eval_user_data["password"]
        )
        if not response.success:
            raise Exception("Failed to get or create test user")

        return response.data["user"]

    def get_cart(self, cart_id: str):
        response = cart_service.get_cart(cart_id)
        if not response.success:
            raise Exception("Failed to get cart")

        return response.data["cart"]

    def delete_user(self, user: User):
        response = self.auth_service.delete_user(user.id)
        if not response.success:
            raise Exception("Failed to delete test user")

    def clear_cart(self, cart):
        response = self.cart_service.clear_cart(cart)
        if not response.success:
            raise Exception("Failed to clear cart")

    def add_items_to_cart(self, cart, items: list[dict]):
        for item in items:
            product_id = item.get("product_id")
            quantity = item.get("quantity", 1)
            if not product_id:
                raise ValueError("Product ID is required to add to cart")

            self.cart_service.add_to_cart(cart.id, product_id, quantity)

    def create_user_data(self, user: User):
        # Some data need for user to use system
        # - Create shipping address
        self.user_service.create_shipping_address(
            ShippingAddress(
                user_id=user.id,
                address_line_1="123 Main St",
                address_line_2="Apt 4B",
                city="Eval Town",
                state="CA",
                zip_code="12345",
                postal_code="12345",
                country="USA",
                is_default=True,
            ),
        )

        # - Create payment method
        self.user_service.create_payment_method(
            PaymentMethod(
                user_id=user.id,
                # Credit/Debit Card
                payment_option_id=settings.eval.PAYMENT_OPTION_ID,
                is_default=True,
            ),
        )

    def prepare_data_by_order_action(self, order_action, state):
        def create_an_order():
            active_cart = state["active_cart"]
            # Add items to cart then checkout
            cart_items = [
                {
                    "product_id": "fdeee24b-7f15-4070-aa21-3984e3042954",
                    "quantity": 1,
                },
            ]
            self.add_items_to_cart(active_cart, cart_items)

            # update cart
            update_cart = self.get_cart(active_cart.id)
            response_checkout = cart_service.checkout(
                update_cart,
                state["shipping_address"],
                state["payment_method"],
                state["selected_shipping_option"],
            )
            if response_checkout.success is False:
                raise Exception("Failed to checkout cart")

            order = response_checkout.data["order"]
            return order

        match order_action:
            case "list_has_items":
                return create_an_order()
            case "list_empty":
                return None
            case "get_detail_found":
                return create_an_order()
            case "cancel_order_success":
                return create_an_order()
            case "return_order_success":
                order = create_an_order()

                order.status = OrderStatus.DELIVERED
                update_order_response = order_service.update_order(order)
                if not update_order_response.success:
                    raise Exception("Failed to update order status")

                return update_order_response.data["order"]

            case "return_order_failed":
                return create_an_order()
            case _:
                return None


eval_service = EvaluationService()
test_eval_data_service = TestEvalDataService(auth_service, cart_service, user_service)
