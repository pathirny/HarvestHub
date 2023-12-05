import Header from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { TipCard } from "@/components/TipCard";


export default function TipsnTricks() {
  return (
    <>
      <Header title="Tips and Tricks" />
      <SearchBar/>
      <TipCard /> 
    </>
  );
}
