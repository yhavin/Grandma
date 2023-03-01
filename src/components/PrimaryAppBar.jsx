import React from "react";
import { styled, alpha } from '@mui/material/styles';
import SearchBar from "./SearchBar.jsx";
import { AppBar, Toolbar, IconButton, InputBase, Typography } from "@mui/material/";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const PrimaryAppBar = ({ handleOpen, setSearchQuery })  => {
  return (
    <AppBar position="sticky" style={{ borderRadius: "5px" }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" onClick={handleOpen}>
          <AddIcon />
        </IconButton>
        <Typography variant="h6">Recipes</Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search" onInput={(e) => setSearchQuery(e.target.value.toLowerCase())} />
        </Search>
        {/* <SearchBar setSearchQuery={setSearchQuery}/> */}
      </Toolbar>
    </AppBar>

  )
}

export default PrimaryAppBar;