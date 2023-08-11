import axios from "axios";
import { useState } from "react";
import TodoList from "../components/todos/TodoList";
import AddTodo from "../components/todos/AddTodo";
import Todo from "../server/models";
import SpinComponent from "../components/Spin";
import Alert from "../components/Alert";

export default function Todos({ todos }) {
  const [data, setData] = useState(todos);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    type: "",
  });
  const onClickAddTodo = () => setIsAdding(true);
  const handleMessage = (type, message) => {
    setMessage((prev) => ({
      ...prev,
      type: type,
      title: message,
    }));
    setTimeout(() => {
      setMessage((prev) => ({
        ...prev,
        type: "",
        title: "",
      }));
    }, 2000);
  };
  const deleteTodo = async (todoId) => {
    setLoading(true);
    await axios.delete(`/api/todos/${todoId}`).then((res) => {
      setData(res.data);
      setLoading(false);
      handleMessage("success", res.data.message);
    });
  };
  const addNewTodo = async (e, todos) => {
    setLoading(true);
    e.preventDefault();
    await axios.post(`/api/todos/`, { todos }).then((res) => {
      setData(res.data);
      setIsAdding(false);
      handleMessage("success", res.data.message);
      setLoading(false);
    });
  };
  const editTodo = async (todoId, updatedTodo) => {
    setLoading(true);
    await axios.patch(`/api/todos/${todoId}`, updatedTodo).then((res) => {
      setData(res.data.allTodos);
      setLoading(false);
      handleMessage("success", res.data.message);
    });
  };
  return (
    <>
      <header className="w-full bg-gray-200 p-6">
        Welcome <b>Sharare</b> , what are your tasks for today?
      </header>
      <div className="w-full flex justify-center items-center ">
        <Alert
          message={message.title}
          type={message.type}
          isVisible={message.title !== ""}
        />
      </div>
      <div className="container p-7  xl:max-w-screen-xl mx-auto ">
        <section className="flex w-full  justify-between flex-col">
          <div>
            {!isAdding ? (
              <button
                onClick={onClickAddTodo}
                className="w-64 border mb-8 bg-orange-500 rounded-md text-white  h-10 hover:bg-orange-400"
              >
                Add Todo
              </button>
            ) : (
              <AddTodo
                addTodo={addNewTodo}
                setIsAdding={setIsAdding}
                loading={loading}
              />
            )}
          </div>
          <TodoList
            data={data.allTodos || data}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </section>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const todo = await Todo.find({});
  return {
    props: {
      todos: JSON.parse(JSON.stringify(todo)),
    },
  };
}
