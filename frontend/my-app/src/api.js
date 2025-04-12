/*import axios from 'axios';
const API_URL = 'http://localhost:5000/api/candidates';

export const fetchCandidates = (filters) =>
  axios.get(API_URL, { params: filters });

export const addCandidate = (candidate) =>
  axios.post(API_URL, candidate);
*/

const BASE_URL = 'http://localhost:5000';

export const fetchCandidates = async () => {
  const res = await fetch(`${BASE_URL}/candidates`);
  return res.json();
};

export const addCandidate = async (candidate) => {
  const res = await fetch(`${BASE_URL}/candidates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(candidate),
  });
  return res.json();
};
