import { useEffect, useMemo, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  DragOverEvent,
  MeasuringStrategy
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Todo } from './types';
import { TodoColumn } from './TodoColumn';
import { DroppableColumn } from './DroppableColumn';
import { useStore } from '@/store';

export const TodoList = () => {
  const { todos, setTodos } = useStore();
  const [ todosState, setTodoState] = useState<Todo[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeColumn, setActiveColumn] = useState<Todo['status'] | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, 
      },
    })
  );

  useEffect(() => {
      if(todos){
        setTodoState(todos);
      }
  }, [todos])

  const activeTodo = todosState.find((todo) => todo.id === activeId);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    const activeTodo = todosState.find(todo => todo.id === event.active.id);
    if (activeTodo) {
      setActiveColumn(activeTodo.status);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) return;

    const overId = over.id as string;
    
    const columnIds = ['todo', 'inProgress', 'completed'];
    if (columnIds.includes(overId)) {
      setActiveColumn(overId as Todo['status']);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveColumn(null);
  
    if (!over) return;
  
    const activeId = active.id as string;
    const overId = over.id as string;
  
    const activeTodo = todosState.find(todo => todo.id === activeId);
    if (!activeTodo) return;
  
    const columnIds = ['todo', 'inProgress', 'completed'];
    if (columnIds.includes(overId)) {
      const newStatus = overId as Todo['status'];
      if (activeTodo.status !== newStatus) {
        const updated = todosState.map(todo =>
          todo.id === activeId ? { ...todo, status: newStatus } : todo
        );
        
        setTodoState(updated);
        setTodos(updated);
      }
      return;
    }
  
    const overTodo = todosState.find(todo => todo.id === overId);
    if (!overTodo) return;
  
    const targetStatus = overTodo.status;
  
    const updatedTodos = todosState.map(todo => 
      todo.id === activeId ? { ...todo, status: targetStatus } : todo
    );
  
    const targetColumnTodos = updatedTodos.filter(todo => todo.status === targetStatus);
    
    const oldIndex = targetColumnTodos.findIndex(todo => todo.id === activeId);
    let newIndex = targetColumnTodos.findIndex(todo => todo.id === overId);
  
    if (activeTodo.status !== targetStatus && newIndex === -1) {
      newIndex = targetColumnTodos.length - 1;
    }
  
    if (activeTodo.status === targetStatus) {
      if (oldIndex === newIndex) return;
    }
  
    const reordered = arrayMove(
      targetColumnTodos,
      oldIndex === -1 ? targetColumnTodos.length : oldIndex,
      newIndex
    );
  
    const finalTodos = [
      ...updatedTodos.filter(todo => todo.status !== targetStatus),
      ...reordered,
    ];
  
    setTodoState(finalTodos);
    setTodos(finalTodos);
  };

  const measuringConfig = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  const todoList = useMemo(() => todosState.filter(todo => todo.status === 'todo'), [todosState]);
  const inProgressList = useMemo(() => todosState.filter(todo => todo.status === 'inProgress'), [todosState]);
  const completedList = useMemo(() => todosState.filter(todo => todo.status === 'completed'), [todosState]);

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      measuring={measuringConfig}
    >
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 md:gap-4 lg:gap-6">
        <TodoColumn
          title="To Do"
          status="todo"
          todos={todoList}
          activeColumn={activeColumn}
          Wrapper={({ children }) => (
            <DroppableColumn id="todo">{children}</DroppableColumn>
          )}
        />
        <TodoColumn
          title="In Progress"
          status="inProgress"
          todos={inProgressList}
          activeColumn={activeColumn}
          Wrapper={({ children }) => (
            <DroppableColumn id="inProgress">{children}</DroppableColumn>
          )}
        />
        <TodoColumn
          title="Completed"
          status="completed"
          todos={completedList}
          activeColumn={activeColumn}
          Wrapper={({ children }) => (
            <DroppableColumn id="completed">{children}</DroppableColumn>
          )}
        />
      </div>

      <DragOverlay>
        {activeTodo ? (
          <div className="p-4 rounded shadow-lg bg-white border border-gray-200 w-full max-w-md">
            <h4 className="text-gray-800 font-medium">{activeTodo.title}</h4>
            <p className="text-gray-600 text-sm">{activeTodo.description}</p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};