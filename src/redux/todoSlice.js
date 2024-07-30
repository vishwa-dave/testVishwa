// slices/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    setTodos: (state, action) => {
      state.items = action.payload;
    },
    editTask: (state, action) => {
      console.log("state ", state, action)
      const index = state.items.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addTodo, removeTodo, setTodos , editTask } = todoSlice.actions;
export default todoSlice.reducer;
