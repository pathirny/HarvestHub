import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Flex,
  Box,
  Heading,
  IconButton,
  Button,
  Image,
  CardFooter,
  Avatar,

} from "@chakra-ui/react";
import { CiHeart } from "react-icons/ci";

export default function TipsnTricks() {
  return (
    <>
       <Card maxW="md">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="sm">Segun Adebayo</Heading>
                <Text>Creator, Chakra UI</Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<CiHeart/>}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            With Chakra UI, I wanted to sync the speed of development with the
            speed of design. I wanted the developer to be just as excited as the
            designer to create a screen.
          </Text>
        </CardBody>
      </Card>
    </>
  );
}
