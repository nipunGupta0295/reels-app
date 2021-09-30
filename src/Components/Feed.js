import React, { useContext, useEffect, useState } from 'react'
import Header from './Header';
import { AuthContext } from '../Context/AuthProvider';
import { database } from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import UploadFile from "./UploadFile";
import Profile from './Profile';
import './Feed.css'
import Posts from './Posts';

const useStyles = makeStyles({
    loader: {
        color: "black",
        marginLeft: "50%",
        marginTop: "20%"
    }
});

function Feed() {
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc) => {  //onSnapshot listener listen to the changes to the document and then creates a new snapshot of the document.
            // console.log(doc.data());
            setUserData(doc.data())
        })
    }, [currentUser])

    const classes = useStyles();

    const openProfile = flag1 =>{
        setFlag(flag1);
    }

    return (
        <>
            {userData == null ? <CircularProgress className={classes.loader} /> : <>
                <Header userData={userData} openProfile={openProfile} />
                <div style={{ height: '1.5vh' }} />
                {flag == false? <><UploadFile userData={userData} />
                <div className="feed-container">
                    <div className="center">
                        <Posts userData={userData} />
                    </div>
                </div></>: <Profile userData={userData}/>}
                
            </>
            }
        </>
    )
}
export default Feed