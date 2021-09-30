import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import Link from '@material-ui/core/Link';

import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider'
import { database } from '../firebase';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Profile from './Profile';
import MainNav from './MainNav';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        '&:hover':{
            curser: 'hover'
        }
    },
    link: {
        color: 'inherit',
        '&:hover': {
            textDecoration: "none"

        }
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    const open = Boolean(anchorEl);

    const [error, setError] = useState("");
    const { logout } = useContext(AuthContext);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlelogout = async () => {
        try {
            await logout();
        }
        catch (err) {
            setError(err);
        }


    }

    const handleProfile = () => {
        props.openProfile(true);
        setAnchorEl(null);
    }

    return (
        <>

            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title} onClick={() => props.openProfile(false)}>
                            {/* <Button >button</Button> */}
                            Instagram
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <Avatar alt="Remy Sharp" src={props.userData.profileUrl} />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleProfile}>

                                        {/* <Link 
                                            to={{
                                            pathname: '/profile',
                                            state: { userData: props.userData },
                                        }}
                                        >Profile</Link> */}
                                        Profile
                                    </MenuItem>

                                    <MenuItem onClick={handlelogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
}
