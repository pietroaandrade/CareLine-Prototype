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
            <h1 className="text-3xl font-bold mb-6">Hospital Dashboard</h1>

            {/* Section for creating new patients */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Add New Patient</h2>
                <PatientForm onCreatePatient={onCreatePatient} insurances={insurances} />
            </div>

            {/* Section for waiting lists */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Waiting List</h2>
                <button
                    onClick={onCallNextPatient}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                >
                    Call Next Patient
                </button>
                {calledPatient && (
                    <p className="mb-2 text-lg">Calling: <strong>{calledPatient.name} (ID: {calledPatient.id})</strong></p>
                )}
                <PatientList
                    commonWaitList={commonWaitList}
                    urgentWaitList={urgentWaitList}
                    patients={patients}
                    onViewDetails={onViewDetails}
                />
            </div>

            {/* Section for selected patient details */}
            {selectedPatientId && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Patient Details</h2>
                    <PatientDetails
                        patient={patients[selectedPatientId]}
                        onUpdateReport={onUpdateReport}
                    />
                </div>
            )}
        </div>
    );
} 