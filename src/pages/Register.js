import { useContext, useState } from 'react';
import { Link as A, Redirect, useHistory } from 'react-router-dom';
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { FirebaseContext } from '../context/firebaseContext';

const Register = () => {
    const history = useHistory();
    const { auth } = useContext(FirebaseContext);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((result) =>
                result.user
                    .updateProfile({
                        displayName: name,
                    })
                    .then(() => {
                        history.push('/');
                    })
            )
            .catch((error) => {
                setError(error.message);
                setTimeout(() => setError(''), 5000);
            });
    };

    if (auth.currentUser) {
        return <Redirect to='/' />;
    }
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className='auth-form-container'>
                <Typography component='h1' variant='h4'>
                    Register
                </Typography>
                {error && (
                    <Alert className='alert' severity='error'>
                        {error}
                    </Alert>
                )}
                <form
                    className='auth-form'
                    onSubmit={handleRegister}
                    noValidate
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                label='Full Name'
                                autoComplete='name'
                                onChange={({ target }) => setName(target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                label='Email Address'
                                autoComplete='email'
                                onChange={({ target }) =>
                                    setEmail(target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                label='Password'
                                type='password'
                                autoComplete='current-password'
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
                            />
                        </Grid>
                    </Grid>
                    <Link component={A} to='/login' variant='body2'>
                        Already have an account? Sign in
                    </Link>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Register;
