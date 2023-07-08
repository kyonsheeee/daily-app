import axios from "axios";
import { Todo } from "../types/Todo";

const todoDataURL = "http://localhost:3100/todos";

// 全 TODO リスト取得
export const getAllTodosData = async () => {
  const response = await axios.get(todoDataURL);
  console.log(response);
  return response.data;
};

// 1件 TODO を追加する
export const addTodoData = async (todo: Todo) => {
  const response = await axios.post(todoDataURL, todo);
  return response.data;
};

// 1件の TODO を削除する
export const deleteTodoData = async (id: string) => {
  await axios.delete(`${todoDataURL}/${id}`);
  return id;
};

// 1件の TODO を更新する
export const updateTodoData = async (id: string, todo: Todo) => {
  const response = await axios.put(`${todoDataURL}/${id}`, todo);
  return response.data;
};
