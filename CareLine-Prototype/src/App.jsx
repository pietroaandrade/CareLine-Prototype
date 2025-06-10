import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import QueueManagement from './components/Dashboard/QueueManagement';
import PatientsOverview from './components/Dashboard/PatientsOverview';
import Chat from './components/Chat/Chat'; // Placeholder for Chat component

function App() {
  // Centralized patient state and functions (moved from previous App.jsx but not explicitly used in this structure yet)
  const [patients, setPatients] = useState({});
  const [nextId, setNextId] = useState(1);
  const [commonWaitList, setCommonWaitList] = useState([]);
  const [urgentWaitList, setUrgentWaitList] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [calledPatient, setCalledPatient] = useState(null);

  const insurances = ["porto seguro", "bradesco", "amil", "sulamérica", "unimed"];

  const createPatient = (patientData) => {
      const id = nextId;
      const newPatient = {
          id,
          name: patientData.name,
          insurance: patientData.insurance,
          symptoms: patientData.symptoms,
          temperature: patientData.temperature,
          report: { laudo: "", receita: "", mensagem: "" }
      };

      setPatients(prevPatients => ({
          ...prevPatients,
          [id]: newPatient
      }));
      setNextId(prevId => prevId + 1);

      if (patientData.urgency === 'urgente') {
          setUrgentWaitList(prevList => [...prevList, { name: patientData.name, id }]);
      } else {
          setCommonWaitList(prevList => [...prevList, { name: patientData.name, id }]);
      }

      console.log('Patient added:', newPatient);
  };

  const viewPatientDetails = (id) => {
      setSelectedPatientId(id);
  };

  const updatePatientReport = (patientId, reportData) => {
      setPatients(prevPatients => ({
          ...prevPatients,
          [patientId]: {
              ...prevPatients[patientId],
              report: reportData
          }
      }));
      console.log('Patient report updated for ID:', patientId, reportData);
  };

  const callNextPatient = () => {
      if (urgentWaitList.length > 0) {
          const [nextPatient] = urgentWaitList;
          setUrgentWaitList(prevList => prevList.slice(1));
          setCalledPatient(nextPatient);
          setSelectedPatientId(nextPatient.id);
          console.log('Calling urgent patient:', nextPatient);
      } else if (commonWaitList.length > 0) {
          const [nextPatient] = commonWaitList;
          setCommonWaitList(prevList => prevList.slice(1));
          setCalledPatient(nextPatient);
          setSelectedPatientId(nextPatient.id);
          console.log('Calling common patient:', nextPatient);
      } else {
          alert('No patients in the waiting list.');
          setCalledPatient(null);
          setSelectedPatientId(null);
      }
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Navbar /> {/* Navbar remains as a fixed sidebar */}
        <main className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<h1>Welcome to CareLine! Please select a view from the Navbar.</h1>} />
            <Route
              path="/dashboard"
              element={
                <QueueManagement
                  patients={patients}
                  nextId={nextId}
                  commonWaitList={commonWaitList}
                  urgentWaitList={urgentWaitList}
                  selectedPatientId={selectedPatientId}
                  calledPatient={calledPatient}
                  insurances={insurances}
                  onCreatePatient={createPatient}
                  onViewDetails={viewPatientDetails}
                  onUpdateReport={updatePatientReport}
                  onCallNextPatient={callNextPatient}
                />
              }
            />
            <Route
              path="/patients"
              element={
                <PatientsOverview
                  patients={patients}
                  selectedPatientId={selectedPatientId}
                  onViewDetails={viewPatientDetails}
                  onUpdateReport={updatePatientReport}
                />
              }
            />
            <Route path="/chat" element={<Chat />} />
            {/* Add more routes for reports, system, etc. */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
