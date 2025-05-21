import './App.css';
import { useEffect,useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const baseUrl = "http://localhost:3001/todos";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error while fetching todos:", err));
  };

  // Yeni todo ekleme
  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      alert("Please enter a todo");
      return;
    }

    else if (todos.some((todo) => todo.title === newTodo)) {
      alert("Already exists");
      return;
    }


    const todoToAdd = {
      title: newTodo,
      completed: false,
    };

    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoToAdd),
    })
      .then((res) => res.json())
      .then(() => {
        setNewTodo(""); // input'u temizle
        fetchTodos();   // listeyi güncelle
      });
  };

  //delete todo

  const handleDeleteTodo = (id) =>{
    fetch(`${baseUrl}/${id}`,{
      method:"DELETE"
    })
    .then(() => fetchTodos())
    .catch((err) => console.error("Error while deleting todo:", err));
  }

  const handleToggleComplate = (todo) =>{
    fetch(`${baseUrl}/${todo.id}`,{
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    })
    .then(() => fetchTodos())
    .catch((err) => console.error("Error while deleting todo:", err));
  };

return (
    <div className="App">
      <h1>Todo Lists</h1>

      <div>
        <input
          type="text"
          placeholder="Yeni todo gir..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>ADD</button>
      </div>

      <ul>
      {todos.map((todo) => (
        <li key={todo.id} className={todo.completed ? "completed" : ""}>
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : "black",
              cursor: "pointer",
            }}
            onClick={() => handleToggleComplate(todo)}
          >
            {todo.title}
          </span>

          <button onClick={() => handleToggleComplate(todo)}>
            {todo.completed ? "Undo" : "Done"}
          </button>

          <button style={{ backgroundColor: "red", color: "white" }} onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default App;
