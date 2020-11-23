import { useContext, useState } from 'react';
import { Link as A, Redirect } from 'react-router-dom';
import {
    Button,
    CssBaseline,
    TextField,
    Divider,
    Link,
    Grid,
    Typography,
    Container,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { FirebaseContext } from '../context/firebaseContext';

const Login = () => {
    const { firebase, auth } = useContext(FirebaseContext);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch((error) => {
            setError(error.message);
            setTimeout(() => setError(''), 5000);
        });
    };
    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch((error) => {
            setError(error.message);
            setTimeout(() => setError(''), 5000);
        });;
    };

    const fbSignIn = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider).catch((error) => {
            setError(error.message);
            setTimeout(() => setError(''), 5000);
        });;
    };

    if (auth.currentUser) {
        return <Redirect to='/' />;
    }
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className='auth-form-container'>
                <Typography component='h1' variant='h4'>
                    Sign In
                </Typography>
                {error && (
                    <Alert className='alert' severity='error'>
                        {error}
                    </Alert>
                )}
                <form className='auth-form' noValidate onSubmit={signIn}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        onChange={({ target }) => setEmail(target.value)}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Grid container>
                        <Grid item xs>
                            <Link
                                component={A}
                                to='/resetpassword'
                                variant='body2'
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={A} to='/register' variant='body2'>
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                    >
                        Sign In
                    </Button>
                    <Divider />
                    <Button
                        fullWidth
                        variant='contained'
                        color='secondary'
                        onClick={googleSignIn}
                    >
                        Sign In with Google
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        className='facebook-button'
                        onClick={fbSignIn}
                    >
                        Sign In with Facebook
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;
