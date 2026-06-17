## 🚀 Detailed Breakdown of Tasks & Integration

### 1. Task 1: The Interface Layer (Responsive Design)
* **Technologies:** HTML5, CSS3 (Grid, Flexbox, Variable Architecture), Vanilla JavaScript.
* **Implementation Logic:** Designed with a strict **Mobile-First Paradigm**, starting with a single-column block layout that gracefully scales up into a multi-column macro grid using `min-width` media queries at `768px` and `1024px` breakpoints. 
* **Fluid Typography:** Implemented the modern `clamp()` function for fluid header sizing, eliminating jagged responsive jumps across arbitrary layout boundaries.

### 2. Task 2: The Core Logic Layer (Backend API Engine)
* **Technologies:** Raw Node.js `http` module.
* **Implementation Logic:** Built a raw, framework-free server processing unit that intercepts incoming HTTP client traffic, parses raw payload chunks manually via asynchronous streaming data buffers, and routes requests to appropriate RESTful path parameters.
* **The Gatekeeper Rule:** Enforced high-security structural validation directly inside the runtime execution pipeline. If incoming payloads violate syntactic requirements (e.g., missing properties like `name` or `email`), the engine intercepts the transaction and instantly returns a defensive `400 Bad Request` status code.

### 3. Task 3: The Persistence Vault (Database Integration)
* **Technologies:** PostgreSQL, Raw SQL, Native Drivers (`pg`).
* **Implementation Logic:** Replaced slow Object-Relational Mappings (ORMs) with highly optimized native database drivers executing raw structured queries at maximum hardware execution speeds.
* **The Shield (Defensive Security):** Strictly avoided vulnerable string concatenation patterns. All CRUD operations (Create, Read, Update, Delete) route through highly defensive **Parameterized Queries** (`$1, $2`). This enforces that any data injected via client input vectors is processed strictly as harmless data strings rather than executable runtime instructions, completely neutralizing SQL Injection attacks.

---

## 🔗 The End-to-End IPO Cycle (How It Connects)
1.  **Input (Client Side):** The user triggers an interaction on the semantic UI overlay via `responsive.html`.
2.  **Process (Signal Transmission):** Native JavaScript asynchronously dispatches an asynchronous network request utilizing the `fetch()` API to transfer serialized JSON states across the network void directly to the backend processing gateway (`http://localhost:3000/api/users`).
3.  **Output (State Persistence):** The server decodes the payload parameters, executes runtime semantic layout validations, passes the parameterized transaction block securely to the PostgreSQL persistence vault (`database.js`), commits the records reliably to disk, and pushes a clean `201 Created` REST compliance signal back to update the front-end view state dynamically.

---

## ⚙️ Deployment & Execution Instructions

Follow these precise steps to provision, initialize, and test the unified system infrastructure inside your local execution environment:

### 1. Provision the Persistence Layer (Database Setup)
Open your preferred PostgreSQL management interface (e.g., pgAdmin or psql shell) and execute the relational structural blueprint defined within `schema.sql`:
```sql
-- Creates the user directory structure with strict schema-level data constraints
CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Role VARCHAR(50) DEFAULT 'user'
);
