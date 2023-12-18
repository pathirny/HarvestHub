import React from "react";
import { Flex, Input } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

// implicate search function

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Flex justifyContent="center">
      <Input
        onChange={onChange}
        placeholder="Search 🔍"
        size="md"
        m="10px"
        width="90%"
        className="searchBar"
      />
    </Flex>
  );
};
