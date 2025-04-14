# SvelteKit Auth Starter (Lucia + Prisma + MySQL)

This project is a starter template for authentication using **SvelteKit**, **Lucia**, **Prisma**, and **MySQL**.

## 📦 Stack

- [SvelteKit](https://kit.svelte.dev) – Fullstack frontend framework
- [Lucia](https://lucia-auth.com) – Simple and secure authentication
- [Prisma](https://www.prisma.io) – Type-safe ORM for SQL databases
- [MySQL](https://www.mysql.com) – Local relational database
---

## ⚙️ Setup Instructions

### 1. Clone this repo
```bash
git clone https://github.com/your-username/svelte-auth-starter.git
cd svelte-auth-starter
```

### 2. Install dependencies
```bash
npm install
```

### 3. .env Configuration
Create a .env file in the root:
```.env
DATABASE_URL="mysql://root:password@localhost:3306/svelte_auth"
```
Make sure:
- You have MySQL running on localhost:3306
- The user/password match the DB
- The user has permission to create a new database if it doesn't exist

### 4. Initialize Prisma
Run the following command to apply schema and generate the Prisma client:
```bash
npx prisma migrate dev --name init
npx prisma generate
```
This will automatically create the svelte_auth database (if it doesn't already exist) and apply the schema.

If you're connecting to an existing database with tables:
```bash
npx prisma db pull
```

### 5. Start the Dev Server
npm run dev -- --open