import React, { useEffect, useState } from 'react';
import CandidateForm from './components/CandidateFom';
import CandidateTable from './components/CandidateTable';
import FilterPanel from './components/FilterPanel';
import { fetchCandidates, addCandidate } from './api';
import './App.css'

function App() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates().then(setCandidates);
  }, []);

  const handleAddCandidate = (newCandidate) => {
    setCandidates(prev => [...prev, newCandidate]);
  };

  

  return (
    <div className="app-container">
      <h1>Candidates</h1>
      <CandidateForm onAddCandidate={handleAddCandidate} />
      <FilterPanel setCandidates={setCandidates} />
      <CandidateTable candidates={candidates} />
    </div>
  );
}

export default App;