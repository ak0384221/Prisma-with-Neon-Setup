import e, { urlencoded } from "express";
import { prisma } from "./config/db";

const app = e();
app.use(e.json());
app.use(urlencoded({ extended: true })); // Essential to read 'req.body'

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("DEBUG PRISMA ERROR:", error); // Check your terminal for this!
    res.status(500).json({
      error: "Could not fetch users",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// // 2. CREATE A USER (Write)
app.post("/users", async (req, res) => {
  const { email, name } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: { email, name },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "User already exists or data invalid" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
