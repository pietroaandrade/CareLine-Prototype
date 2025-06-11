import React from 'react';
import PatientForm from './PatientForm';
import PatientList from './PatientList';
import PatientDetails from './PatientDetails';

export default function QueueManagement({
    patients,
    nextId,
    commonWaitList,
    urgentWaitList,
    selectedPatientId,
    calledPatient,
    insurances,
    onCreatePatient,
    onViewDetails,
    onUpdateReport,
    onCallNextPatient
}) {
    return (
        <div className="dashboard-container p-4">
            <h1 className="text-3xl font-bold mb-6">Painel de Controle Hospitalar</h1>

            
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Adicionar Novo Paciente</h2>
                <PatientForm onCreatePatient={onCreatePatient} insurances={insurances} />
            </div>

            
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Lista de Espera</h2>
                <button
                    onClick={onCallNextPatient}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                >
                    Chamar Próximo Paciente
                </button>
                {calledPatient && (
                    <p className="mb-2 text-lg">Chamando: <strong>{calledPatient.name} (ID: {calledPatient.id})</strong></p>
                )}
                <PatientList
                    commonWaitList={commonWaitList}
                    urgentWaitList={urgentWaitList}
                    patients={patients}
                    onViewDetails={onViewDetails}
                />
            </div>

         
            {selectedPatientId && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Detalhes do Paciente</h2>
                    <PatientDetails
                        patient={patients[selectedPatientId]}
                        onUpdateReport={onUpdateReport}
                    />
                </div>
            )}
        </div>
    );
} 