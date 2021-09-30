import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Avatar, Card } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';

import './profile.css'
import {database, storage} from '../firebase';
import ProfilePosts from './ProfilePosts'
import Video from './Video';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    profileImg: {
        height: theme.spacing(4),
        width: theme.spacing(4),
    }, 
    posts:{
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


function Profile(props) {
    console.log(props.userData);
    let classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [posts, setPosts] = useState(null);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const deletePostHandler = async (post) =>{
        console.log(post);
        await storage.ref(`/posts/${props.userData.userId}/${post.filename}`).delete();

        for(let i = 0;i< post.comments.length;i++) {
            await database.comments.doc(post.comments[i]).delete();
        }

        let newposts = props.userData.postIds.filter((postId) =>{
            return postId != post.id;
        });
        await database.users.doc(props.userData.userId).update({
            postIds: newposts
        })
        await database.posts.doc(post.id).delete()

    }

    useEffect(async ()=>{
        let postIds = props.userData.postIds;
        console.log("proile");
        console.log(postIds);
        let posts = [];
        for(let i = 0;i<postIds.length;i++){
            let id = postIds[i];
            let post = await database.posts.doc(id).get();
            console.log(post.filename);
            posts.push({...post.data(), id:postIds[i]});
        }
        console.log(posts);
        setPosts(posts);

    },[props.userData.postIds]);
    return (
        <>
            <div className="container">
                <div className="main">
                    <header>
                        <div className='img'>
                            <img src={props.userData.profileUrl} />
                        </div>
                        <section className='details'>
                            <div className="username"><h1>{props?.userData?.username}</h1></div>
                            <div className="post-num"><h1>{props?.userData?.postIds?.length} Posts</h1></div>
                        </section>
                    </header>
                </div>

                <div className="posts">
                    {posts?.map((post) => {
                        return(    
                                <div className="single-post" key={post.postId}>
                                    <div className="delete"><DeleteIcon style={{height:"100%"}} onClick={() => deletePostHandler(post)}/></div>
                                    <Video source={post?.pUrl} id={post?.pId} />
                                </div>        
                            
                        );
                    })}
                </div>
            </div>

        </>
    )
}

export default Profile
