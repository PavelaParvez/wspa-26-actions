import { Router } from "express";
import {
    addCategory,
    deleteCategory,
    getCategories,
    updateCategory,
} from "../store/category.js";
import type { NewCategory } from "../types/category.js";

function parseNewCategory(body: unknown): NewCategory | null {
    const { name } = body as Partial<NewCategory>;
    if (typeof name !== "string") {
        return null;
    }
    return { name };
}

export const categoryRouter = Router();

categoryRouter.get("/", (_req, res) => {
    res.json(getCategories());
});

categoryRouter.post("/", (req, res) => {
    const newCategory = parseNewCategory(req.body);
    if (!newCategory) {
        res.status(400).json({ error: "name is required" });
        return;
    }
    const category = addCategory(newCategory);
    res.status(201).json(category);
});

categoryRouter.put("/:id", (req, res) => {
    const update = parseNewCategory(req.body);
    if (!update) {
        res.status(400).json({ error: "name is required" });
        return;
    }
    const category = updateCategory(req.params.id, update);
    if (!category) {
        res.status(404).json({ error: "Category not found" });
        return;
    }
    res.json(category);
});

categoryRouter.delete("/:id", (req, res) => {
    const deleted = deleteCategory(req.params.id);
    if (!deleted) {
        res.status(404).json({ error: "Category not found" });
        return;
    }
    res.status(204).send();
});
