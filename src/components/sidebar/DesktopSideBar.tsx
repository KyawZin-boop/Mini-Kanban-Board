import {NavLink, useLocation} from "react-router-dom";
import { sidebarData } from "./sidebarData";

const DesktopSidebar = () => {

    const location = useLocation()
    const checkLocation = (paths: string[]):string => {
        if (paths.includes(location.pathname)) return 'bg-[#005E9A] text-white font-medium shadow'
        return ''
    }

    return <aside className={'lg:flex flex-col hidden min-h-svh min-w-[200px] lg:min-w-[280px] bg-[#00ADEE] h-full border-r-2 rounded-r-xl border-blue-200 shadow-sm'}>
        <div className="flex flex-col items-center justify-center h-20">
            <p
                className="text-3xl text-[#005E9A] leading-[0.75] font-bold tracking-normal cursor-pointer"
            >Kanban Board
            </p>
        </div>
        <ul style={{padding: "0 10px"}}>
            {
                sidebarData.map((item) =>
                    <NavLink to={item.routeNames[0]} key={item.name}>
                        <li
                            className={"hover:bg-[#005E9A] flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-black hover:text-white "
                                + checkLocation(item.routeNames)
                            }
                        >
                            <div className={'flex items-center gap-3 '}>
                                {item.icon && <item.icon className="w-4 h-4"/>}
                                <p className={"text-[13px]"}>{item.name}</p>
                            </div>
                        </li>
                    </NavLink>
                )
            }
        </ul>
    </aside>
}
export default DesktopSidebar