import React from 'react';

const CandidateTable = ({ candidates }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th><th>Email</th><th>Phone</th>
        <th>Qualification</th><th>Experience</th><th>Skills</th>
      </tr>
    </thead>
    <tbody>
    {Array.isArray(candidates) && candidates.length > 0 ? (
    candidates.map((c, index) => (
      <tr key={index}>
        <td>{c.name}</td>
        <td>{c.phone}</td>
        <td>{c.email}</td>
        <td>{c.gender}</td>
        <td>{c.experience}</td>
        <td>{Array.isArray(c.skills) ? c.skills.join(", ") : c.skills}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6">No candidates found.</td>
    </tr>
  )}
    </tbody>
  </table>
);

export default CandidateTable;
