import { create } from 'zustand';
import { createLoaderSlice, LoaderSlice } from './features/loader/loaderSlice';
import { createTodoSlice, TodoSlice } from './features/todos';
import { createDialogSlice, DialogSlice } from './features/dialog';

type StoreState = LoaderSlice & TodoSlice & DialogSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createLoaderSlice(...a),
  ...createTodoSlice(...a),
  ...createDialogSlice(...a),
}));

export const useLoaderStore = () => useStore((state) => ({
  isLoading: state.isLoading,
  openLoader: state.openLoader,
  hideLoader: state.hideLoader,
  isOpen: state.isOpen,
  openDialog: state.openDialog,
  closeDialog: state.closeDialog,
  isAlert: state.isAlert,
  openAlert: state.openAlert,
  closeAlert: state.closeAlert,
  todos: state.todos,
  setTodos: state.setTodos,
  addTodo: state.addTodo,
  editTodo: state.editTodo,
  deleteTodo: state.deleteTodo,
  deleteTodoId: state.deleteTodoId,
  setDeleteTodo: state.setDeleteTodo,
  toggleTodoStatus: state.toggleTodoStatus,
  handleCheckboxChange: state.handleCheckboxChange,
  editTodoItem: state.editTodoItem,
  setEditTodo: state.setEditTodo,
  clearEditTodo: state.clearEditTodo,
  isSearch: state.isSearch,
  searchTodo: state.searchTodo,
  handleSearch: state.handleSearch,
}));