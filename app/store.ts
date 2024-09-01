import { Prisma, Todo } from "@prisma/client";
import { atom } from "jotai";

const createTodoInput = atom<Prisma.TodoCreateInput>();

const updateTodoData = atom<Prisma.TodoUpdateInput>();

const createTodo = atom(null, async (get, set): Promise<Todo> => {
  const todoData = get(createTodoInput);
  const response = await fetch("/api/todo/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todoData }),
  });

  console.log(response.json());
  return response
});

export default {
  createTodoInput,
  updateTodoData,
  createTodo,
};
