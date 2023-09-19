import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const initialValues = {
  firstName: "",
  email: "",
  type: "hireMe",
  comment: ""
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  comment: Yup.string().min(25, "Must be at least 25 characters").required("Required")
});

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      submit("", values);
    },
    validationSchema
  });

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === "success") formik.resetForm();
    }
  }, [response]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              {[
                { name: 'firstName', label: 'Name', type: 'text' },
                { name: 'email', label: 'Email Address', type: 'email' },
              ].map((field) => (
                <FormControl key={field.name} isInvalid={formik.touched[field.name] && formik.errors[field.name]}>
                  <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    {...formik.getFieldProps(field.name)}
                  />
                  <FormErrorMessage>{formik.errors[field.name]}</FormErrorMessage>
                </FormControl>
              ))}
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  {...formik.getFieldProps("type")}
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">Open source consultancy session</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;
