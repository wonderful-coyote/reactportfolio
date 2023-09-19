import React from "react";
import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Card = ({ title, description, imageSrc }) => {
  return (
    <VStack
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="lg"
      maxW="300px"
    >
      <Image src={imageSrc} alt={title} maxH="200px" />
      <VStack spacing={2} alignItems="start" w="100%">
        <Heading as="h3" fontSize="xl">
          {title}
        </Heading>
        <Text fontSize="md">{description}</Text>
      </VStack>
      <HStack justify="space-between" w="100%">
        <Text color="gray.500" fontSize="sm">
          Learn more
        </Text>
        <FontAwesomeIcon icon={faArrowRight} size="1x" />
      </HStack>
    </VStack>
  );
};

export default Card;
