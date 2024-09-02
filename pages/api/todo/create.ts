import todo from "@/lib/todo";
import { Todo } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  console.log("Request method:", req.method);
  console.log("Request body:", req.body);

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        // Validate body format
        if (!req.body || typeof req.body !== "object") {
          console.error("Invalid JSON body:", req.body);
          return res.status(400).json({ error: "Invalid JSON body" });
        }

        const todoObject: Todo = await todo.create(req.body);
        console.log("Todo created successfully:", todoObject);
        return res.status(201).json({ data: todoObject });
      } catch (error) {
        console.error("Error creating todo:", error);
        return res.status(400).json({ error: (error as Error).message });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
