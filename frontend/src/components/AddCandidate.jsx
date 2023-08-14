import React, {useEffect, useState} from 'react'
import {Box, Button, Card, CardBody, CardHeader, Heading, Input, Stack} from "@chakra-ui/react";
import TextField from "./TextField";

const AddCandidate = () => {

    const [candidates, setCandidates] = useState([]);
    const [ candidateEmail, setCandidateEmail ] = useState('')
    const [ candidateName, setCandidateName ] = useState('')

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

    const handleAddCandidate = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));

            const response = await fetch("http://localhost:8000/api/candidates/set", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: candidateEmail, user: userInfo, name: candidateName }),
            });

            if (response.ok) {
                console.log("Candidate added successfully");
                setCandidateEmail('');
                setCandidateName('')
                fetchCandidates()
            } else {
                const errorData = await response.json();
                console.error("Add candidate failed:", errorData);
            }
        } catch (error) {
            console.error("Error adding candidate:", error);
        }
    };

    return (
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', marginTop: '100px' }}>
            <Card w="400px" h="auto">
                <CardHeader textAlign="center">
                    <Heading size="md">Add Candidate</Heading>
                </CardHeader>
                <CardBody>
                    <Stack spacing={2}>
                        <Input name={'candidateName'}
                               placeholder={"Candidate's Name"}
                               value={candidateName}
                               onChange={(e) => setCandidateName(e.target.value)}/>
                        <Input name={'candidateEmail'}
                               placeholder={"Candidate's Email"}
                               value={candidateEmail}
                               onChange={(e) => setCandidateEmail(e.target.value)}/>
                        <Button mt={4} colorScheme="blue" onClick={handleAddCandidate}>
                            Add Candidate
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    )
}
export default AddCandidate
