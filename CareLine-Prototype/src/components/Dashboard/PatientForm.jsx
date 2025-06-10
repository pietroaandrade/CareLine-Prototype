import React, { useState } from 'react';

export default function PatientForm({ onCreatePatient, insurances }) {
    const [name, setName] = useState('');
    const [insurance, setInsurance] = useState(insurances[0]);
    const [symptoms, setSymptoms] = useState('');
    const [temperature, setTemperature] = useState('');
    const [urgency, setUrgency] = useState('comum');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreatePatient({
            name,
            insurance,
            symptoms: symptoms,
            temperature: parseInt(temperature),
            urgency
        });
        // Clear form
        setName('');
        setSymptoms('');
        setTemperature('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Insurance:</label>
                <select
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    {insurances.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Symptoms:</label>
                <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Temperature (°C):</label>
                <input
                    type="number"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Urgency:</label>
                <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="comum">Common</option>
                    <option value="urgente">Urgent</option>
                </select>
            </div>
            <button
                type="submit"
                className="bg-careline-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Add Patient
            </button>
        </form>
    );
} 