# Baemin Backend Project 🚀

> An advanced **NestJS** backend for a modern food delivery service, powered by **PostgreSQL** and **Prisma**. Learn to build scalable backends with cutting-edge Node.js technologies in this project from the **Advanced Node.js Course**.

## Overview 🎯

The **Baemin Backend Project** is a feature-rich, modern backend application designed for food delivery services like **Baemin**. Built with **NestJS** for structured backend development, this project uses **PostgreSQL** for efficient and reliable data management, while **Prisma ORM** simplifies database interaction.

This project will help you:

- Develop modular and scalable backends using **NestJS** 🏗️.
- Manage a relational database using **PostgreSQL** 🗄️.
- Implement database migrations and schema management with **Prisma** 📊.
- Utilize **Nx** for efficient monorepo management and development 💼.

---

## Features ✨

- **Modular Architecture**: Built with **NestJS** for maintainable and scalable server-side applications.
- **Secure Database Operations**: Optimized database queries and operations using **PostgreSQL**.
- **Effortless Database Management**: Handle migrations, data models, and seeding with **Prisma ORM**.
- **Workspace Management with Nx**: Nx enhances productivity and collaboration within a monorepo structure.
- **Seamless Development Experience**: Integrated dev environment for rapid development, testing, and debugging.

---

## Setup & Installation ⚙️

### Prerequisites 🛠️

- Ensure you have **Node.js** installed (v16 or later).
- Set up **PostgreSQL** with the appropriate environment variables (`DATABASE_URL`).
- Global installation of **Nx** for workspace management.

### Step 1: Install Nx Globally 🌍

Nx is used to manage your workspace. Install it globally:

```bash
npm install -g nx
```

### Step 2: Install Project Dependencies 📦

Navigate to the project root and run:

```bash
npm i
```

### Step 3: Run the Application 🚀

Start the development server using Nx:

```bash
npx nx run Beamin:serve:dev

npm run dev
```

Your backend is now live! Access the development server at `http://localhost:8080`.

---

## Database Setup 🗄️

Before running the app, ensure your database is properly set up and connected via **Prisma**:

```bash
npx prisma init
```

Run initial migrations to set up your database schema:

```bash
npm run prisma:generate

npm run prisma:migrate:dev
```

## Update Prisma and Database 🛠️

Run the migration

```bash
npx prisma migrate dev --name <migration_name>

npm run prisma:migrate:dev
```

Generate the Prisma Client

```bash
npx prisma generate

npm run prisma:generate
```

## Access Prisma Studio 🎨

For easy database management, use Prisma Studio, a GUI for viewing and managing your data:

```bash
npm run prisma:studio
```

## Start Swagger 🌍

For easy start swagger ui for project, paste url to browsers:

```bash
http://localhost:8080/docs
```

---

## Key Scripts 📜

- **Reset Server**: `npm run reset`
- **Start Development Server**: `npm run dev`
- **Run Prisma Migrations**: `npm run prisma:migrate:dev`
- **Access Prisma Studio**: `npm run prisma:studio`
- **Database Initialization**: `npx prisma init`

---

## Contribution Guidelines 🤝

This project is a learning resource for backend development using **NestJS**. Contributions are welcome! Fork the repo, create a feature branch, and submit a pull request with a detailed description of your changes.

---

## License 📝

This project is licensed under the **MIT License**.

---

Get started on your journey to mastering backend development with **NestJS**, **PostgreSQL**, and **Prisma** today! Happy coding! 😄
