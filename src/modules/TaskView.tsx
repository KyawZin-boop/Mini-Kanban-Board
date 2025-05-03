import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
  } from '@dnd-kit/core';
  import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';
  import { CSS } from '@dnd-kit/utilities';
  import { useEffect, useState } from 'react';
import { Todo } from './home/chunks/types';
  
  function SortableItem({ todo }: { todo: Todo }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id: todo.id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    return (
      <li
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="border rounded-md px-3 py-2 bg-white"
      >
        <p>{todo.title}</p>
        <p>{todo.description}</p>
      </li>
    );
  }
  
  export function TaskView() {
    const [todos, setTodos] = useState<Todo[]>([]);
  
    useEffect(() => {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    }, []);
  
    const sensors = useSensors(useSensor(PointerSensor));
  
    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
  
      if (over && active.id !== over.id) {
        const oldIndex = todos.findIndex(todo => todo.id === active.id);
        const newIndex = todos.findIndex(todo => todo.id === over.id);
  
        const newTodos = arrayMove(todos, oldIndex, newIndex);
        setTodos(newTodos);
      }
    };
  
    return (
      <div className="flex justify-center w-full h-full">
        <header>
          <h1 className="mb-5">Task View</h1>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={todos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
              <ul className="bg-gray-400 mt-5 flex flex-col gap-2 w-[300px] p-2 rounded">
                {todos.map(todo => (
                  <SortableItem key={todo.id} todo={todo} />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </header>
      </div>
    );
  }
  