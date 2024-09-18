"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import SetTheme from "./components/setTheme";
import store from "./store";
import { useEffect, useState } from "react";
import TodoInfo from "./components/todo";
import Skeleton from "./components/skeleton";

export default function Page() {
  const [todo, setTodo] = useAtom(store.createTodoInput);

  const addTodo = useSetAtom(store.createTodo);

  const fetchTodo = useSetAtom(store.findTodo);

  const allTodo = useAtomValue(store.todoAtom);

  const [isLoading, setIsLoading] = useState(false);

  const dummyTodo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    setIsLoading(true);
    void fetchTodo().then((res) => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex h-screen w-full justify-center items-center bg-base-100">
      <div className="bg-base-300 p-4 shadow-xl lg:w-2/3 h-[70%] md:w-3/4 sm:w-3/4 rounded-xl">
        <SetTheme className="absolute text-primary" />
        <div className="flex justify-center h-[10%] text-4xl items-center text-primary ">
          Todo
        </div>
        <div className="flex h-[8%] gap-2">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full h-full"
            onChange={(e) => setTodo({ title: e.target.value })}
          />
          <button
            className="btn btn-primary rounded-lg h-full px-8 text-lg"
            onClick={() => {
              void addTodo();
            }}
          >
            Add
          </button>
        </div>
        <hr className="border-t-2 border-base-300 my-2" />
        <div className="flex-col bg-base-200 w-full h-4/5 rounded-lg justify-center overflow-y-scroll overflow-x-hidden p-1">
          {allTodo.length > 0 && allTodo != null && !isLoading
            ? allTodo.map((todo) => <TodoInfo todo={todo} key={todo.id} />)
            : dummyTodo.map((it) => <Skeleton key={it} />)}
        </div>
      </div>
    </div>
  );
}
