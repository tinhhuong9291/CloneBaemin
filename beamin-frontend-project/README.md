# Baemin Frontend Project 🚀

> This is a **Next.js** based frontend project for the **Baemin** food delivery platform. It integrates seamlessly with a **NestJS** backend, powered by a **PostgreSQL** database. This project is developed as part of the **Advanced Node.js Course**.

## Overview 🎯

This project focuses on developing a fast, responsive, and scalable frontend for a food delivery platform like **Baemin** using **Next.js**. The frontend interacts with the **NestJS** backend to fetch and display data related to food items, orders, and users. The data is stored in a **PostgreSQL** database and managed via **Prisma** ORM.

## Key Features ✨

- **Seamless Frontend-Backend Integration**: Built with **Next.js** for efficient SSR (Server-Side Rendering) and API communication with **NestJS**.
- **Dynamic Data Fetching**: Uses **Axios** for HTTP requests and **React Query** for state management of server data.
- **Responsive Design**: Styled with **TailwindCSS** for fast, responsive, and modern UI components.
- **Database**: **PostgreSQL** ensures a powerful and scalable database solution, with **Prisma** handling migrations and queries.
- **API Communication**: Ensures smooth data flow between frontend and backend.

---

## Installation & Running the Project 🛠️

### Step 1: Install Project Dependencies 📦

Run the following command to install the necessary libraries for the project:
```bash
yarn install
```

### Step 2: Start the Frontend Server 🚀

Once the dependencies are installed, run the development server:
```bash
yarn run dev
```

This will start the **Next.js** frontend at `http://localhost:3000`. You can interact with the app here.

### Step 3: Start the Backend 🖥️

Ensure that the **NestJS** backend is running by navigating to the backend folder and executing the following command:
```bash
npx nx run BeaminBackend:serve:dev
```

This will allow the frontend to properly fetch data and communicate with the backend API.

---

## Supporting Libraries 🧰

The following libraries and frameworks were used to enhance the development process:

- **Next.js**: For building the frontend with server-side rendering and static site generation.
- **NestJS**: Powers the backend API and handles authentication, routing, and business logic.
- **PostgreSQL**: Handles data storage and complex queries for orders, users, and restaurants.
- **Prisma ORM**: Manages database schema and migrations for efficient database management.
- **Axios**: Simplifies HTTP requests between the frontend and backend.
- **React Query**: Manages the state of server-side data, caching responses for better performance.
- **TailwindCSS**: Provides utility-first CSS for rapidly styling the frontend components.
- **Zod**: Provides form validation and data integrity for frontend inputs.

---

## Contribution Guidelines 🤝

If you'd like to contribute to this project, feel free to fork the repository, create a new branch, and submit a pull request. Contributions are welcome, whether it's fixing bugs, adding new features, or improving documentation.

---

## License 📝

This project is licensed under the **MIT License**.
