import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import moment from 'moment';

const Message = ({ user, data: { text, date, uid, photoURL } }) => {
    return (
        <ListItem
            alignItems='flex-start'
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: 0,
            }}
        >
            <ListItemAvatar>
                <Avatar alt='Remy Sharp' src={photoURL} />
            </ListItemAvatar>
            <ListItemText
                primary={text}
                secondary={moment(date).fromNow()}
                style={
                    user.uid === uid
                        ? {
                              position: 'absolute',
                              right: '75px',
                              textAlign: 'right',
                          }
                        : null
                }
            />
        </ListItem>
    );
};

export default Message;
