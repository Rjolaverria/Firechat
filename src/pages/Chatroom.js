import { useContext, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FirebaseContext } from '../context/firebaseContext';
import { Message, MessageForm } from '../components';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        margin: '0 auto',
        overflow: 'scroll',
    },
}));

const Chatroom = () => {
    const classes = useStyles();
    const { firestore, user } = useContext(FirebaseContext);

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('date').limit(30);
    const [messages] = useCollectionData(query, { idField: 'id' });

    const bottom = useRef(null);

    useEffect(() => {
        if (messages) {
            bottom.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    if (!user) {
        return <Redirect to='/login' />;
    }

    return (
        <div className='chatroom'>
            <List className={classes.root}>
                {messages &&
                    messages.map((msg) => (
                        <Message key={msg.id} data={msg} user={user} />
                    ))}
                <div ref={bottom}></div>
            </List>
            <MessageForm
                firestore={firestore}
                user={user}
                messages={messagesRef}
            />
        </div>
    );
};

export default Chatroom;
