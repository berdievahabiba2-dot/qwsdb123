
import { atom } from "jotai";
import axios from "axios";

const api = axios.create({baseURL: "https://to-dos-api.softclub.tj/api/",});

export const todosAtom = atom([]);
export const loadingAtom = atom(false);

export const getTodosAtom = atom(null, async (get, set) => {
  set(loadingAtom, true);
  const { data } = await api.get("to-dos");
  set(todosAtom, data.data);
  set(loadingAtom, false);
});

export const addTodoAtom = atom(null, async (get, set, formData) => {
  await api.post("to-dos", formData);
  const { data } = await api.get("to-dos");
  set(todosAtom, data.data);
});

export const editTodoAtom = atom(null, async (get, set, todo) => {
  await api.put("to-dos", todo);
  const { data } = await api.get("to-dos");
  set(todosAtom, data.data);
});

export const deleteTodoAtom = atom(null, async (get, set, id) => {
  await api.delete(`to-dos?id=${id}`);
  const { data } = await api.get("to-dos");
  set(todosAtom, data.data);
});
