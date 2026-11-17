
import { create } from "zustand";
import axios from "axios";

const api = axios.create({baseURL: "https://to-dos-api.softclub.tj/api/",});

export const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,

  getTodos: async () => {
    set({ loading: true });

    const { data } = await api.get("to-dos");

    set({
      todos: data.data,
      loading: false,
    });
  },

  addTodo: async (formData) => {
    await api.post("to-dos", formData);
    get().getTodos();
  },

  editTodo: async (todo) => {
    await api.put("to-dos", todo);
    get().getTodos();
  },

  deleteTodo: async (id) => {
    await api.delete(`to-dos?id=${id}`);
    get().getTodos();
  },
}));
