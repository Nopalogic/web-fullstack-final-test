# WEB FULLSTACK FINAL TEST

## Team Members

|Name|NIM|
|---|---|
|Erienda Destri Ariestanti|411221115
|Ivan Dwi Kurniawan|411221121
|Naufal Adhi Ramadhan|411221126

## Installation Guide

Follow these steps to set up the project locally.

### Prerequisites
- PHP (version 7.3 or 8.0)
- Composer
- Node.js (version 16 or higher)
- npm
- MySQL or other compatible database

### Step 1: Clone the repository

```bash
git clone https://github.com/Nopalogic/web-fullstack-final-test.git
cd web-fullstack-final-test
```

### Step 2: Install PHP dependencies

```bash
cd backend
composer install
```

### Step 3: Install Node.js dependencies

```bash
cd frontend
npm install
```

### Step 4: Setup environment variables

Backend environment:

```bash
cp .env.example .env
php artisan key:generate
```

Frontend environment:

```bash
cp .env.example .env
```

Edit both `.env` file to configure your database connection and other environment-specific settings.

### Step 5: Run database migrations

```bash
php artisan migrate
```

### Step 6: Start development servers

Start Laravel backend server (in backend directory):

```bash
php artisan serve
```

Start Vite frontend server (in frontend directory):

```bash
npm run dev
```
