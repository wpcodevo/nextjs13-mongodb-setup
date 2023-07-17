import { Todo } from "@/models/Todo";
import connectDB from "./connect-db";
import { stringToObjectId } from "./utils";

interface TodoFilter {
  page?: number;
  limit?: number;
}

export async function getTodos(filter: TodoFilter = {}) {
  try {
    await connectDB();

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const todos = await Todo.find().skip(skip).limit(limit).lean().exec();

    const results = todos.length;

    return {
      todos: todos,
      page,
      limit,
      results,
    };
  } catch (error) {
    return { error };
  }
}

export async function createTodo(title: string) {
  try {
    await connectDB();

    const todo = await Todo.create({ title });

    return {
      todo,
    };
  } catch (error) {
    return { error };
  }
}

export async function getTodo(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Todo not found" };
    }

    const todo = await Todo.findById(parsedId).lean().exec();
    if (todo) {
      return {
        todo,
      };
    } else {
      return { error: "Todo not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function updateTodo(
  id: string,
  { title, completed }: { title?: string; completed?: boolean }
) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Todo not found" };
    }

    const todo = await Todo.findByIdAndUpdate(
      parsedId,
      { title, completed },
      { new: true }
    )
      .lean()
      .exec();

    if (todo) {
      return {
        todo,
      };
    } else {
      return { error: "Todo not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function deleteTodo(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Todo not found" };
    }

    const todo = await Todo.findByIdAndDelete(parsedId).exec();

    if (todo) {
      return {};
    } else {
      return { error: "Todo not found" };
    }
  } catch (error) {
    return { error };
  }
}
