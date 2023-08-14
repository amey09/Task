import React from 'react'
import {
    Button, Checkbox,
    Heading, HStack,
    VStack
} from "@chakra-ui/react";
import * as Yup from 'yup'
import {Formik} from "formik";
import TextField from "../components/TextField";
import {useNavigate, Link } from "react-router-dom";

export const LoginScreen = () => {

    const navigate = useNavigate()
    const handleSubmit = async (values) => {
        try {
            const response = await fetch("http://localhost:8000/api/users/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                localStorage.setItem('userInfo', JSON.stringify(data));

                navigate('/'); // Redirect to main page
            } else {
                const errorData = await response.json();
                console.error("Login failed:", errorData);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <Formik
            initialValues={{ email: '', password: ''}}
            validationSchema={Yup.object({
                email: Yup.string().email("Invalid email")
                    .required('Email Required'),
                password: Yup.string()
                    .required('Password Required')
            })}
            onSubmit={async (values, actions) => {
                await handleSubmit(values)
                actions.resetForm()
            }}
        >
            {formik => (
                <VStack
                    as='form'
                    w={{ base: '90%', md: 500 }}
                    p={[8,10]}
                    mt={[20,'10vh']}
                    mx='auto'
                    border={['none', '1px']}
                    borderColor={['', 'gray.300']}
                    borderRadius={[10]}
                    justifyContent='center'
                    onSubmit={formik.handleSubmit}
                >
                    <Heading>Login</Heading>
                    <TextField name='email' label='Email' type='email'/>
                    <TextField name='password' label='Password' type='password'/>
                    <HStack w='full' justify='space-between'>
                        <Checkbox>Remember Me</Checkbox>
                    </HStack>
                    <HStack w='full' justify='flex-end'>
                        <Link to={'/register'}>
                        <Button variant='link' colorScheme='blue'>New user? SignUp</Button>
                        </Link>
                    </HStack>
                    <Button type='submit' rounded='none' w='full' colorScheme='blue'>Submit</Button>
                </VStack>
            )}
        </Formik>
    )
}

export default LoginScreen
