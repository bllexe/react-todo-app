import React, { Component } from 'react'


const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <li className={todo.completed ? "completed" : ""}>
      <span onClick={() => onToggle(todo)}>
        {todo.title}
      </span>
      <button onClick={() => onToggle(todo)}>
        {todo.completed ? "Undo" : "Done"}
      </button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
};


export default TodoItem