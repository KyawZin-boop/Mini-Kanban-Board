import React from 'react';
import { Todo } from './types';
import { TodoCard } from './TodoCard';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface TodoColumnProps {
  title: string;
  status: Todo['status'];
  todos: Todo[];
  activeColumn: Todo['status'] | null;
  Wrapper?: React.FC<{ children: React.ReactNode }>;
}

export const TodoColumn: React.FC<TodoColumnProps> = ({
  title,
  todos,
  activeColumn,
  Wrapper = ({ children }) => <>{children}</>,
}) => {
  const isEmpty = todos.length === 0;
  const isActive = activeColumn === status;

  return (
    <Wrapper>
      <div className={`p-4 border rounded-lg shadow-lg min-h-[400px] transition-all duration-200 ${
        isActive ? 'bg-gray-50' : 'bg-[#c2e6f3]'} `}>
        <h2 className="text-lg font-semibold mb-4 text-center ">{title} - {todos.length}</h2>
        <SortableContext items={todos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {todos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
            {isEmpty && (
              <div className="text-blue-500 text-sm text-center py-8">
                There's no tasks to show!
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </Wrapper>
  );
};