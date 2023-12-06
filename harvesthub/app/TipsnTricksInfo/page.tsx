import { Center, Container, Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import { gardeningTips } from "../TipsnTricks/page";
import { gardeningTipsType } from "../TipsnTricks/renderTips";
export default function TipsnTricksInfo(tip: gardeningTipsType) {
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
          <h1>{tip.title}</h1>
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
