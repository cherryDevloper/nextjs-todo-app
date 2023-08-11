import dbConnect from "../../../server/utils/dbConnect";
import Todo from "../../../server/models";
// import { todos } from "../../../data/todos";
dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  if (method === "POST") {
    const { todos } = body;
    await Todo.create({
      title: todos.title,
      description: todos.description,
    });
    const allTodos = await Todo.find({});
    return res.status(201).json({ message: "new todo added ", allTodos });
  } else if (method === "GET") {
    try {
      const todos = await Todo.find({});
      await Todo.find({});
      res.status(200).json({ todos });
    } catch (error) {
      console.error("Error fetching todos:", error.message);
      res.status(500).json({ error: "Error fetching todos" });
    }
  }
}
