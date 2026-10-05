import { describe, expect, it } from "vitest";
import { parseNewCategory } from "../src/routes/category.js";

describe("parseNewCategory", () => {
	it("returns the parsed category when the body is valid", () => {
		expect(parseNewCategory({ name: "Travel" })).toEqual({ name: "Travel" });
	});

	it("returns null when name is missing", () => {
		expect(parseNewCategory({})).toBeNull();
	});

	it("returns null when name is not a string", () => {
		expect(parseNewCategory({ name: 42 })).toBeNull();
	});
});
