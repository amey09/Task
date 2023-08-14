import React, { useEffect, useState } from 'react';
import { Box, Center, HStack, IconButton } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import ViewVotes from "../components/ViewVotes";
import Vote from "../components/Vote";
import DeleteCandidate from "../components/DeleteCandidate";
import AddCandidate from "../components/AddCandidate";

export const MainAppScreen = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [showAddCandidate, setShowAddCandidate] = useState(false);
    const [showDeleteCandidate, setShowDeleteCandidate] = useState(false);
    const [candidatesChanged, setCandidatesChanged] = useState(false); // Add this state

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setIsAdmin(userInfo && userInfo.isAdmin);
        setIsUserLoggedIn(userInfo !== null);
    }, []);

    const handleAddCandidateClick = () => {
        setShowAddCandidate(true);
        setShowDeleteCandidate(false);
        setCandidatesChanged(!candidatesChanged); // Toggle candidatesChanged
    };

    const handleDeleteCandidateClick = () => {
        setShowDeleteCandidate(true);
        setShowAddCandidate(false);
        setCandidatesChanged(!candidatesChanged); // Toggle candidatesChanged
    };

    return (
        <Center>
            <Box marginTop={20}>
                <HStack spacing={4} align="center">
                    {isAdmin && <ViewVotes candidatesChanged={candidatesChanged} />} {/* Pass candidatesChanged */}
                    {isAdmin && (
                        <HStack spacing={4} align="center">
                            <IconButton
                                aria-label="Add Candidate"
                                icon={<AddIcon />}
                                onClick={handleAddCandidateClick}
                            />
                            <IconButton
                                aria-label="Delete Candidate"
                                icon={<DeleteIcon />}
                                onClick={handleDeleteCandidateClick}
                            />
                        </HStack>
                    )}
                    {isAdmin && (showAddCandidate || showDeleteCandidate) && (
                        <Box>
                            {showAddCandidate ? <AddCandidate /> : <DeleteCandidate />}
                        </Box>
                    )}
                    {isUserLoggedIn && !isAdmin && <Vote />}
                </HStack>
            </Box>
        </Center>
    );
};

export default MainAppScreen;
