import React, { useState, useEffect } from 'react';

export default function PatientDetails({ patient, onUpdateReport }) {
    const [laudo, setLaudo] = useState('');
    const [receita, setReceita] = useState('');
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        if (patient && patient.report) {
            setLaudo(patient.report.laudo || '');
            setReceita(patient.report.receita || '');
            setMensagem(patient.report.mensagem || '');
        }
    }, [patient]);

    if (!patient) return null;

    const handleReportSubmit = (e) => {
        e.preventDefault();
        onUpdateReport(patient.id, { laudo, receita, mensagem });
        alert('Report updated!');
    };

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Patient ID: {patient.id} - {patient.name}</h3>
            <p><strong>Insurance:</strong> {patient.insurance}</p>
            <p><strong>Symptoms:</strong> {patient.symptoms}</p>
            <p><strong>Temperature:</strong> {patient.temperature}°C</p>

            <h4 className="text-lg font-semibold mt-6 mb-2">Report:</h4>
            <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Laudo:</label>
                    <textarea
                        value={laudo}
                        onChange={(e) => setLaudo(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Receita:</label>
                    <textarea
                        value={receita}
                        onChange={(e) => setReceita(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Mensagem do Funcionário:</label>
                    <textarea
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-careline-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Update Report
                </button>
            </form>
        </div>
    );
} 