import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		env: {
			PGHOST: "localhost",
			PGPORT: "5432",
			PGUSER: "app",
			PGPASSWORD: "app_pw",
			PGDATABASE: "app_test_db",
		},
		fileParallelism: false,
	},
});