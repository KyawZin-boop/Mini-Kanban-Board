// HomeView.tsx
import { LuCirclePlus } from 'react-icons/lu';
import { TodoList } from './chunks/TodoList';
import HomeDialog from './chunks/HomeDialog';
import { useStore } from '@/store';
import { SearchTodoList } from './chunks/SearchTodoList';
import { AlertDialog } from '@/components/alertDialog/AlertDialog';

const HomeView = () => {
  const { todos, openDialog, isSearch } = useStore();

  const totalTasks = todos.length;
  // const completedTasks = todos.filter((todo) => todo.status === 'completed').length;

  return (
    <main className="min-h-full w-full px-4 py-5 overflow-y-auto dot-pattern">
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex justify-between items-center w-full mb-8">
          <button
            className="text-md text-white border-2 hover:bg-[#005E9A] cursor-pointer bg-[#00ADEE] rounded-md py-2 px-4 font-bold flex items-center gap-2"
            onClick={() => openDialog()}
          >
            <LuCirclePlus /> <span>Add New Task</span>
          </button>
          <div className="text-md text-[#005E9A] font-bold py-2 px-4">
            <span>Total Tasks - {totalTasks}</span>
          </div>
        </div>
        {!isSearch ? <TodoList /> : <SearchTodoList />}
        <HomeDialog />
        <AlertDialog />
      </div>
    </main>
  );
};

export default HomeView;
