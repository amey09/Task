import React, { useEffect, useState } from 'react';
import {Box, Card, CardBody, CardHeader, Heading, Radio, Stack, Input, Button, Flex, Badge, Text} from "@chakra-ui/react";

export const DeleteCandidate = () => {

    const [candidates, setCandidates] = useState([]);
    const [selectedCandidateEmail, setSelectedCandidateEmail] = useState(null);

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

    const handleDeleteCandidate = async () => {
        if (selectedCandidateEmail) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));

            try {
                const response = await fetch("http://localhost:8000/api/candidates/delete", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: selectedCandidateEmail, user: userInfo }),
                });

                if (response.ok) {
                    console.log("Candidate deleted successfully");
                } else {
                    const errorData = await response.json();
                    console.error("Delete candidate failed:", errorData);
                }
            } catch (error) {
                console.error("Error deleting candidate:", error);
            }
        }
    };

    return (
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card w="400px" h="auto">
                <CardHeader textAlign="center">
                    <Heading size="md">Delete</Heading>
                </CardHeader>
                <CardBody>
                    <Stack spacing={2}>
                        <Text>Existing Candidates:</Text>
                        {candidates.map(candidate => (
                            <Flex key={candidate.email} align="center" justify="space-between" p={2} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                                <Box>
                                    <Text fontWeight="bold">
                                        {candidate.name}
                                    </Text>
                                    <Text fontSize="sm">{candidate.email}</Text>
                                </Box>
                            </Flex>
                        ))}
                        <Text marginTop={'40px'}>Candidate's email you wish to delete</Text>
                        <Input name={'candidateEmail'}
                               placeholder={"Candidate's Email"}
                               value={selectedCandidateEmail}
                               onChange={(e) => setSelectedCandidateEmail(e.target.value)}/>
                        <Button mt={4} colorScheme="blue" onClick={handleDeleteCandidate}>
                            Delete
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
}

export default DeleteCandidate;
