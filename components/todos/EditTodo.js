import React from "react";

const EditTodo = ({ id, description, title, handleEdit }) => {
  return (
    <form
      className="flex flex-col w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleEdit(id, {
          title: e.target.title.value,
          description: e.target.description.value,
        });
      }}
    >
      <label>title</label>
      <input
        defaultValue={title}
        name="title"
        className="w-full mt-3 p-3 rounded-md shadow-md focus:border-orange-500"
      />
      <label>description</label>
      <textarea
        name="description"
        className="w-full mt-3 p-3 rounded-md shadow-md focus:border-orange-500"
        defaultValue={description}
      />
      <button
        type="submit"
        className="bg-orange-400 text-white p-2 rounded-md mt-3 w-48"
      >
        Done
      </button>
    </form>
  );
};

export default EditTodo;
