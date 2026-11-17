
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {useAddTodoMutation,useDeleteTodoMutation, useEditTodoMutation,useGetTodosQuery} from './todoApi'

const App = () => {
  const { data, isLoading } = useGetTodosQuery()
  const [addTodo] = useAddTodoMutation()
  const [editTodo] = useEditTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const [editId, setEditId] = useState(null)
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (e) => {
    const formData = new FormData()
    formData.append('Name', e.name)
    formData.append('Description', e.description)
    Array.from(e.images || []).forEach((img) =>formData.append('Images', img))

    editId? editTodo({id: editId,name: e.name,description: e.description}): addTodo(formData)
    reset()
    setEditId(null)
  }

  const handleEdit = (e) => {
    setEditId(e.id)
    reset({name: e.name,description: e.description})
  }

  const handleDelete = (id) => {
    deleteTodo(id)
  }

  if (isLoading) return <h2>Loading...</h2>
  return (
    <div>
      <h1>My Todos</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text"placeholder="name"{...register('name', { required: true })}/>
        <input type="text"placeholder="description"{...register('description', { required: true })}/>
        <input type="file" multiple {...register('images', { required: true })}/>
        <button type="submit">{editId ? "Edit" : "Add"}</button>
      </form>
      {data?.data?.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
          {todo.images?.map((img) => (
            <img key={img.id} src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}width="100"alt="todo"/>
          ))}
          <button onClick={() => handleEdit(todo)}>Edit</button>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
export default App