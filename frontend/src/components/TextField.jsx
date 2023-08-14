import {
    FormControl,
    FormErrorMessage,
    FormLabel
} from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
import { Field, useField } from 'formik'

const TextField = ({ label, ...props }) => {
    const [field,meta] = useField(props)
    return (
        <FormControl isInvalid={meta.error && meta.touched}>
            <FormLabel>{label}</FormLabel>
            <Field as={Input} {...field} {...props} variant='filled' rounded='none' />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}

export default TextField
