import React from 'react';

export default function PatientList({ commonWaitList, urgentWaitList, patients, onViewDetails }) {
    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-2">Lista Urgente ({urgentWaitList.length})</h3>
            <ul>
                {urgentWaitList.map(({ name, id }) => (
                    <li key={id} className="cursor-pointer hover:bg-gray-100 p-2 border-b" onClick={() => onViewDetails(id)}>
                        ID: {id}, Nome: {name}
                    </li>
                ))}
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2">Lista Comum ({commonWaitList.length})</h3>
            <ul>
                {commonWaitList.map(({ name, id }) => (
                    <li key={id} className="cursor-pointer hover:bg-gray-100 p-2 border-b" onClick={() => onViewDetails(id)}>
                        ID: {id}, Nome: {name}
                    </li>
                ))}
            </ul>
        </div>
    );
} 