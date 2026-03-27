import dotenv from "dotenv";
dotenv.config();
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { PrismaClient } from "../generated/prisma/index.js";

neonConfig.webSocketConstructor = ws;
//initalize prisma
console.log("db", process.env.DATABASE_URI!);

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URI!,
});

//initalize client
export const prisma = new PrismaClient({ adapter });
