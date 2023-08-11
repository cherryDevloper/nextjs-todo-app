import Todo from "../../../server/models/index";
import dbConnect from "../../../server/utils/dbConnect";
dbConnect();
export default async function handler(req, res) {
  const { method, query, body } = req;
  const { todoId } = query;

  if (method === "DELETE") {
    await Todo.findByIdAndDelete(todoId);
    const allTodos = await Todo.find({});
    res.status(202).json({ message: "todo deleted successfully", allTodos });
  } else if (method === "GET") {
    const todo = await getOneTodo(query);
    res.status(200).json({ todo });
  } else if (method === "PATCH") {
    const updatedTodo = await editOneTodo(todoId, body);
    const allTodos = await Todo.find({}); // Get the updated array of all todos
    res
      .status(200)
      .json({ message: "Todo updated successfully", updatedTodo, allTodos });
  }
}
export async function getOneTodo(query) {
  const todo = await Todo.findById(query.todosId);
  return todo;
}
export async function editOneTodo(todoId, updatedTodo) {
  const todo = await Todo.findByIdAndUpdate(todoId, updatedTodo, { new: true });
  return todo;
}
