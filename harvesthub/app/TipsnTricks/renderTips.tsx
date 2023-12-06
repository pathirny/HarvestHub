import { TipCard } from "@/components/TipCard";

export interface gardeningTipsType {
    id: number;
    title: string;
    description: string;
    author: string;
}

export function renderTips(tips: gardeningTipsType[]) {
  return tips.map((tip, index) => (
    <TipCard key={index} tip={tip} />
  ));
}