import React, { useState, useEffect } from 'react';

export default function PatientsOverview({ patients, selectedPatientId, onViewDetails, onUpdateReport }) {
    const [currentPatient, setCurrentPatient] = useState(null);
    const [laudo, setLaudo] = useState('');
    const [receita, setReceita] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);

    
    const dicebearNames = [
        "Valentina", "Aiden", "Alexander", "Jameson", "Leah", "Jessica", 
        "Avery", "Caleb", "Jocelyn", "Wyatt", "Maria", "Christopher", 
        "Sarah", "Jude", "Chase", "Nolan"
    ];

    useEffect(() => {
       
        const patientArray = Object.values(patients);
        const filtered = patientArray.filter(patient =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toString().includes(searchTerm)
        );
        setFilteredPatients(filtered);
    }, [searchTerm, patients]);

    useEffect(() => {
        if (selectedPatientId && patients[selectedPatientId]) {
            const patient = patients[selectedPatientId];
            setCurrentPatient(patient);
            setLaudo(patient.report.laudo || '');
            setReceita(patient.report.receita || '');
            setMensagem(patient.report.mensagem || '');
        } else {
            setCurrentPatient(null);
            setLaudo('');
            setReceita('');
            setMensagem('');
        }
    }, [selectedPatientId, patients]);

    const handleReportSubmit = (e) => {
        e.preventDefault();
        if (currentPatient) {
            onUpdateReport(currentPatient.id, { laudo, receita, mensagem });
            alert('Report updated successfully!');
        }
    };

    return (
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
           
            <div className="flex justify-between items-center mb-6">
                <div className="inline-block">
                    <h1 className="text-2xl font-semibold text-gray-800">Informação dos Pacientes</h1>
                    <p>Busque, encontre e adicione informações e relatórios dos seus pacientes </p>
                </div>
                
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar paciente, nome, número..."
                        className="p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-careline-blue"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        width="20" height="20" fill="currentColor" viewBox="0 0 20 20"
                    >
                        <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                    </svg>
                </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[calc(100vh-180px)]">
                    <h2 className="text-xl font-semibold mb-4">Todos os Pacientes ({Object.keys(patients).length})</h2>
                    <ul>
                        {filteredPatients.length > 0 ? (filteredPatients.map(patient => (
                            <li
                                key={patient.id}
                                className={`p-2 border-b cursor-pointer hover:bg-gray-100 ${selectedPatientId === patient.id ? 'bg-careline-blue text-white hover:bg-careline-blue' : ''}`}
                                onClick={() => onViewDetails(patient.id)}
                            >
                                ID: {patient.id}, Nome: {patient.name}
                            </li>
                        ))) : (
                            <p className="text-gray-500">Nenhum paciente encontrado. Adicione um paciente na visualização do Painel de Controle.</p>
                        )}
                    </ul>
                </div>

                
                <div className="md:col-span-2 space-y-6">
                    {currentPatient ? (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">{currentPatient.name} (ID: {currentPatient.id})</h2>
                            <div className="flex flex-wrap items-center space-x-8 mb-4">
                                <img src={`https://api.dicebear.com/9.x/notionists/svg?seed=${dicebearNames[currentPatient.id % dicebearNames.length]}`}
                                    alt="Avatar do Paciente" 
                                    className="rounded-full h-20 w-20" 
                                />
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm">Email:</p>
                                    <p className="font-medium">{currentPatient.email}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm">Número de Telefone:</p>
                                    <p className="font-medium">{currentPatient.phone}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm">Endereço:</p>
                                    <p className="font-medium">{currentPatient.address}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center space-x-8 mb-4">
                                <div>
                                    <p className="text-gray-600 text-sm">Convênio:</p>
                                    <p className="font-medium">{currentPatient.insurance}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Sintomas:</p>
                                    <p className="font-medium">{currentPatient.symptoms}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Temperatura:</p>
                                    <p className="font-medium">{currentPatient.temperature}°C</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-600">Por favor, selecione um paciente da lista ou crie um novo na visualização do Painel de Controle.</p>
                        </div>
                    )}

                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        <InfoCard
                            icon="+"
                            title="Sintomas"
                            description={currentPatient ? currentPatient.symptoms : "Sintomas do paciente, queixas e sinais vitais"}
                            showArrow={true}
                        />
                        
                        <InfoCard
                            icon="🏥"
                            title="Convênio"
                            description={currentPatient ? currentPatient.insurance : "Informações do convênio, contato e formulários"}
                            showArrow={true}
                        />
                        
                        <InfoCard
                            icon="📄"
                            title="Extras"
                            description="Histórico de visitas, alergias, observações médicas e informações adicionais"
                            showArrow={true}
                        />
                    </div>

                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Preencher Laudo</h2>
                        <form onSubmit={handleReportSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Descrição Clínica:</label>
                                <textarea
                                    value={laudo}
                                    onChange={(e) => setLaudo(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Digite aqui a descrição clínica..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Diagnóstico:</label>
                                <textarea
                                    value={receita}
                                    onChange={(e) => setReceita(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Digite aqui o diagnóstico..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Receita Médica:</label>
                                <textarea
                                    value={mensagem}
                                    onChange={(e) => setMensagem(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Digite aqui a receita médica..."
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="submit"
                                    className="bg-careline-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                                >
                                    Salvar Laudo
                                </button>
                                <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md">Imprimir Laudo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


function InfoCard({ icon, title, description, showArrow }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between items-start">
            <div className="flex items-center w-full mb-2">
                <div className="text-2xl mr-2">{icon}</div>
                <h3 className="text-lg font-semibold">{title}</h3>
                {showArrow && (
                    <svg className="ml-auto text-gray-400" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                )}
            </div>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
} 