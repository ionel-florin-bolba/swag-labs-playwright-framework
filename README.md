# 🚀 Swag Labs Playwright Framework

UI Test Automation Framework built with Playwright and TypeScript using the Page Object Model (POM) design pattern.

## Tech Stack

- Playwright
- TypeScript
- Page Object Model (POM)
- GitHub Actions
- HTML Reports

## Project Structure

```text
pages/
├── LoginPage.ts
├── InventoryPage.ts
├── CartPage.ts
└── CheckoutPage.ts

tests/
├── login.spec.ts
├── inventory.spec.ts
├── cart.spec.ts
├── checkout.spec.ts
└── e2e.spec.ts

data/
├── users.ts
└── checkoutData.ts
```

## Test Coverage

### Login
- Successful login
- Invalid login
- Locked user
- Empty username
- Empty password

### Inventory
- Products displayed
- Sort products A-Z
- Sort products Z-A
- Add product to cart
- Add multiple products to cart

### Cart
- Add product
- Remove product
- Continue shopping

### Checkout
- Successful checkout
- Missing first name
- Missing last name
- Missing postal code
- Multiple products checkout

### End-to-End
- Complete order flow
- Complete order with multiple products
- Remove product before checkout

## Available Scripts

```bash
npm run test
npm run headed
npm run ui
npm run report
```

## Playwright Report

<img width="402" height="604" alt="Screenshot 2026-06-09 1" src="https://github.com/user-attachments/assets/37d94bb9-5d2b-4be9-b3ff-99c95dcbfb45" />
