import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		env: {
			PGHOST: process.env.PGHOST ?? "localhost",
			PGPORT: process.env.PGPORT ?? "5432",
			PGUSER: process.env.PGUSER ?? "app",
			PGPASSWORD: process.env.PGPASSWORD ?? "app_pw",
			PGDATABASE: process.env.PGDATABASE ?? "app_test_db",
		},
		fileParallelism: false,
	},
});
