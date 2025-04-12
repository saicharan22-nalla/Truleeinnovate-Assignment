const db = require('../db/database');

const getAllCandidates = (filters, callback) => {
  const { search, gender, experience, skills } = filters;
  let query = "SELECT * FROM candidates WHERE 1=1";
  let params = [];

  if (search) {
    query += " AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)";
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  if (gender) {
    query += " AND gender = ?";
    params.push(gender);
  }

  if (experience) {
    query += " AND experience = ?";
    params.push(experience);
  }

  if (skills && skills.length > 0) {
    skills.forEach(skill => {
      query += " AND skills LIKE ?";
      params.push(`%${skill}%`);
    });
  }

  db.all(query, params, callback);
};

const addCandidate = (data, callback) => {
  const { name, email, phone, gender, experience, qualification, skills } = data;
  const skillString = skills.join(', ');
  db.run(
    `INSERT INTO candidates (name, email, phone, gender, experience, qualification, skills)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone, gender, experience, qualification, skillString],
    callback
  );
};

module.exports = { getAllCandidates, addCandidate };
