import { Center, Container, Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
export default function TipsnTricksInfo() {
  return (
    <>
      <Header />
      <Flex
        marginTop="2rem"
        gap="2rem"
        flexDirection="column"
        justifyContent="space-around"
        align="center"
      >
        <Container
          backgroundColor="#F3EBE4"
          borderRadius="25px"
          width="90%"
          textAlign="center"
        >
          <h1>Title</h1>
        </Container>
        <Container
          backgroundColor="#F3EBE4"
          borderRadius="25px"
          width="90%"
          textAlign="center"
        >
          <h1>Image</h1>
        </Container>
        <Container
          backgroundColor="#F3EBE4"
          borderRadius="25px"
          width="90%"
          textAlign="center"
        >
          <h1>Description</h1>
        </Container>
      </Flex>
    </>
  );
}
