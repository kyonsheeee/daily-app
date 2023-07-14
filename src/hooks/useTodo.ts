import React, { useState, useEffect } from "react";
import { ulid } from "ulid";

import * as todoData from "../apis/todos";
import { Todo } from "../types/Todo";

export const useTodo = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    todoData.getAllTodosData().then((todo) => {
      console.log(...todo);
      setTodoList([...todo].reverse());
    });
  }, []);

  // todo の done を反転させる
  const toggleTodoListItemStatus = (id: string, done: boolean) => {
    // todoList から、　id が一致する1件を取り出す
    const todoItem = todoList.find((item: Todo) => item.id === id);
    // done を反転させて、新たな item を作成
    const newTodoItem: Todo = { ...todoItem!, done: !done };
    // サーバに更新 API を呼ぶ
    todoData.updateTodoData(id, newTodoItem).then((updateTodo) => {
      // 成功したら、 todoList を更新。 id が一致しているものを、サーバから返って来た updateTodo で更新する
      const newTodoList = todoList.map((item) =>
        item.id !== updateTodo.id ? item : updateTodo
      );
      // 新しい todoList を state にセットする
      setTodoList(newTodoList);
    });
  };

  const addTodoListItem = async(todoContent: string) => {
    // 新しい item を作成する
    const newTodoItem = { id: ulid(), content: todoContent, done: false };
    // サーバの追加 API を呼ぶ
    try {
      const addTodo = await todoData.addTodoData(newTodoItem) ;
      // addTodo を todoList に追加して state にセットする
      setTodoList([addTodo, ...todoList]);
    }catch (e) {
      console.log(e);
    }
  };

  const deleteTodoListItem = (id: string) => {
    // サーバの削除 API を呼ぶ
    todoData.deleteTodoData(id).then((deleteid) => {
      const newTodoList = todoList.filter((item) => item.id !== deleteid);
      // 1件削除された新しい todoList に追加して state にセットする
      setTodoList(newTodoList);
    });
  };

  // 作成した関数を返す
  return {
    todoList, toggleTodoListItemStatus, addTodoListItem, deleteTodoListItem
  }
};
