import React from 'react';
import axios from "axios";
import { _HOST } from './BackOffice';
import { Avatar, Checkbox, Divider, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { List } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    margin:"auto",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList(props) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
       {props && props.users && props.users.map(single => {
            console.log(single)
            return <div style={{width:'100%'}}>
                <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={single.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={single.username}
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Ativo: {single.ativo}
                            </Typography>
                            </React.Fragment>
                        }
                        />
                        <Checkbox
                            color="primary"
                            defaultChecked={single.checked}
                            onChange={(event) => {
                                console.log(event.target.checked)
                                console.log(single)
                                axios
                                    .put(_HOST+"/api/user/"+single.id+"/status/"+event.target.checked)
                                    .then(response => {
                                        console.log(response)
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                            }}
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
            </div>
       })}
    </List>
  );
}