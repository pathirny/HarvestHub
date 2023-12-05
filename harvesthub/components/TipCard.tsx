import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Flex,
  Box,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { CiHeart } from "react-icons/ci";

// 1 - Style card with border etc.
// 2 - Create a data.json file in same folder as tnt
// 3 - Create a function to map through the array of tips and render a card for each one
// 4 - Add search bar


export const TipCard = () => {
  return (
    <>
      <Card maxW="md" bg="#B9A48C" borderRadius={10} margin="20px" p="20px">
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="sm">Segun Adebayo</Heading>
                <Text>Creator, Chakra UI</Text>
              </Box>
            </Flex>
            <IconButton aria-label="Add to favourites" icon={<CiHeart />} />
          </Flex>
        </CardHeader>
        <CardBody>
          {/* <Text>
            With Chakra UI, I wanted to sync the speed of development with the
            speed of design. I wanted the developer to be just as excited as the
            designer to create a screen.
          </Text> */}
        </CardBody>
      </Card>
    </>
  );
};
