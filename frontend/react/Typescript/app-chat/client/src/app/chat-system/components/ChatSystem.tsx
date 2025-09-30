import * as React from 'react';
import { Message, User } from '../../../types/';
import { MessageItem } from './MessageItem';
import { Chance } from 'chance';

export interface PropsSendModal {
  addUser: (user: User) => {};
}

export interface PropsSendToMessage {
  currentUser: User;
}

interface Props extends PropsSendModal, PropsSendToMessage {
  messages: Message[];
  currentUser: User;
  addMessage: (message: Message) => {};
  getMessageList: () => {};
}

interface State {
  valueInput: string;
}

class ChatSystem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      valueInput: '',
    };
  }

  componentDidMount() {
    this.scrollToBottomListMessage();
  }

  componentDidUpdate() {
    this.scrollToBottomListMessage();
  }

  private textarea: HTMLTextAreaElement;
  private handleChange = (e: any) => {
    this.setState({
      valueInput: e.target.value
    })
  }

  // FIXME: still not find out what type for event in React Redux app
  private handleKeyDown = (e: any) => {
    const input = e.target.value;
    const conditionSubmit = e.keyCode === 13 && !e.shiftKey && input.trim();
    const {
      addMessage,
      currentUser
    } = this.props;

    if (conditionSubmit) {
      let chance = new Chance();

      addMessage({
        author: currentUser,
        content: this.textarea.value,
        id: chance.guid()
      });

      this.setState({
        valueInput: ''
      });
    }
  }

  private scrollToBottomListMessage = () => {
    const listMessageWrapper = document.getElementsByClassName('list-messages')[0];
    if (listMessageWrapper) {
      listMessageWrapper.scrollTop = listMessageWrapper.scrollHeight;
    }
  }

  render() {
    const { messages, currentUser } = this.props;
    const { valueInput} = this.state;

    return (
      <React.Fragment>
        <section className="main-content" data-test="main">
          <div ref="testing" className="list-messages" data-test="messages">
            {
              messages.map((message: Message) => {
                let props = {
                  message,
                  key: message.id,
                  currentUser,
                }
                return <MessageItem {...props}/>
              })
            }
          </div>
          <div className="chat-editor" data-test="editor-wrapper">
            <textarea
              className="editor"
              placeholder="Input message here"
              data-type="text"
              data-test="editor"
              value={valueInput}
              ref={(node: HTMLTextAreaElement) => this.textarea = node}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ChatSystem;