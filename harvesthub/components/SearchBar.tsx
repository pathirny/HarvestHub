import React from "react";
import { Input } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

// implicate search function

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <>
      <Input onChange={onChange} placeholder="Search" size="md" />
      <IconButton aria-label="Search" icon={<CiSearch />} />
    </>
  );
};
