# E-commerce React App

This is a modern e-commerce web application built with React and Vite. It features a clean UI, product browsing, cart management, authentication, and more.

## Features
- Home page with main slider and banners
- Product listing and product details
- Shopping cart and wishlist functionality
- User authentication (register, login, password reset)
- Order management
- Responsive design
- Modular component structure

## Project Structure
```
src/
  App.jsx            # Main app component
  components/        # Reusable UI components
  Context/           # React context providers (cart, token, wishlist)
  assets/            # Images and static assets
  ...
public/              # Static files
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
	```sh
	git clone https://github.com/ahmedelsaeed67/E-commerce.git
	cd E-commerce
	```
2. Install dependencies:
	```sh
	npm install
	# or
	yarn install
	```

### Running the App
Start the development server:
```sh
npm run dev
# or
yarn dev
```
The app will be available at `http://localhost:5173` by default.

### Building for Production
```sh
npm run build
# or
yarn build
```

### Linting
```sh
npm run lint
# or
yarn lint
```

## How It Works
- **Home Page:** Displays banners and a main slider for featured products or promotions.
- **Products:** Browse all products, filter by categories, and view product details.
- **Cart:** Add, remove, and update products in your shopping cart. Cart state is managed globally.
- **Wishlist:** Save products for later viewing or purchase.
- **Authentication:** Register, login, reset password, and verify user accounts.
- **Order Management:** View your orders and order details after purchase.
- **Context Providers:** Uses React Context for cart, wishlist, and authentication state management.

## Folder Contents
- `src/components/` - Contains all UI components (Navbar, Footer, Product Cards, etc.)
- `src/Context/` - Context providers for global state (Cart, Token, Wishlist)
- `src/assets/` - Images and static assets
- `public/` - Static files served by Vite

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
