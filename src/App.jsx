import React from "react";
import TodoForm from './components/ToDoForm';
import TodoList from './components/ToDoList';

const App = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default App;
