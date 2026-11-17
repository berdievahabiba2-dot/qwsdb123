
import { useEffect, useState } from "react";
import { useTodoStore } from "./store";

const App = () => {
  const {todos,loading,getTodos,addTodo,editTodo,deleteTodo,} = useTodoStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getTodos();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    Array.from(images).forEach((img) => {
      formData.append("Images", img);
    });

    await (editId? editTodo({ id: editId, name, description }): addTodo(formData));
    setName("");
    setDescription("");
    setImages([]);
    setEditId(null);
  };

  return (
    <div>
      <h1>My Todos - Zustand</h1>
      <input value={name}onChange={(e) => setName(e.target.value)}placeholder="Name"/>
      <input value={description} onChange={(e) => setDescription(e.target.value)}placeholder="Description"/>
      <input type="file" multiple onChange={(e) => setImages(e.target.files)}/>
      <button onClick={handleSubmit}>{editId ? "Edit" : "Add"}</button>

      {loading && <h3>Loading...</h3>}
      {todos?.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
          {todo.images?.map((img) => (
            <img key={img.id}src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}width="100"alt="todo"/>
          ))}

          <button onClick={() => {setEditId(todo.id);setName(todo.name);setDescription(todo.description);}}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
export default App;