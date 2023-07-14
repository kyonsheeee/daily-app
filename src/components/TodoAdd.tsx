import { RefObject } from "react";

interface Props{
  buttonText: string;
  inputEl: RefObject<HTMLTextAreaElement>;
  handleAddTodoListItem: () => void;
}

export const TodoAdd = (props: Props) => {
  const {
    buttonText,
    inputEl,
    handleAddTodoListItem,
  } = props;
  return(
    <>
      <textarea ref={inputEl} />
      <button onClick={handleAddTodoListItem}>{buttonText}</button>
    </>
  )
};
