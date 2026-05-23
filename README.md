# JutaHindustani E-commerce Shoe Application (Windows Setup Guide)

A modern, full-stack, and scalable e-commerce MVP for selling shoes online, configured for Windows development environment.

---

## ⚡ Quick Start (Windows)

### Step 1: Database Setup (MySQL)
1. Ensure your local **MySQL Server** is running.
2. The application is set to automatically create the database `jutahindustani` if it does not exist.
3. Open `backend/src/main/resources/application.properties` and replace the credentials with your local MySQL username and password:
   ```properties
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   ```

---

### Step 2: Launch the Backend Server

The backend includes a Maven wrapper, so you do not need Maven installed globally.

1. Open a new **PowerShell** window.
2. Navigate to the `backend` folder:
   ```powershell
   cd backend
   ```
3. Start the server using the Maven wrapper:
   ```powershell
   .\mvnw spring-boot:run
   ```
   *(If you are using CMD instead of PowerShell, you can run `mvnw spring-boot:run` directly.)*
4. The server will start and be active on **`http://localhost:8080`**.

---

### Step 3: Launch the Frontend Application

1. Open a **second** terminal window.
2. Navigate to the `frontend` folder:
   ```powershell
   cd frontend
   ```
3. Install dependencies and start the Vite development server. If script execution is disabled on your system (common PowerShell security error), use `npm.cmd`:
   ```powershell
   # Use npm.cmd to bypass script execution policies on Windows:
   npm.cmd install
   npm.cmd run dev
   ```
4. Open your browser and navigate to **`http://localhost:XXXX`**.

---

## 🔑 Default Accounts

The application automatically seeds these login accounts on first startup:

### 👤 Customer Account
* **Email:** `test1@gmail.com`
* **Password:** `customer123`
* **Features:** Browse shoes, filter categories, search, add products to cart, and checkout.

### 🔑 Administrator Account
* **Email:** `test@gmail.com`
* **Password:** `admin123`
* **Features:** Access to the **Admin Dashboard** to add, edit, or delete shoe inventory and track customer orders.
