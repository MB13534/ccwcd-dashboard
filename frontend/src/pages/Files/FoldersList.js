import React from "react";
import PropTypes from "prop-types";
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

const useStyles = makeStyles(theme => ({
  root: {},
}));

const FoldersList = ({ data }) => {
  const classes = useStyles();
  return (
    <div>
      <List>
        {data.map((item, index) => (
          <>
            <ListItem key={item.name} button>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={`${item.count} files`}
              />
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
