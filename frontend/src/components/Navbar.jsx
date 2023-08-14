import React from 'react';
import {
    Box,
    Flex,
    Spacer,
    Button,
    Link,
    useColorMode,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate()

    const { colorMode, toggleColorMode } = useColorMode();
    const handleLogout = async () => {
        localStorage.removeItem("userInfo");
        navigate('/login')
    }

    return (
        <Box boxShadow="md">
            <Flex
                alignItems="center"
                justifyContent="space-between"
                py={4}
                px={6}
                bg={colorMode === 'light' ? 'gray.200' : 'gray.700'}
            >
                <Link to="/" fontSize="xl" fontWeight="bold">
                    Vote
                </Link>
                <Spacer />
                <Button onClick={toggleColorMode}>
                    Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                </Button>
                <Button marginLeft="10px" onClick={handleLogout}>Logout</Button>
            </Flex>
        </Box>
    );
};

export default Navbar;
