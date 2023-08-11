import { useState } from "react";
import SpinComponent from "../Spin";

const AddTodo = ({ addTodo, setIsAdding, loading }) => {
  const [value, setValue] = useState({ title: "", description: "" });
  const onChangeTitle = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onCancel = () => setIsAdding(false);
  return (
    <form
      onSubmit={(e) => addTodo(e, value)}
      className="bg-orange-100 w-full p-3 mt-2 mb-5 rounded-md shadow-md"
    >
      <input
        name="title"
        type="text"
        className="w-full mt-3 p-3 rounded-md shadow-md focus:border-orange-500"
        value={value.title}
        placeholder="Task 1..."
        onChange={(e) => onChangeTitle(e)}
      />
      <textarea
        name="description"
        type="text"
        className="w-full mt-3 p-3 rounded-md shadow-md focus:border-orange-500"
        value={value.description}
        placeholder="description"
        onChange={(e) => onChangeTitle(e)}
      />
      <button
        disabled={loading}
        type="submit"
        className={`bg-orange-400 mr-2 text-white p-2 rounded-md mt-3 ${
          loading ? "opacity-50" : "opacity-100"
        }`}
      >
        Submit
      </button>
      <button
        disabled={loading}
        onClick={onCancel}
        className={`bg-white text-orange-400 p-2 rounded-md mt-3 ${
          loading ? "opacity-50" : "opacity-100"
        } `}
      >
        Cancel
      </button>
    </form>
  );
};
export default AddTodo;
