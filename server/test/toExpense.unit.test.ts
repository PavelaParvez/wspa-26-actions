import { describe, expect, it } from "vitest";
import { toExpense } from "../src/store/expense.js";

describe("toExpense", () => {
	it("converts a NUMERIC string amount into a number", () => {
		const row = {
			id: "11111111-1111-1111-1111-111111111111",
			description: "Coffee",
			amount: "3.50",
			date: new Date("2026-08-01T00:00:00Z"),
		};

		const expense = toExpense(row);

		expect(expense.amount).toBe(3.5);
		expect(typeof expense.amount).toBe("number");
	});

	it("converts a Date into a YYYY-MM-DD string", () => {
		const row = {
			id: "22222222-2222-2222-2222-222222222222",
			description: "Bus ticket",
			amount: "3.20",
			date: new Date("2026-08-03T00:00:00Z"),
		};
		expect(toExpense(row).date).toBe("2026-08-03");
	});
});
