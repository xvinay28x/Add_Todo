import React from "react";
import { type Todo } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { DateTime } from "luxon";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";

export default function TodoInfo({ todo }: { todo: Todo }): React.ReactElement {
  return (
    <div
      key={todo?.id}
      className="flex justify-between items-center p-4 gap-2 border-b-2 border-base-300"
    >
      <div>{todo?.title}</div>
      <div className="flex gap-4">
        <div className="flex text-stone-700 text-sm gap-2">
          <div>
            <FontAwesomeIcon icon={faClock} size="lg" />
          </div>
          <div>
            {DateTime.fromISO(todo.createdAt.toString()).toFormat("hh:mm")}
          </div>
        </div>
        <button className="text-primary">
          <FontAwesomeIcon icon={faPenToSquare} size="lg" />
        </button>
        <button className="text-secondary">
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>
      </div>
    </div>
  );
}
