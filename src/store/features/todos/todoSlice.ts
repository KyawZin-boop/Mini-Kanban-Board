import { Todo } from '@/modules/home/chunks/types';
import { StateCreator } from 'zustand';


export interface TodoSlice {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    addTodo: (todo: Omit<Todo, 'id'>) => void;
    editTodo: (id: string, updates: Partial<Omit<Todo, 'id'>>) => void;
    deleteTodo: (id: string) => void;
    deleteTodoId: string;
    setDeleteTodo: (id: string) => void;
    toggleTodoStatus: (id: string) => void;
    handleCheckboxChange: (id: string) => void;
    editTodoItem: Todo | null;
    setEditTodo: (id: string) => void;
    clearEditTodo: () => void;
    searchQuery: string;
    isSearch: boolean;
    searchTodo: Todo[];
    handleSearch: (query: string) => void;
  }

  export const createTodoSlice: StateCreator<
  TodoSlice,
  [],
  [],
  TodoSlice
> = (set) => ({
  todos: JSON.parse(localStorage.getItem('todos') || '[]') as Todo[],

  setTodos: (newTodos) => {
    set(() => {
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  },
  
  editTodoItem: JSON.parse(localStorage.getItem('editTodoItem') || 'null') as Todo,
  
  addTodo: (todo) => {
    const newTodo: Todo = {
        ...todo,
        id: crypto.randomUUID(),
    //   createdAt: new Date()
    };
    
    set((state) => {
      const newTodos = [...state.todos, newTodo];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      if(state.searchQuery !== '') {
        const result = newTodos.filter(todo => todo.title.toLowerCase().includes(state.searchQuery.toLowerCase()) || (todo.description !== undefined ? todo.description.toLowerCase().includes(state.searchQuery.toLowerCase()) : false));
        return { todos: newTodos, searchTodo: result };
      }  
      return { todos: newTodos };
    });
  },

  setEditTodo: (id) => {
    set((state) => {
      const editItem = state.todos.find(todo => todo.id === id);
      return { editTodoItem: editItem };
    })
  },

  editTodo: (id, updates) => {
    set((state) => {
      const newTodos = state.todos.map(todo => 
        todo.id === id ? { ...todo, ...updates } : todo
      );
      const inSearchIndex = state.searchTodo.findIndex(todo => todo.id === id);
      if(inSearchIndex !== -1) state.searchTodo[inSearchIndex] = { ...state.searchTodo[inSearchIndex], ...updates };
      localStorage.setItem('todos', JSON.stringify(newTodos));
      
      return { todos: newTodos, editTodoItem: null };
    });
  },

  clearEditTodo: () => {
    set(() => {
      return { editTodoItem: null };
    })
  },

  deleteTodoId: '',

  deleteTodo: (id) => {
    set((state) => {
      const newTodos = state.todos.filter(todo => todo.id !== id);
      const inSearchIndex = state.searchTodo.findIndex(todo => todo.id === id);
      if(inSearchIndex !== -1) state.searchTodo = state.searchTodo.filter((_, index) => index !== inSearchIndex);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  },

  setDeleteTodo: (id) => {
    set(() => {
      return { deleteTodoId: id };
    });
  },

  toggleTodoStatus: (id) => {
    set((state) => {
      const newTodos = state.todos.map(todo => {
        if (todo.id !== id) return todo;
        
        const statusOrder: Todo['status'][] = ['todo', 'inProgress', 'completed'];
        const currentIndex = statusOrder.indexOf(todo.status);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
        
        return { ...todo, status: nextStatus };
      });
      
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  },

  handleCheckboxChange: (id) => {
    set((state) => {
      const newTodos = state.todos.map(todo => {
        if (todo.id !== id) return todo;
        
        return { ...todo, status: todo.status === 'completed' ? 'todo' as Todo['status'] : 'completed' as Todo['status'] };
      });

      const searchTodo = state.searchTodo.map(todo => {
        if (todo.id !== id) return todo;
        
        return { ...todo, status: todo.status === 'completed' ? 'todo' as Todo['status'] : 'completed' as Todo['status'] };
      })
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos, searchTodo: searchTodo };
    });
  },

  isSearch: false,

  searchQuery: '',

  searchTodo: [],

  handleSearch: (query) => {
    set((state) => {
      if (query === '') return { isSearch: false, searchQuery: '', searchTodo: [] };
      state.searchQuery = query;
      const result = state.todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()) || (todo.description !== undefined ? todo.description.toLowerCase().includes(query.toLowerCase()) : false)
      );
      return { isSearch: true, searchTodo: result };
    });
  },
});