import React from "react"; 
import { FiChevronRight } from "react-icons/fi"; 
import { IoChatbubblesOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { FaUserInjured } from "react-icons/fa";

export default function RouteSelect() {

    return (
        <div className="space-y-1">
            
            <RouteItem 
                to="/patients"
                Icon={FaUserInjured} 
                title="Patients"  
            />

            <RouteItem 
                to="/dashboard"
                Icon={LuLayoutDashboard} 
                title="Dashboard"  
            />

            <RouteItem 
                to="/chat"
                Icon={IoChatbubblesOutline} 
                title="Chat"  
            />
            
        </div>
    );
}

const RouteItem = ({ Icon, title, to }) => {
    return (
        <Link
            to={to}
            className="flex items-center justify-between gap-2 w-full rounded px-2 py-1.5 text-m transition-[box-shadow,_background-color,_color] text-stone-950 
            shadow hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
        >
            
            <div className="flex items-center justify-start gap-2">
                {Icon && <Icon className="text-stone-400"/>}
                <span>{title}</span>
            </div>
            <FiChevronRight/>   
        </Link>

    );
};