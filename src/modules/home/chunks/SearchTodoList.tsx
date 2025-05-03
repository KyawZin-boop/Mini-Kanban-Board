import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { TodoCard } from "./TodoCard";

export const SearchTodoList = () => {

    const { searchTodo } = useStore();
    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    useEffect(() => {
        if(searchTodo.length === 0) setIsEmpty(true);
        else setIsEmpty(false);
    }, [searchTodo])


    return (
        <div className="p-4 border rounded-lg shadow-lg min-h-[400px] transition-all duration-200 bg-[#c2e6f3]">
            <h2 className="text-lg font-semibold mb-4 text-center ">Search Result - {searchTodo.length}</h2>
                <div className="space-y-4">
                {searchTodo.map((todo) => (
                    <TodoCard key={todo.id} todo={todo} />
                ))}
                {isEmpty && (
                    <div className="text-red-500 text-sm text-center py-8">
                    Oops! Task not found.
                    </div>
                )}
                </div>
        </div>
    )

}