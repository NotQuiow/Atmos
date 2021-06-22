import React, { useState, useRef } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";

const Search = ({ search }) => {
  const searchRef = useRef();
  const [searchInp, setSearchInp] = useState(() => "");
  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        setSearchInp("");
        search(e, searchRef);
      }}
    >
      <FormControl fullWidth>
        <InputLabel margin="dense" htmlFor="search-weather">
          Search City
        </InputLabel>
        <Input
          inputRef={searchRef}
          value={searchInp}
          onChange={(e) => setSearchInp(e.target.value)}
          type="text"
          id="search-weather"
          required
          placeholder="London, UK"
          endAdornment={
            <InputAdornment>
              <IconButton
                disabled={!searchInp}
                aria-label="Search Weather"
                type="submit"
              >
                <SearchRoundedIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};

export default Search;
