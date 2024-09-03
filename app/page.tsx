"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import SetTheme from "./components/setTheme";
import store from "./store";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [todo, setTodo] = useAtom(store.createTodoInput);

  const addTodo = useSetAtom(store.createTodo);

  const fetchTodo = useSetAtom(store.findTodo);

  const allTodo = useAtomValue(store.todoAtom);

  useEffect(() => {
    void fetchTodo();
  }, []);

  return (
    <div className="flex h-screen w-full justify-center items-center bg-base-100">
      <div className="bg-base-100 shadow-xl lg:w-2/3 h-[70%] md:w-3/4 sm:w-3/4 rounded-xl overflow-scroll">
        <div className="h-full w-full bg-base-300 p-4">
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
          <div className="bg-base-200 h-[80%] rounded-lg justify-center">
            {allTodo.length > 0 && allTodo != null
              ? allTodo.map((todo) => (
                  <div
                    key={todo?.id}
                    className="flex justify-between items-center p-4 gap-2 border-b-2 border-base-300"
                  >
                    <div>{todo?.title}</div>
                    <div className="flex gap-4">
                      <button className="text-primary">
                        <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                      </button>
                      <button className="text-secondary">
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                      </button>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
