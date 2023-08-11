import React from "react";
import { getOneTodo } from "../api/todos/[todoId]";

const TodoDetails = ({ todo }) => {
  return (
    <div className="flex  bg-white h-auto flex-col justify-center p-8 m-8">
      <h1>title : {todo?.title}</h1>
      <h1>description:{todo?.description}</h1>
      status:{todo?.isCompleted ? "Done" : "Not Done"}
    </div>
  );
};

export default TodoDetails;
export async function getServerSideProps(context) {
  const { query } = context;
  const todo = await getOneTodo(query);
  return {
    props: {
      todo: JSON.parse(JSON.stringify(todo)),
    },
  };
}
