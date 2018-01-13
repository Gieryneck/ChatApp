import React, {Component} from 'react';
import styles from './MessageForm.sass';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    handleSubmit(e) {

        if(this.state.text.trim().length !== 0) {
            e.preventDefault();
            const message = {
                from: this.props.name,
                text: this.state.text
            };
            this.props.onMessageSubmit(message);
            this.setState({ text: '' });
        } else

            e.preventDefault();
            this.setState({ text: '' }
        );
    }

    handleChange(e) {
        
        this.setState({ text: e.target.value });
    }

    render() {
        return (
            <form className={styles.MessageForm} onSubmit={e => this.handleSubmit(e)}>
                <input
                    className={styles.MessageInput}
                    onChange={e => this.handleChange(e)}
                    value={this.state.text}
                    placeholder='Message'
                    autoFocus // in React for autofocus
                />
            </form>
        );
    }
}

export default MessageForm;