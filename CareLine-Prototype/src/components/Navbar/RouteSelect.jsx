import React, { useState } from "react"; 
import { FiChevronRight } from "react-icons/fi"; 
import { LuLayoutDashboard } from "react-icons/lu";
import { Link, useLocation } from 'react-router-dom';
import { FaUserInjured } from "react-icons/fa";

export default function RouteSelect() {
    const location = useLocation();

    return (
        <div className="space-y-1">
            <RouteItem 
                to="/patients"
                Icon={FaUserInjured} 
                title="Pacientes"
                isSelected={location.pathname === '/patients'}
            />

            <RouteItem 
                to="/"
                Icon={LuLayoutDashboard} 
                title="Painel de Controle"
                isSelected={location.pathname === '/'}
            />
        </div>
    );
}

const RouteItem = ({ Icon, title, to, isSelected }) => {
    return (
        <Link
            to={to}
            className={`flex items-center justify-between gap-2 w-full rounded px-2 py-1.5 text-m transition-all duration-200 ease-in-out
            ${isSelected ? 'bg-stone-100 shadow text-stone-950' : 'text-stone-500 hover:bg-stone-300 bg-transparent shadow-none'}`}
        >
            <div className="flex items-center justify-start gap-2">
                {Icon && <Icon className={`transition-colors duration-200 ease-in-out ${isSelected ? 'text-careline-blue' : 'text-stone-400'}`}/>}
                <span className="transition-colors ease-in-out">{title}</span>
            </div>
            <FiChevronRight className="transition-transform duration-200 ease-in-out"/>   
        </Link>
    );
};