export interface Todo {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'inProgress' | 'completed';
}

export interface TodoColumnProps {
    title: string;
    status: 'todo' | 'inProgress' | 'completed';
    todos: Todo[];
    droppableId: string;
}