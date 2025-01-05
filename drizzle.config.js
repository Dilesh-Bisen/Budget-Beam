import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); 

import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./utils/my_schema.jsx",
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DATABASE_URL, 
    },
});
