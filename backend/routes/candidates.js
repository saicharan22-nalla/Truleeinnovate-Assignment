const express = require('express');
const router = express.Router();
const candidateModel = require('../models/candidateModel');

router.get('/', (req, res) => {
  candidateModel.getAllCandidates(req.query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  candidateModel.addCandidate(req.body, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});



module.exports = router;
