import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app.js";
import { pool } from "../src/db/pool.js";

beforeEach(async () => {
	await pool.query("DELETE FROM expenses");
	await pool.query(
		`INSERT INTO expenses (description, amount, date) VALUES
		   ('Groceries', 42.50, '2026-08-01'),
		   ('Bus ticket', 3.20, '2026-08-03')`,
	);
});

afterAll(async () => {
	await pool.end();
});

describe("GET /api/expenses", () => {
	it("returns expenses with numbers and ISO dates", async () => {
		const res = await request(app).get("/api/expenses");

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
		const groceries = res.body.find(
			(e: { description: string }) => e.description === "Groceries",
		);
		expect(groceries.amount).toBe(42.5);
		expect(groceries.date).toBe("2026-08-01");
	});
});

describe("POST /api/expenses", () => {
	it("creates an expense and returns 201 with the created row", async () => {
		const res = await request(app)
			.post("/api/expenses")
			.send({ description: "Coffee", amount: 3.5, date: "2026-08-10" });

		expect(res.status).toBe(201);
		expect(res.body).toMatchObject({
			description: "Coffee",
			amount: 3.5,
			date: "2026-08-10",
		});
		expect(res.body.id).toBeDefined();
	});

	it("returns 400 when a required field is missing", async () => {
		const res = await request(app)
			.post("/api/expenses")
			.send({ description: "Broken", date: "2026-08-10" });

		expect(res.status).toBe(400);
	});
});

describe("PUT /api/expenses/:id", () => {
	it("returns 404 for an id that does not exist", async () => {
		const res = await request(app)
			.put("/api/expenses/00000000-0000-0000-0000-000000000000")
			.send({ description: "Nope", amount: 1, date: "2026-08-10" });

		expect(res.status).toBe(404);
	});
});

describe("DELETE /api/expenses/:id", () => {
	it("deletes an existing expense and returns 204", async () => {
		const list = await request(app).get("/api/expenses");
		const id = list.body[0].id;

		const res = await request(app).delete(`/api/expenses/${id}`);
		expect(res.status).toBe(204);
	});
});
