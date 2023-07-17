import { deleteTodoAction, updateTodoAction } from "@/app/_action";
import CheckBox from "./checkbox";
import { TodoClass } from "@/models/Todo";

interface TodoItemProps {
  todo: TodoClass;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <form className="flex items-center space-x-2 mb-2">
      <button
        className={`px-2 py-1 flex-1 text-left ${
          todo.completed ? "line-through" : ""
        }`}
        formAction={async () => {
          "use server";
          await updateTodoAction(todo.id, { completed: !todo.completed }, "/");
        }}
      >
        {todo.title}
      </button>
      <div className="flex items-center">
        <CheckBox todo={todo} />
        <button
          className="px-2 py-1 ml-2 text-white rounded bg-red-500 "
          formAction={async () => {
            "use server";
            await deleteTodoAction({
              id: todo.id,
              path: "/",
            });
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default TodoItem;
