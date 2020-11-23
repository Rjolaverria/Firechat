import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const MessageForm = ({ messages, user }) => {
    const [text, setText] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL, displayName } = user;

        await messages.add({
            text,
            uid,
            photoURL,
            displayName,
            date: new Date().toISOString(),
        });
        setText('');
    };

    return (
        <form noValidate onSubmit={sendMessage} className='message-form'>
            <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                label='Message'
                color='secondary'
            />
            <IconButton type='submit' disabled={text.length < 1}>
                <WhatshotIcon
                    fontSize='large'
                    color={text.length > 0 ? 'secondary' : 'disabled'}
                />
            </IconButton>
        </form>
    );
};

export default MessageForm;
