import React, {Component} from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import EmojiPicker from 'emoji-picker-react';
import JSEMOJI from 'emoji-js';

import ChatForm from './ChatForm';

import styles from './Chart.css';
import './chat.scss';

//emoji set up
let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = 'emojione';
// set the storage location for all emojis
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowEmoji: false,
            text: ''
        }
    }
    handleEmojiClick = (n, e) => {
        let emoji = jsemoji.replace_colons(`:${e.name}:`);
        console.log(n)
        console.log(e)
        console.log(emoji)
        this.setState({
          text: this.state.text + `${emoji}`,
          isShowEmoji: false
        });
      }

      handleShowEmoji = () => {
          this.setState({
            isShowEmoji: !this.state.isShowEmoji
          })
      }
      handleChange = (value) => {
          this.setState({
              text: value
          })
      }
    render () {
        const {expertChat, currentUser} = this.props
        return (
            <div className="chat-application" style={{height: '700px', position: 'relative'}}>
                <section className="chat-app-window">
                {expertChat &&
                    expertChat.map(Chat => (
                        <div key={Chat.id} className="chats">
                            <div className="chats">
                                <div className={`chat ${Chat.uid !== currentUser.uid ? 'chat-left' : '' }`}>
                                    <div className="chat-avatar">
                                        <a className="avatar" data-toggle="tooltip" data-placement="right" title="true" data-original-title>
                                        <img src={Chat.photoURL} className="width-50 rounded-circle" alt="avatar" />
                                        </a>
                                    </div>
                                    <div className="chat-body">
                                        <div className="chat-content">
                                        <p>{Chat.text}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     ))}
                </section>
                  
                <section className="chat-app-form bg-blue-grey bg-lighten-5">
                    <ChatForm expertId={this.props.expertId} handleChange={this.handleChange} handleShowEmoji={this.handleShowEmoji} text={this.state.text}/>
                </section>
                {this.state.isShowEmoji &&
                    <div className={styles.emojiContainer}>
                    <EmojiPicker onEmojiClick={this.handleEmojiClick} />
                </div>
                }
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
      currentUser: state.firebase.auth,
    }
  }

export default compose ( connect(mapStateToProps, null)
  )(Chat) 
