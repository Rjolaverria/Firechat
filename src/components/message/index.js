import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core';
import moment from 'moment';

const Message = ({
    user,
    data: { text, date, uid, photoURL, displayName },
}) => {
    displayName = displayName && displayName.trim().split(' ')[0];
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
                secondary={
                    user.uid === uid
                        ? `${date} - @${displayName}`
                        : `@${displayName} - ${date}`
                }
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
