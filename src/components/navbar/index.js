import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Menu,
    MenuItem,
    Avatar,
    Container,
} from '@material-ui/core';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import { FirebaseContext } from '../../context/firebaseContext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = () => {
    const { auth } = useContext(FirebaseContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        auth.signOut();
        handleClose();
    };

    const userNav = auth.currentUser && (
        <div>
            <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
            >
                <Avatar
                    alt={auth.currentUser.displayName}
                    src={auth.currentUser.photoURL}
                />
            </IconButton>
            {auth.currentUser && (
                <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                </Menu>
            )}
        </div>
    );

    const guestNav = (
        <div>
            <Button component={Link} to='/login'>
                Login
            </Button>
            <Button component={Link} to='/register'>
                Sign Up
            </Button>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position='fixed' className='navbar'>
                <Container maxWidth='md'>
                    <Toolbar>
                        <Typography variant='h5' className={classes.title}>
                            <WhatshotIcon color='secondary' />
                            FireChat
                        </Typography>
                        {auth.currentUser ? userNav : guestNav}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Navbar;
