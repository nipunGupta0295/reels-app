import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthProvider';
import { database, storage } from '../firebase';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        backgroundColor: "#00f2ff70",
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const { signup, currentUser } = useContext(AuthContext);
    const history = useHistory();
    console.log(signup);
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signup(email, password);
            let uid = res.user.uid;
            const uploadTaskListner = storage.ref(`/users/${uid}/profileImage`).put(file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion

            // fn 1 -> progress tracking
            // fn2 -> error
            // fn3 -> success

            uploadTaskListner.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }
            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('')
                }, 2000);
                setLoading(false)
            }

            async function fn3() {
                let downloadUrl = await uploadTaskListner.snapshot.ref.getDownloadURL();
                console.log(downloadUrl);
                await database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: []
                })
            }

            setLoading(false);
            history.push('/')
        }
        catch (err) {
            setError(err);
            setTimeout(() => {
                setError('')
            }, 2000);
            setLoading(false);
        }
    }

    const handleFileSubmit = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file != null) {
            setFile(file);
        }
    }

    useEffect(() => {
        if (currentUser) {
            history.push('/')
        }
    }, [])

    const classes = useStyles();

    return (
        <Container maxWidth='xs'>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={handleSignup}>
                    <div>
                        <TextField variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="user"
                            label="User Name"
                            name="user"
                            autoComplete="Username"
                            autoFocus
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>

                    <div>
                        <TextField variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="Email"
                            autoComplete="Email"
                            autoFocus
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>

                    <div>
                        <TextField variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="Password"
                            autoComplete="Password"
                            autoFocus
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>

                    <div>

                        <input
                            disabled={loading}
                            color='primary'
                            type='file'
                            onChange={handleFileSubmit}
                            id='icon-button-file'
                            style={{ display: 'none' }}
                        />
                        <label htmlFor='icon-button-file'>
                            <Button disabled={loading} variant='outlined'
                                component='span' className={classes.button}
                                size='small' color='secondary'>
                                Upload File
                            </Button>
                        </label>

                    </div>
                    <Button className={classes.submit} type='submit' fullWidth varient='contained' color='primary' disabled={loading}>Sign Up</Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default SignUp
