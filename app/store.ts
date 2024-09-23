import { Prisma, Todo } from "@prisma/client";
import { atom } from "jotai";
import { atomWithReset, RESET } from "jotai/utils";
import { toast } from "react-toastify";

const themeAtom = atom("dark");

const isLoadingAtom = atom<boolean>(false);

// ==================== create todo ======================
const createTodoInput = atomWithReset<Prisma.TodoCreateInput>({
  title: "",
});

async function createTodo(data: Prisma.TodoCreateInput): Promise<Todo> {
  const response = await fetch("/api/todo/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  });
  const jsonResponse = await response.json();
  return jsonResponse.data as Todo;
}
const createTodoAtom = atom(null, async (get, set): Promise<boolean> => {
  set(isLoadingAtom, true);
  const todoData = get(createTodoInput);
  const response = await createTodo(todoData);
  if (response != null) {
    set(createTodoInput, RESET);
    set(findTodoAtom);
    set(isLoadingAtom, false);
    toast.success("Todo add successfully");
    return true;
  } else {
    set(isLoadingAtom, false);
    toast.error("Todo adding failed");
    return false;
  }
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

async function findTodo(): Promise<Todo[]> {
  const response = await fetch(`/api/todo/find`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse.data;
}

const findTodoAtom = atom(null, async (get, set): Promise<void> => {
  const response = await findTodo();
  if (response != null) {
    set(todoAtom, response);
  }
});
// =========================================================

// ==================== delete todo ========================
async function deleteTodo(todoId: string): Promise<Todo> {
  const response = await fetch(`/api/todo/${todoId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse.data;
}

const deleteTodoAtom = atom(
  null,
  async (get, set, todoId: string): Promise<boolean> => {
    set(isLoadingAtom, true);
    const response = await deleteTodo(todoId);
    if (response != null) {
      set(findTodoAtom);
      set(isLoadingAtom, false);
      toast.success("Todo deleted successfully");
      return true;
    } else {
      set(isLoadingAtom, false);
      toast.error("Todo deleting failed");
      return false;
    }
  },
);
// =========================================================

export default {
  createTodoInput,
  updateTodoData,
  createTodoAtom,
  updateTodo,
  deleteTodoAtom,
  findTodoAtom,
  isLoadingAtom,
  todoAtom,
  themeAtom,
};
