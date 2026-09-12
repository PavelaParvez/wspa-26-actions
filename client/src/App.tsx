import { useState } from "react";
import { CategoryForm } from "./components/CategoryForm";
import { CategoryList } from "./components/CategoryList";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseTotal } from "./components/ExpenseTotal";
import { useCategories } from "./hooks/useCategories";
import { useExpenses } from "./hooks/useExpenses";

type View = "expenses" | "categories";

function App() {
	const [view, setView] = useState<View>("expenses");
	const { expenses, addExpense, editExpense, removeExpense } = useExpenses();
	const { categories, addCategory, editCategory, removeCategory } =
		useCategories();

	return (
		<>
			<nav>
				<button
					type="button"
					onClick={() => setView("expenses")}
					disabled={view === "expenses"}
				>
					Expenses
				</button>
				<button
					type="button"
					onClick={() => setView("categories")}
					disabled={view === "categories"}
				>
					Categories
				</button>
			</nav>

			{view === "expenses" && (
				<>
					<h1>Expense tracker</h1>
					<ExpenseForm onAdd={addExpense} />
					<ExpenseList
						expenses={expenses}
						onUpdate={editExpense}
						onDelete={removeExpense}
					/>
					<ExpenseTotal expenses={expenses} />
				</>
			)}

			{view === "categories" && (
				<>
					<h1>Manage Categories</h1>
					<CategoryForm onAdd={addCategory} />
					<CategoryList
						categories={categories}
						onUpdate={editCategory}
						onDelete={removeCategory}
					/>
				</>
			)}
		</>
	);
}

export default App;
