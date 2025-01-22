import { Searchbar } from "react-native-paper";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

const SearchBar = ({ refetch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    const query =
      debounceQuery.trim() !== ""
        ? { searchKeyword: debounceQuery.trim() }
        : {};

    refetch(query).then(() => console.log("refetch successful"));
  }, [debounceQuery, refetch]);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default SearchBar;
