# React Practice 2 - Manage Product

## Targets
- Understand about simple flow of React
- Applied styled-component and storybook
- App: Filter and editing list of products
---- Create mocking data
---- User filter by column values
---- User edit/delete product item

## Requirements:

Create React application to manage product with the requirement:
* Create list products by mocking data
* Add new product
* Filter list of products
* User edit/delete product item

## Run App

- Download Source form repository git@gitlab.asoft-python.com:g-thanhnguyendiem/react-training.git
- `cd practice-2`
- `npm install`
- `npm start`
then go to `http://localhost:3000` to see the app

- To see storybook
- `npm run storybook`
then go to `http://localhost:9001` to see the storybook

## Current archieved
- Generate random list of product
- Generate random a product
- Create new product handy
- Show list products
- Edit product by popup
- Delete product

## Known Issues:
 Because I use "faker" to build random data include image which just give a link to random image at a time.
 So when do edit we will not see the same image of current showing

## Missing features:
 * 1. Validate form
 * 2. Filter product by search bar
 * 3. Show popup when click to delete product
 * 4. Use localstorage to save current data