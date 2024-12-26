
# eCommerce Website

Welcome to the eCommerce Website project! This repository contains the code and configuration for a fully functional online store. Whether you're browsing products, making purchases, or track your order, this platform provides a smooth experience.


## Features

- User Registration & Authentication: Secure user sign-up and login system.
-  Product Catalog: Display products with detailed descriptions, prices, and images.
- Shopping Cart: Add products to the cart and proceed to checkout.
-  Order Management: Place orders, view order history, and track status.
- Payment Integration: Support for popular payment gateways using Razor Pay.
- Search & Filters: Advanced search and filtering options for easy product discovery.



## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node.js, Express

**Authentication:** JWT (JSON Web Tokens)

**Payment::** Razo pay

**Deployment:** Netlify (Frontend),Heroku (Backend)

## Installation

1.Clone repository

```bash
  https://github.com/deekshi-1/project.git
  cd project
```


2.Install dependency 
```bash
    cd back-end
    npm i

    cd ../front-end
    npm i
```

3.Set up backend environment
```bash
    PORT = prefered port
    MONGO_URL= your_mongodb_connection_string
    JWT_SECRET= your_jwt_secret
    MAIL_ID="mail_id"
    MPASS=zvjksdbswlwpzddj
    BASE_URL="http://localhost:3000"
```

4.Set up fronten utils
```bash
  front-end/src/utils/axiosconfig.js
  base_url:backend url
```

5.Startup Frontend and backend
```bash
    cd back-end
    npm run start

    cd ../front-end
    npm start
```
## Demo

Demo of the project https://lambent-kitsune-b8c17b.netlify.app/

