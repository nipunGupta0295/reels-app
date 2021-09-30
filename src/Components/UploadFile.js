import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { storage, database } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
const useStyles = makeStyles((theme) => ({
    progress: {
        width: '100%'
    }
}));
function UploadFile(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const types = ['video/mp4', 'video/webm', 'video/ogg'];
    const onChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (!file) {
            setError("Please select a file");
            setTimeout(() => {
                setError(null);
            }, 2000);
            return;
        }

        if (types.indexOf(file.type) == -1) {
            setError("Please select a video file");
            setTimeout(() => {
                setError(null);
            }, 2000);
            return;
        }

        if (file.size / (1024 * 1024) > 100) {
            setError("File is too big");
            setTimeout(() => {
                setError(null);
            }, 2000);
            return;
        }

        const id = uuidv4();
        const uploadTask = storage.ref(`/posts/${props.userData.userId}/${file.name}`).put(file);
        uploadTask.on('state_changed', fn1, fn2, fn3);
        function fn1(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }
        function fn2(error) {
            setError(error);
            setTimeout(() => {
                setError('')
            }, 2000);
        }

        function fn3() {
            setLoading(true);
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                let obj = {
                    comments: [],
                    likes: [],
                    pId: id,
                    pUrl: url,
                    filename: file?.name,
                    uName: props?.userData?.username,
                    uProfile: props?.userData?.profileUrl,
                    userId: props?.userData?.userId,
                    createdAt: database.getCurrentTimeStamp()
                }
                //console.log(obj);
                database.posts.add(obj).then(async docRef => {
                    console.log(docRef);
                    let res = await database.users.doc(props.userData.userId).update({
                        postIds: [...props.userData.postIds, docRef.id]
                    })
                }).then(() => {
                    setLoading(false);
                }).catch(e => {
                    setError(e);
                    setTimeout(() => {
                        setError(null)
                    }, 2000);
                    setLoading(false);
                })
            })
        }

    }

    return (
        <div>
            {
                error != null ? <Alert severity="error">{error}</Alert> : <div style={{ width: "150px", margin: "0 auto" }}>
                    {loading ? <LinearProgress className={classes.progress} color='secondary' style={{ width: '100%' }} /> : <></>}
                    <div>
                        <input
                            disabled={loading}
                            color='primary'
                            type='file'
                            onChange={onChange}
                            id='icon-button-file'
                            style={{ display: 'none' }}
                        />
                        <label htmlFor='icon-button-file'>
                            <Button disabled={loading} variant='outlined'
                                component='span' className={classes.button}
                                size='medium' color='secondary'
                                style={{ width: '100%' }}
                            >
                                Upload File
                            </Button>
                        </label>

                    </div>

                </div>

            }
        </div>
    )
}

export default UploadFile
