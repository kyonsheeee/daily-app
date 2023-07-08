import { Todo } from "../types/Todo";

// 1つの TODO, 内容と移動・削除ボタン
export const TodoItem = ({
  todo,
  toggleTodoListItemStatus,
  deleteTodoListItem,
}: {
  todo: Todo;
  toggleTodoListItemStatus: any;
  deleteTodoListItem: any;
}) => {
  // onClick イベントが発生したら useTodo フックを呼び出す
  const handleToggleTodoListItemStatus = () =>
    toggleTodoListItemStatus(todo.id, todo.done);
  const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);
  return(
    <>
      {todo.content}
      <button onClick={handleToggleTodoListItemStatus}>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>
      <button onClick={handleDeleteTodoListItem}>削除</button>
    </>
  )


};
