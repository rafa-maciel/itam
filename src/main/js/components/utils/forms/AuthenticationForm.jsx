// import { Button, Grid, TextField, Typography } from '@material-ui/core'
// import React from 'react'

// export default function AuthenticationForm( {} ) {
//     return (
//         <>
//             <Typography variant="h3" component="h1">Welcome to ITAM System</Typography>
//             <Typography variant="p" component="p">Please enter with your email address and your password</Typography>
//             <form>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} md={12}>
//                         <TextField
//                             fullWidth
//                             label="E-mail"
//                             name="email"
//                             helperText="someone@example.com"/>
//                     </Grid>
//                     <Grid item xs={12} md={12}>
//                         <TextField
//                             fullWidth
//                             label="Password"
//                             type="password"
//                             name="password"/>
//                     </Grid>
//                 </Grid>
//                 <Button type="submit">Sigin</Button>
//             </form>
//         </>
//     )
// }


import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Rafa Maciel Dev
      </Link>{' '}
      2021
      {'.'}
    </Typography>
  );
}

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
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AuthenticationForm({ onFormSubmit }) {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const classes = useStyles();

    const handleFormSubmit = event => {
        event.preventDefault()
        if (email && password) {
            onFormSubmit({
                'email': email,
                'password': password
            })
        } else {
            return;
        }
    }
    
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inventory System - ITAM
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
          <TextField
            value={email}
            onChange={e => {setEmail(e.target.value)}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={e => {setPassword(e.target.value)}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}