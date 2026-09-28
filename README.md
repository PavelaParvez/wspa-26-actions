# Expense Tracker

Course project for Web Software Production.

- `client/` — React + Vite + TypeScript frontend
- `server/` — Node + Express + TypeScript backend
- `db/` — PostgreSQL schema and seed data (`db/init/001-schema.sql`)

## Running the whole stack (Docker Compose)

    docker compose up -d

- client: http://localhost:8080
- server: http://localhost:3001
- db: localhost:5432 (PostgreSQL)
- adminer: http://localhost:8088

## Storage

The server stores data in **PostgreSQL** (not in memory), through the connection pool in `server/src/db/pool.ts`. Connection details come from the environment variables `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD` and `PGDATABASE`. Inside Compose they are set in `compose.yaml`; when running the server on its own they are read from `server/.env`.

## Running the server on its own

1. Start only the database: `docker compose up -d db`
2. Copy `server/.env.example` to `server/.env` and fill in: `PGHOST=localhost`, `PGPORT=5432`, `PGUSER=app`, `PGPASSWORD=app_pw`, `PGDATABASE=app_db`. The `.env` file is git-ignored and must never be committed.
3. Run:

        cd server
        npm install
        npm run dev

## API endpoints

| Method | Path                  | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/api/expenses`       | List all expenses   |
| POST   | `/api/expenses`       | Create an expense   |
| PUT    | `/api/expenses/:id`   | Update an expense   |
| DELETE | `/api/expenses/:id`   | Delete an expense   |
| GET    | `/api/categories`     | List all categories |
| POST   | `/api/categories`     | Create a category   |
| PUT    | `/api/categories/:id` | Update a category   |
| DELETE | `/api/categories/:id` | Delete a category   |

Invalid body returns `400`, unknown id returns `404`, successful delete returns `204`.

## Testing the server

The server has a Vitest test suite in `server/test/`:

- **Unit tests** (`*.unit.test.ts`) for the pure functions `toExpense`, `parseNewExpense` and `parseNewCategory`. No database needed.
- **Integration tests** (`*.integration.test.ts`) that send real HTTP requests to the app with Supertest, against a real PostgreSQL database.

The tests use a **separate database, `app_test_db`**, so they never touch development data. Settings are in `server/vitest.config.ts`.

One-time setup, from the project root with the database running:

    docker compose exec db psql -U app -d app_db -c "CREATE DATABASE app_test_db;"
    docker compose exec -T db psql -U app -d app_test_db < db/init/001-schema.sql

Run the tests (start the database first with `docker compose up -d db`):

    cd server
    npm test

## Client

    cd client
    npm install
    npm run dev

Runs at http://localhost:5173 and calls the API at http://localhost:3001.

## Linting

Run `npm run lint` or `npm run lint:fix` inside `client/` or `server/`.

## End-to-end tests (Playwright)

Browser tests live in `client/e2e/` and drive the real app through the UI (smoke test, expense add/edit/delete, category add/delete). They need the whole stack running:

    docker compose up -d
    cd client
    npm install
    npx playwright install chromium
    npm run test:e2e

Add `-- --ui` to watch them run. Set `E2E_BASE_URL` to run them against another environment (default is http://localhost:8080).
