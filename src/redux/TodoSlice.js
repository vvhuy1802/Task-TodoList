import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

export const TodoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = action.payload;
    },
    newTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      const {id, title, completed} = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.completed = completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});
export const {addTodo, updateTodo, deleteTodo, newTodo} = TodoSlice.actions;

export default TodoSlice.reducer;
