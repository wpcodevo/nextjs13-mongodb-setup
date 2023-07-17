import { createTodoAction } from "@/app/_action";

export default function TodoForm() {
  async function action(data: FormData) {
    "use server";

    const title = data.get("title");
    if (!title || typeof title !== "string") {
      return;
    }

    // call server action
    await createTodoAction({ title, path: "/" });
  }

  return (
    <form
      action={action}
      key={Math.random()}
      className="flex items-center space-x-2 mb-4"
    >
      <input
        type="text"
        name="title"
        className="border rounded px-2 py-1 flex-1"
      />
      <button className="px-4 py-1 text-white rounded bg-green-500">Add</button>
    </form>
  );
}
