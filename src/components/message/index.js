import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import moment from 'moment';

const Message = ({
    user,
    data: { text, date, uid, photoURL, displayName },
}) => {
    displayName = displayName && displayName.split(' ')[0];
    date = moment(date).fromNow();
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
                secondary={`${date} - @${displayName}`}
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
