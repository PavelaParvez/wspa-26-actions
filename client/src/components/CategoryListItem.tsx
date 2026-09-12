import { useState } from "react";
import type { Category, NewCategory } from "../types/category";

type CategoryListItemProps = {
	category: Category;
	onUpdate: (id: string, category: NewCategory) => void;
	onDelete: (id: string) => void;
};

export function CategoryListItem({
	category,
	onUpdate,
	onDelete,
}: CategoryListItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(category.name);

	function startEdit() {
		setName(category.name);
		setIsEditing(true);
	}

	function handleSave() {
		onUpdate(category.id, { name });
		setIsEditing(false);
	}

	if (isEditing) {
		return (
			<li>
				<input value={name} onChange={(e) => setName(e.target.value)} />
				<button type="button" onClick={handleSave}>
					Save
				</button>
				<button type="button" onClick={() => setIsEditing(false)}>
					Cancel
				</button>
			</li>
		);
	}

	return (
		<li>
			<span className="description">{category.name}</span>
			<button type="button" onClick={startEdit}>
				Edit
			</button>
			<button type="button" onClick={() => onDelete(category.id)}>
				Delete
			</button>
		</li>
	);
}
