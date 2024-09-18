import { Prisma, Todo } from "@prisma/client";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

// ==================== create todo ======================
const createTodoInput = atom<Prisma.TodoCreateInput>();

const createTodo = atom(null, async (get, set): Promise<Todo> => {
  const todoData = get(createTodoInput);
  const response = await fetch("/api/todo/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...todoData }),
  });
  const jsonResponse = await response.json();
  return jsonResponse.data as Todo;
});
// =======================================================

// ==================== update todo ======================
const updateTodoData = atom<Prisma.TodoUpdateInput>();

const updateTodo = atom(
  null,
  async (get, set, todoId: string): Promise<Todo> => {
    const todoData = get(updateTodoData);
    const response = await fetch(`/api/todo/${todoId}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...todoData }),
    });
    const jsonResponse = await response.json();
    return jsonResponse.data as Todo;
  },
);
// =======================================================

// ==================== find todo ========================
const todoAtom = atomWithReset<Todo[]>([]);

const findTodo = atom(null, async (get, set): Promise<void> => {
  const response = await fetch(`/api/todo/find`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await response.json();
  set(todoAtom, jsonResponse.data);
});
// =========================================================

// ==================== delete todo ========================
const deleteTodo = atom(
  null,
  async (get, set, todoId: string): Promise<Todo> => {
    const response = await fetch(`/api/todo/${todoId}/delete`, {
      method: "UPDATE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse.data;
  },
);
// =========================================================

export default {
  createTodoInput,
  updateTodoData,
  createTodo,
  updateTodo,
  deleteTodo,
  findTodo,
  todoAtom,
};
