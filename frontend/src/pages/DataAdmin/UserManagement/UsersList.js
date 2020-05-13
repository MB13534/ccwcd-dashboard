import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  OutlinedInput,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/SortByAlpha";
import UpIcon from "@material-ui/icons/ArrowDropUp";
import DownIcon from "@material-ui/icons/ArrowDropDown";
import { Flex } from "../../../components/Flex";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    width: 35,
    height: 35,
    fontSize: 15,
  },
  formControl: {
    margin: theme.spacing(1),
  },
  search: {
    width: 300,
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
  },
}));

const UsersList = ({ users, activeUser, onClick }) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  if (users.length === 0) {
    return (
      <Box marginTop={2}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Users List
        </Typography>
        <Typography variant="body1">No Users Found</Typography>
      </Box>
    );
  }

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };

  const handleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <Box marginTop={2} width="100%">
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Users List
      </Typography>
      <Flex>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="search">Search</InputLabel>
          <OutlinedInput
            id="search"
            value={searchText}
            onChange={handleSearch}
            label="Search"
            className={classes.search}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Flex justifyContent="flex-start">
          <IconButton onClick={handleSortDirection}>
            <SortIcon color="primary" size="large" />
          </IconButton>
          {sortDirection === "asc" ? (
            <UpIcon size="small" color="disabled" />
          ) : (
            <DownIcon size="small" color="disabled" />
          )}
        </Flex>
      </Flex>

      <List>
        {users
          .filter((user) => user.auth0_email.includes(searchText))
          .sort((a, b) => {
            if (sortDirection === "asc") {
              if (a.auth0_email < b.auth0_email) {
                return -1;
              }
              if (a.auth0_email > b.auth0_email) {
                return 1;
              }
              return 0;
            } else {
              if (a.auth0_email > b.auth0_email) {
                return -1;
              }
              if (a.auth0_email < b.auth0_email) {
                return 1;
              }
              return 0;
            }
          })
          .map((user) => (
            <ListItem
              key={user.auth0_email}
              button
              selected={user.auth0_email === activeUser.auth0_email}
              onClick={() => onClick(user)}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  {user.auth0_email.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.auth0_email} />
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

UsersList.propTypes = {};

export default UsersList;
