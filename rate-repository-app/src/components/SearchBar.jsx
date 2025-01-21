import { Searchbar } from "react-native-paper";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

const SearchBar = ({ refetch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debounceQuery !== "") {
      refetch({ searchKeyword: debounceQuery });
    }
  }, [debounceQuery, refetch]);

  console.log("query: ", searchQuery);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default SearchBar;
