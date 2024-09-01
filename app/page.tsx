"use client";

import SetTheme from "./components/setTheme";

export default function Page() {
  return (
    <div className="flex h-screen w-full justify-center items-center bg-base-100">
      <div className="bg-base-100 shadow-xl lg:w-2/3 h-[70%] md:w-3/4 sm:w-3/4 rounded-xl overflow-scroll">
        <div className="h-full w-full bg-base-200 p-4">
          <SetTheme className="absolute" />
          <div className="flex justify-center h-[10%] text-4xl items-center text-primary ">
            Todo
          </div>
          <div className="flex h-[8%] gap-2">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full h-full"
            />
            <button className="btn btn-primary rounded-lg h-full px-8 text-lg">
              Add
            </button>
          </div>
          <hr className="border-t-2 border-base-300 my-2" />
          <div className="bg-base-100 h-[80%] rounded-lg">hello</div>
        </div>
      </div>
    </div>
  );
}
