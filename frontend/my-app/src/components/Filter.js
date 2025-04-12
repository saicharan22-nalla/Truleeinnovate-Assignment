import React, { useState } from 'react';
import '../styles/FilterPanel.css';

const Filter = ({ onApplyFilters, onResetFilters }) => {
  const [gender, setGender] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState([]);

  const handleExperienceChange = (e) => setExperience(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleSkillsChange = (e) => {
    const selectedSkills = Array.from(e.target.selectedOptions, option => option.value);
    setSkills(selectedSkills);
  };

  const handleApplyFilters = () => {
    onApplyFilters({ gender, experience, skills });
  };

  const handleResetFilters = () => {
    setGender('');
    setExperience('');
    setSkills([]);
    onResetFilters();
  };

  return (
    <div className="filter-container">
      <div className="filter-item">
        <label htmlFor="gender">Gender</label>
        <select id="gender" value={gender} onChange={handleGenderChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="experience">Experience</label>
        <select id="experience" value={experience} onChange={handleExperienceChange}>
          <option value="">Select Experience</option>
          <option value="1">1 Year</option>
          <option value="2">2 Years</option>
          <option value="3">3 Years</option>
          <option value="4">4+ Years</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="skills">Skills</label>
        <select id="skills" multiple value={skills} onChange={handleSkillsChange}>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="CSS">CSS</option>
        </select>
      </div>

      <div className="filter-buttons">
        <button onClick={handleApplyFilters} className="apply-filter-btn">
          <i className="fa fa-filter"></i> Apply Filter
        </button>
        <button onClick={handleResetFilters} className="reset-filter-btn">
          <i className="fa fa-refresh"></i> Reset Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
