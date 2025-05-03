import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";

export const Navbar = () => {

    const { handleSearch } = useStore();

    const [dateFormat, setDateFormat] = useState<string | null>(null);
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        const timerId = setInterval(() => {
            const date = new Date();
            setDateFormat(date.toLocaleString());
        }, 1000);
    
        return () => clearInterval(timerId);
    }, []);

    return (
        <nav className="bg-[#00ADEE] flex items-center justify-between px-4 py-2">
            <div className="text-3xl text-[#005E9A] leading-[0.75] font-bold tracking-normal cursor-pointer">Kanban Board</div>
            <div className="w-full max-w-sm min-w-[200px]">
                <div className="relative">
                    <input type="email" onChange={(e) => handleSearch(e.target.value)} className="w-full bg-transparent placeholder:text-gray-600 text-black text-sm border border-[#005E9A] rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow" placeholder="Type Todo to search..." />
                    <button
                    className="absolute right-1 top-1 rounded bg-[#175E9A] py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => handleSearch(query)}
                    >
                    <LuSearch className="text-xl"/>
                    </button>
                </div>
            </div>
            <div className="min-w-[200px] hidden md:block">
                <span className="text-white">{dateFormat}</span>
            </div>
        </nav>
    );
};