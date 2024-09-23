import todo from "@/lib/todo";
import { Todo } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { method } = req;
  switch (method) {
    case "DELETE":
      try {
        const todoId = req.query.todoId?.toString();
        const todoObjects = await todo.remove(todoId ?? "");
        console.log("Todo delete successfully:", todoObjects);
        return res.status(201).json({ data: todoObjects });
      } catch (error) {
        console.error("Error fetching todo:", error);
        return res.status(400).json({ error: (error as Error).message });
      }

    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
