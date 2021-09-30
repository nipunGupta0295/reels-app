// import React, { useState, useContext } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Avatar from '@material-ui/core/Avatar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import Link from '@material-ui/core/Link';

// import { useHistory } from 'react-router-dom';
// import { AuthContext } from '../Context/AuthProvider'
// import { database } from '../firebase';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Profile from './Profile';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         flexGrow: 1,
//     },
//     link: {
//         color: 'inherit',
//         '&:hover': {
//             textDecoration: "none"

//         }
//     }
// }));

// function MainNav(props) {
//     const classes = useStyles();
//     const [auth, setAuth] = React.useState(true);
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const open = Boolean(anchorEl);

//     const [error, setError] = useState("");
//     const { logout } = useContext(AuthContext);

//     const handleChange = (event) => {
//         setAuth(event.target.checked);
//     };

//     const handleMenu = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const handlelogout = async () => {
//         try {
//             await logout();
//         }
//         catch (err) {
//             setError(err);
//         }


//     }

//     const handleProfile = () => {

//     }

//     return (
//         <>
//             <div className={classes.root}>
//                 <AppBar position="static">
//                     <Toolbar>
//                         <Typography variant="h6" className={classes.title}>
//                             Instagram
//                         </Typography>
//                         {auth && (
//                             <div>
//                                 <IconButton
//                                     aria-label="account of current user"
//                                     aria-controls="menu-appbar"
//                                     aria-haspopup="true"
//                                     onClick={handleMenu}
//                                     color="inherit"
//                                 >
//                                     <Avatar alt="Remy Sharp" src={props.userData.profileUrl} />
//                                 </IconButton>
//                                 <Menu
//                                     id="menu-appbar"
//                                     anchorEl={anchorEl}
//                                     anchorOrigin={{
//                                         vertical: 'top',
//                                         horizontal: 'right',
//                                     }}
//                                     keepMounted
//                                     transformOrigin={{
//                                         vertical: 'top',
//                                         horizontal: 'right',
//                                     }}
//                                     open={open}
//                                     onClose={handleClose}
//                                 >
//                                     <MenuItem onClick={handleClose}>

//                                         <Link href="/profile" className={classes.link}>
//                                             Profile
//                                         </Link>
//                                     </MenuItem>

//                                     <MenuItem onClick={handlelogout}>Logout</MenuItem>
//                                 </Menu>
//                             </div>
//                         )}
//                     </Toolbar>
//                 </AppBar>
//             </div>
//         </>
//     );
// }

// export default MainNav
