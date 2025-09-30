import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, newTask, completed } = action.payload;
      return state.map(task =>
        task.id === id ? { ...task, chores: newTask, completed: completed ?? task.completed } : task
      );
    },
    clearAll: () => {
      return [];
    },
    toggleCompleted: (state, action) => {
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    },
    setTasks: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTask, deleteTask, updateTask, clearAll, toggleCompleted, setTasks } = todoSlice.actions;
export default todoSlice.reducer;
