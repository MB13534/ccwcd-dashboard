import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Button,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import { goTo } from "../../util";
import { useAuth0 } from "../../hooks/auth";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.light,
  },
}));

const FoldersList = ({ data }) => {
  const classes = useStyles();
  let history = useHistory();
  const { user } = useAuth0();

  const handleClick = (id) => {
    goTo(history, `files/${id}`);
  };

  return (
    <div>
      <List>
        {data.map((item, index) => (
          <React.Fragment key={item.folderLink}>
            <ListItem button>
              <ListItemAvatar onClick={() => handleClick(item.name)}>
                <Avatar className={classes.avatar}>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                onClick={() => handleClick(item.name)}
              />
              {item.folderLink &&
                user &&
                (user["https://ccwcd2.org/roles"].includes("CCWCD Admin") ||
                  user["https://ccwcd2.org/roles"].includes("LRE Admin") ||
                    user["https://ccwcd2.org/roles"].includes("CCWCD Admin Demo")) && (
                  <Button
                    color="primary"
                    href={item.folderLink}
                    target="_blank"
                    rel="noopener"
                  >
                    Open in Dropbox
                  </Button>
                )}
            </ListItem>
            {index !== data.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

FoldersList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FoldersList;
