import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";
import Link from "next/link";
import EditTodo from "./EditTodo";
const completedTask = "bg-green-100";
const TodoList = ({ data, deleteTodo, editTodo }) => {
  const [selectedId, setSelectedId] = useState(null);
  const openEditor = (id) => {
    setSelectedId(id);
  };
  const handleEdit = (id, data) => {
    editTodo(id, data);
    setSelectedId(null);
  };
  const handleTaskStatus = (id, isCompleted) => {
    editTodo(id, { isCompleted });
  };
  return (
    <div className="w-full   shadow-lg bg-white p-2 md:p-2 rounded-xl">
      {data?.map(({ title, _id, description, isCompleted }) => (
        <div
          key={_id}
          className={`p-4 flex items-center justify-between border border-gray-100 mb-4 md:p-4 rounded-xl ${
            isCompleted ? completedTask : ""
          }`}
        >
          {selectedId === _id ? (
            <EditTodo
              id={_id}
              title={title}
              description={description}
              handleEdit={handleEdit}
            />
          ) : (
            <>
              <Link href={`/todos/${_id}`}>
                <div>
                  <h2 className="font-bold">{title}</h2>
                  <h5 className="text-gray-400">{description}</h5>
                </div>
              </Link>
              <div className="flex  justify-between">
                <button
                  className="mr-3 text-blue-500"
                  onClick={() => openEditor(_id)}
                >
                  <AiOutlineEdit />
                </button>
                <button
                  className="mr-3 text-red-500"
                  onClick={() => deleteTodo(_id)}
                >
                  <AiOutlineDelete />
                </button>
                <button
                  className="mr-3 text-green-500 font-bold"
                  onClick={() => {
                    handleTaskStatus(_id, !isCompleted);
                  }}
                >
                  <AiOutlineCheck />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
export default TodoList;
