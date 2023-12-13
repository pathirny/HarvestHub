import { TipCard } from "@/components/TipCard";
import { Container } from "@chakra-ui/react";
export interface gardeningTipsType {
  id: number;
  title: string;
  description: string;
  author: string;
}

export function renderTips(tips: any) {
  return tips.map((tip: any, index: any) => (
    <Container
      className="card"
      maxW="md"
      borderRadius={10}
      margin="20px"
      p="20px"
      zIndex="0"
    >
      <TipCard key={index} tip={tip} />
    </Container>
  ));
}
