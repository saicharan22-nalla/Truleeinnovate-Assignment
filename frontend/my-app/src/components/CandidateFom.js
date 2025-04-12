import React, { useState } from 'react';
import '../styles/CandidateForm.css';

const GENDER_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const EXPERIENCE_OPTIONS = [
  { value: '', label: 'Select' },
  { value: '1 Year', label: '1 Year' },
  { value: '2 Years', label: '2 Years' },
  { value: '3 Years', label: '3 Years' },
  { value: '4+ Years', label: '4+ Years' },
];

const SKILL_OPTIONS = [
  'JavaScript',
  'Python',
  'React',
  'Node.js',
  'CSS',
  'HTML'
];

function CandidateForm({ onAddCandidate }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    experience: '',
    skills: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate a more unique ID
  const generateId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData(prev => ({ ...prev, skills: selectedOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const newCandidate = {
        id: generateId(),
        ...formData
      };

      if (typeof onAddCandidate === 'function') {
        await onAddCandidate(newCandidate);
      }

      // Reset form only after successful submission
      setFormData({
        name: '',
        phone: '',
        email: '',
        gender: '',
        experience: '',
        skills: []
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="candidate-form-container">
      <form className="candidate-form" onSubmit={handleSubmit}>
        <h2>Add New Candidate</h2>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={50}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}"
            title="Enter a valid phone number"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            {GENDER_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience:</label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          >
            {EXPERIENCE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.experience && <span className="error">{errors.experience}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="skills">
            Skills:
          </label>
          <select
            id="skills"
            multiple
            value={formData.skills}
            onChange={handleSkillChange}
            size="6"
            className="skills-select"
          >
            {SKILL_OPTIONS.map(skill => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={isSubmitting ? 'submitting' : ''}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Adding...
            </>
          ) : (
            'Add Candidate'
          )}
        </button>
      </form>
    </div>
  );
}

export default CandidateForm;