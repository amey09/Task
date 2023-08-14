import Candidate from "../models/candidateModel.js";
import asyncHandler from "express-async-handler";
// @desc    Get Candidates
// @route   GET /api/candidates
// @access  Private
const getCandidates = asyncHandler(async (req, res) => {
        const candidates = await Candidate.find();

        if (candidates.length === 0) {
            res.status(404)
            throw new Error('No candidates available')
        }
        res.status(201).json(candidates)
});

// @desc    Set Candidates
// @route   Post /api/candidates/set
// @access  Private
const setCandidate = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    try {
        const existingCandidate = await Candidate.findOne({ email });

        if (existingCandidate) {
            return res.status(400).json({ error: 'Candidate already exists' });
        }

        const newCandidate = new Candidate({
            name,
            email,
            votes: 0,
            voters: [], // Initialize the voters array as empty for the new candidate
        });

        await newCandidate.save();

        return res.status(201).json({ message: 'Candidate generated successfully', candidate: newCandidate });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// @desc    Vote Candidate
// @route   Post /api/candidates/vote
// @access  Private
const voteCandidate = asyncHandler(async (req, res) => {
    const candidateEmail = req.body.email;
    const { _id: user_id } = req.body // Adjust the field name as per your setup

    try {
        const candidate = await Candidate.findOne({ email: candidateEmail });
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        if (candidate.voters.includes(user_id)) {
            return res.status(400).json({ error: 'You have already voted for this candidate' });
        }

        candidate.votes += 1;
        candidate.voters.push(user_id);

        await candidate.save();

        return res.json({ message: 'Vote counted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// @desc    Delete Candidate
// @route   Post /api/candidates/delete
// @access  Private
const deleteCandidate = asyncHandler(async (req, res) => {
    const candidateEmail = req.body.email;
    const candidate = await Candidate.findOne({ email: candidateEmail });
    if (!candidate) {
        res.status(404)
        throw new Error('Candidate not found')
    }
    await candidate.deleteOne();
    res.status(200).json({ message: 'Candidate deleted successfully' });
});


export { getCandidates, setCandidate, voteCandidate, deleteCandidate }