
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthProvider';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import { Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  no: {

    textAlign: 'Last'
  },
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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useContext(AuthContext);
  const history = useHistory();
  console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('Logging in user')
      setLoading(true)
      await login(email, password)
      setLoading(false)
      history.push('/')
    } catch {
      setError("Failed to log in")
      setTimeout(() => setError(''), 2000)
      setLoading(false)
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
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>

          <div>
            <TextField variant="outlined"
              margin="normal"
              type="email"
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
              type="password"
              id="password"
              label="Password"
              name="Password"
              autoComplete="Password"
              autoFocus
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>
          <Grid>
            <Link className={classes.no} href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>

          <Button className={classes.submit} type='submit' fullWidth varient='contained' color='primary' disabled={loading}>Login</Button>
        </form>
      </div>
    </Container>
  )
}

export default Login
