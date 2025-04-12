import React, { useState } from 'react';
import CandidateForm from './CandidateFom';
import CandidateTable from './CandidateTable';
import Filter from './Filter';


const FilterPanel = () => {
  const [candidates, setCandidates] = useState([ 
  ]);

  const [filteredCandidates, setFilteredCandidates] = useState(candidates);

  const handleAddCandidate = (newCandidate) => {
    setCandidates((prev) => [...prev, newCandidate]);
    setFilteredCandidates((prev) => [...prev, newCandidate]);
  };

  const handleApplyFilters = (filters) => {
    const { gender, experience, skills } = filters;

    const filtered = candidates.filter((candidate) => {
      const matchesGender = gender ? candidate.gender === gender : true;
      const matchesExperience = experience ? candidate.experience === experience : true;
      const matchesSkills = skills.length > 0 ? skills.every(skill => candidate.skills.includes(skill)) : true;

      return matchesGender && matchesExperience && matchesSkills;
    });

    setFilteredCandidates(filtered);
  };

  const handleResetFilters = () => {
    setFilteredCandidates(candidates);
  };

  return (
    <div className="app-container">
      <Filter onApplyFilters={handleApplyFilters} onResetFilters={handleResetFilters} />
      <CandidateForm onAddCandidate={handleAddCandidate} />
      <CandidateTable candidates={filteredCandidates} />
    </div>
  );
};

export default FilterPanel;
