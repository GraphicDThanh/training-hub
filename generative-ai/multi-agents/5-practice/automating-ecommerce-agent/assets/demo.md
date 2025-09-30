# Practice Demo
## Agent Demo

### Anonymous user
- Ask service question
	- How should I preserve the color of my clothing?
	- Do I receive any warranty when buy your product?
	- Do you offer free shipping?
- Search product
	- Give me product "SOLAR Stylish V-neck Dress"
	- Is "Kaylin Blazer - Logo Embroidered Blazer" in stock?
- Compare products
	- Compare "Straight Cut Button-down Collar Shirt" with "DIVAS Polo T-shirt"
	- Compare "Echo Polo - Regular fit knitted polo shirt" and "Daily Metagent T-shirt"
- Create support ticket
```
Help me create a support ticket with below details:
- Name: "John Doe"
- Email: "[john.doe@gmail.com](mailto:john.doe@gmail.com)"
- Phone number: "0123456789"
- Subject: "I have a problem with my order"
- Description: "I received the wrong item in my order. Help me resolve this issue."
```
- Try access cart "Get my cart"

### Authenticated user
#### Account
- ecommerce01@asnet.com.vn / abcABC@123
  - Test feature:
    - Get empty cart
    - Add item to cart
    - Checkout cart
    - Get order detail

- ecommerce@asnet.com.vn / abcABC@123
  - Data prepare:
    - Orders: 2 (1 pending confirm, 1 delivered)
    - Cart: 3 items
        - 1 "SOLAR Stylish V-neck Dress"
		- 2 "Straight Cut Button-down Collar Shirt"
		- 3 "Kaylin Blazer - Logo Embroidered Blazer"
  - Test feature:
    - Get order history
    - Return order ID: 93a36704-cace-4042-8187-af526569d723
    - Cancel order ID: 7b5f82c3-d244-4d32-b427-3461f6412c69
    - Get cart
    - Remove "Straight Cut Button-down Collar Shirt" from cart
    - Clear cart

**Features:**
- Cart management
	- Get cart
	- Add item to cart
		- Give me product "SOLAR Stylish V-neck Dress"
		- Add it to my cart
		- Add 2 "Straight Cut Button-down Collar Shirt" to my cart
	- Remove item from cart
		- Remove "Straight Cut Button-down Collar Shirt" out of cart
	- Check out my cart
	- Clear cart
- Order management
	- Get order history
	- Get order detail
	- Cancel order
	- Return order

## Evaluation Demo
- Ecommerce Agent Evaluation
- Supervisor Agent Evaluation
- Intent Classify Evaluation
- Service Agent Evaluation
- Product Agent Evaluation
- Cart Agent Evaluation
- Order Agent Evaluation
