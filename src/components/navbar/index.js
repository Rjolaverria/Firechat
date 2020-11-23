import { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
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

    return (
        <div className={classes.root}>
            <AppBar position='fixed' color='secondary'>
                <Toolbar>
                    <Typography variant='h5' className={classes.title}>
                        <WhatshotIcon />
                        FireChat
                    </Typography>
                    {auth.currentUser && (
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
                                    <MenuItem
                                        onClick={handleSignOut}>
                                        Sign out
                                    </MenuItem>
                                </Menu>
                            )}
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
