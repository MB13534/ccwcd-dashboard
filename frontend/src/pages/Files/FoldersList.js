import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import { goTo } from "../../util";

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.primary.light,
  },
}));

const FoldersList = ({ data }) => {
  const classes = useStyles();
  let history = useHistory();

  const handleClick = id => {
    goTo(history, `files/${id}`);
  };

  return (
    <div>
      <List>
        {data.map((item, index) => (
          <>
            <ListItem
              key={item.name}
              button
              onClick={() => handleClick(item.name)}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
            </ListItem>
            {index !== data.length - 1 && <Divider />}
          </>
        ))}
      </List>
    </div>
  );
};

FoldersList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FoldersList;
