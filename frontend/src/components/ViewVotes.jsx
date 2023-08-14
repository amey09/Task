import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Flex, Heading, Stack, Text } from "@chakra-ui/react";

const ViewVotes = ({ candidatesChanged }) => { // Accept candidatesChanged prop

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        fetchCandidates();
    }, [candidatesChanged]); // Use candidatesChanged as a dependency

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

    return (
        <Card w="400px" h="auto">
            <CardHeader textAlign="center">
                <Heading size="md">Voting Stats</Heading>
            </CardHeader>
            <CardBody>
                <Stack spacing={2}>
                    <Text fontWeight={'bold'}>Existing Candidates:</Text>
                    {candidates.map(candidate => (
                        <Flex key={candidate.email} align="center" justify="space-between" p={2}>
                            <Text fontSize="sm">
                                {candidate.name}
                            </Text>
                            <Text fontSize="sm">{candidate.votes}</Text>
                        </Flex>
                    ))}
                </Stack>
            </CardBody>
        </Card>
    );
}

export default ViewVotes;
