"use server";

import { createTodo, deleteTodo, updateTodo } from "@/lib/todo-db";
import { revalidatePath } from "next/cache";

export async function createTodoAction({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  await createTodo(title);
  revalidatePath(path);
}

export async function updateTodoAction(
  id: string,
  update: { tilte?: string; completed?: boolean },
  path: string
) {
  await updateTodo(id, update);
  revalidatePath(path);
}

export async function deleteTodoAction({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  await deleteTodo(id);
  revalidatePath(path);
}
