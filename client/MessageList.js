import React from 'react';
import styles from './MessageList.sass';

const Message = props => (

    props.thisUsersName == props.from ?

    <div className={styles.thisUsersMessage}>
        <p>{props.text}</p>
        <h5>{props.from}</h5>
    </div>
    :
    <div className={styles.Message}>
        <p>{props.text}</p>
        <h5>{props.from}</h5>
    </div>
);

const MessageList = props => (
    <div className={styles.MessageList}>
        {
            
            props.messages.map((message, i) => {
                //console.log(props.thisUsersName)
                return (
                    <Message
                        key={i}
                        from={message.from}
                        text={message.text}
                        thisUsersName={props.thisUsersName}
                    />
                );
            })
        }
    </div>
);

export default MessageList;