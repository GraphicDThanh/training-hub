import * as React from 'react';
import { Message } from '../../../types/';
import { PropsSendToMessage } from './ChatSystem';
import { DEFAULT_AVATAR_URL } from '../../../constants';

interface Props extends PropsSendToMessage {
  message: Message;
}

export const MessageItem = (props: Props) => {
  if (!props.message.author.id) {
    return null;
  }
  // use destructure of ES6 to get and rename if necessary
  const {
    message: {
      author: { id, avatar, name },
      content
    },
    currentUser: { id: currentId }
  } = props;

  let classNameMessage = 'message-item';

  if (id === currentId) {
    classNameMessage += ' owner';
  }

  return (
    <div className={classNameMessage}>
      <div className="avatar-wrapper">
        <img src={avatar || DEFAULT_AVATAR_URL} alt="avatar user" className="avatar"/>
      </div>
      <div className="info">
        {
          name && <div className="name">{name}</div>
        }
        {
          content && <div className="message">{content}</div>
        }
      </div>
    </div>
  );
}