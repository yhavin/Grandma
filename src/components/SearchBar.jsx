import React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
 
 const Search = ({ setSearchQuery }) => {
   return (
     <form>
      <TextField 
        onInput={(e) => setSearchQuery(e.target.value.toLowerCase())}
        variant="outlined"
        placeholder="Search"
        size="small"
        InputProps={{endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
          )
        }}
      />
     </form>
   )
 };
 
 export default Search;