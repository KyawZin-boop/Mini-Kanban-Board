import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Todo } from './types';
import { LuPenLine, LuTrash2 } from 'react-icons/lu';
import { useStore } from '@/store';

interface TodoCardProps {
  todo: Todo;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const { handleCheckboxChange, setEditTodo, openDialog, openAlert, setDeleteTodo } = useStore();

  const handleEdit = (id: string) => {
    setEditTodo(id);
    openDialog();
  };

  const handleDelete = (id: string) => {
    setDeleteTodo(id);
    openAlert();
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded-md shadow-sm border border-gray-100 cursor-grabbing hover:bg-gray-50 flex items-center gap-3"
    >
      <label className="container">
        <input checked={todo.status == 'completed'} onChange={() => handleCheckboxChange(todo.id)} type="checkbox" />
        <div className="checkmark"></div>
      </label>
      <div className='flex-1'>
          <h4 className="text-gray-800 font-medium">{todo.status == 'completed' ? <span className='line-through text-blue-500'>{todo.title}</span> : todo.title}</h4>
          <p className="text-gray-400 text-sm">{todo.description}</p>
      </div>
      <div className='flex gap-2'>
          <LuPenLine className="w-5 h-5 cursor-pointer text-blue-500 hover:text-blue-600 transition-colors border-2 border-blue-500 rounded-sm duration-200" onClick={() => handleEdit(todo.id)}/>
          <LuTrash2 className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-600 transition-colors duration-200" onClick={() => handleDelete(todo.id)}/>
      </div>
    </div>
  );
};
