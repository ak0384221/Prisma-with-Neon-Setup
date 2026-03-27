# Setting Up Neon DB with Prisma in Express.js (2026 Guide)

Integrating a serverless database like Neon with Prisma in a TypeScript environment is a streamlined
process in 2026. This guide covers the essential steps from cloud setup to code implementation.

## Phase 1: Neon Cloud Setup

Before writing any code, you must configure your database instance on the Neon platform.

1. Create a Project: Log in to Neon.tech and start a new project.
2. Retrieve Connection Strings: You will need two distinct strings from your dashboard:
   - Pooled Connection: Check the "Pooling" option and save this as DATABASE_URL.
   - Direct Connection: Uncheck "Pooling" and save this as DIRECT_URL.
3. - SSL Requirement: Ensure both connection strings end with the suffix ?sslmode=require.

## Phase 2: Project Initialization

Using pnpm is the recommended way to manage dependencies and ensure proper hoisting for Prisma.

1. Initialize the project: Run pnpm init.
2. Install Dependencies:
   - Production: pnpm add express @prisma/client @prisma/adapter-neon
     @neondatabase/serverless ws dotenv.
   - Development: pnpm add -D prisma typescript tsx @types/express @types/ws @prisma/client-runtime-utils.
3. Configure pnpm: **Create an .npmrc** file and add the following line to ensure Prisma works
   correctly with pnpm's symlinking: public-hoist-pattern[]=@prisma/\*.
4. Initialize Prisma: Run pnpm prisma init.

## Phase 3: Schema and Migrations

Update your prisma/schema.prisma to use a custom output path, which is a best practice for WASM
clients.

- generator client {
- provider = "prisma-client-js"
- output = "../src/generated/prisma"
  }

## Next, create a prisma.config.ts in your root folder. It is critical that the CLI uses the Direct URL for migrations:

- export default defineConfig({
- schema: "prisma/schema.prisma",
- datasource: { url: process.env.DIRECT_URL },
- });
  Finally, execute your initial migration and generate the client + pnpm prisma migrate dev --name init
- pnpm prisma generate

## Phase 4: Code Implementation

**To connect your Express app to Neon, you need to set up the Neon WebSocket adapter in src/db/db.ts**

- import "dotenv/config";
- import { defineConfig } from "@prisma/config";
- import { PrismaNeon } from "@prisma/adapter-neon";
- import { neonConfig } from "@neondatabase/serverless";
- import ws from "ws";
- import { PrismaClient } from "../generated/prisma/index.js";
- // Configuration for serverless environments
- neonConfig.webSocketConstructor = ws;
- // Initialize Prisma with the Neon adapter
- const adapter = new PrismaNeon({
- connectionString: process.env.DATABASE_URI!,
- });
  // 3. Initialize your client
- export const prisma = new PrismaClient({ adapter });

## Phase 5: Scripts & Execution

Update your package.json with these scripts to manage your 2026 development workflow:

- dev: tsx watch src/index.ts (for hot-reloading).
- build: prisma generate && tsc (to ensure the client is ready for production).
- db:migrate: prisma migrate dev

**Following this structure ensures a robust, type-safe connection between your Express.js server and
your Neon database using the latest Prisma patterns**
