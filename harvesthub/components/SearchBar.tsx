import React from "react";
import { Input } from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
import { CiSearch } from "react-icons/ci";


export const SearchBar = () => {
  return (
    <>
      <Input placeholder="Search" size="md" />
      <IconButton aria-label='Search' icon={<CiSearch/>} />
    </>
  );
};
