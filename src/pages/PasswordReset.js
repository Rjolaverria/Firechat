import { useContext, useState } from 'react';
import { Link as A, Redirect } from 'react-router-dom';
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Typography,
    Container,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { FirebaseContext } from '../context/firebaseContext';

const Login = () => {
    const { auth } = useContext(FirebaseContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');

    const resetPassword = (e) => {
        e.preventDefault();
        auth.sendPasswordResetEmail(email)
            .then(() => {
                setSuccess(true);
            })
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
                <Typography component='h1' variant='h5'>
                    Reset Password
                </Typography>
                {error && (
                    <Alert className='alert' severity='error'>
                        {error}
                    </Alert>
                )}
                {!success ? (
                    <form
                        className='auth-form'
                        noValidate
                        onSubmit={resetPassword}
                    >
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
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                        >
                            Reset
                        </Button>
                    </form>
                ) : (
                    <Typography component='h1' variant='h6'>
                        Email with instructions has been sent.
                    </Typography>
                )}
                <Link component={A} to='/login' variant='body2'>
                    Go back to Login
                </Link>
            </div>
        </Container>
    );
};

export default Login;
