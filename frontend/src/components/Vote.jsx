import React, {useEffect, useState} from 'react'
import {Box, Card, CardBody, CardFooter, CardHeader, Heading, Radio, Stack, Text} from "@chakra-ui/react";

export const Vote = () => {

    const [hasVoted, setHasVoted] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    useEffect(() => {
        // Fetch candidates from the backend API
        fetchCandidates();
    }, []);
    const fetchCandidates = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/candidates");
            if (response.ok) {
                const data = await response.json();
                setCandidates(data);
            } else {
                console.error("Error fetching candidates");
            }
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    const handleVote = async (candidateId) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const user_id = userInfo ? userInfo._id : null;

        try {
            const response = await fetch("http://localhost:8000/api/candidates/vote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: candidateId, user_id: user_id }),
            });

            if (response.ok) {
                setSelectedCandidate(candidateId);
                setHasVoted(true);
            } else {
                const errorData = await response.json();
                console.error("Voting failed:", errorData);
            }
        } catch (error) {
            console.error("Error voting:", error);
        }
    }

    return (
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', marginTop: '100px' }}>
            <Card w="400px" h="auto">
                <CardHeader textAlign="center">
                    {hasVoted? ('') : (<Heading size="md">Vote for Your Favorite Candidate</Heading>)}

                </CardHeader>
                <CardBody>
                    {hasVoted ? (
                        <Heading textAlign="center">You have already voted!</Heading>
                    ) : (
                        <Stack spacing={2}>
                            {candidates.map(candidate => (
                                <Radio
                                    key={candidate.email}
                                    size="lg"
                                    name="candidate"
                                    colorScheme="blue"
                                    isChecked={selectedCandidate === candidate.email}
                                    isDisabled={hasVoted && selectedCandidate !== candidate.email}
                                    onChange={() => handleVote(candidate.email)}
                                >
                                    {candidate.name}
                                </Radio>
                            ))}
                        </Stack>
                    )}
                </CardBody>
                <CardFooter textAlign="center">
                    {hasVoted ? 'Thank you for voting!' : 'You can only vote once, be mindful'}
                </CardFooter>
            </Card>
        </Box>
    )
}

export default Vote
