// communication between front-end and server is realized with events: they listen to and emit events


// import { Component } - import specified named export, so we don't have to preface Component with "React.": "class App extends Component"
import React, { Component } from 'react'; 
import io from 'socket.io-client';
import styles from './App.sass';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('http://localhost:3000'); // connects client with socketIO server

class App extends Component {

    constructor(props) {
    // class App is an extension of React "Component" class; to refer to the constructor of "Component" class, we have to call super(props) 
        super(props);

        this.state = { users: [], messages: [], text: '', name: '' };
        
    }

    componentDidMount() {
        socket.on('message', message => this.messageReceive(message));
        socket.on('update', ({users}) => this.chatUpdate(users));
    }

    messageReceive(message) {
        const messages = [message, ...this.state.messages];
        this.setState({messages});
    }

    chatUpdate(users) {
        this.setState({users});
    }

    handleMessageSubmit(message) {
        const messages = [message, ...this.state.messages];
        this.setState({messages});
        socket.emit('message', message);
    }

    handleUserSubmit(name) {
        this.setState({name});
        socket.emit('join', name);
    }

    render() {

        return this.state.name !== '' ? this.renderLayout() : this.renderUserForm(); // conditional render with ternary operator
        //return this.renderLayout();
    }                                                                                // if the user tries to submit empty name, he still sees UserForm



    renderLayout() {

        return (
    
            <div className={styles.App}>
            
                <div className={styles.AppHeader}>
                    <div className={styles.AppTitle}>Chit<span>Chat</span></div>
                    <div className={styles.AppRoom}>App room</div>
                </div>
     
                <div className={styles.AppBody}>
                    <UsersList users={this.state.users} />
                    <div className={styles.MessageWrapper}>
                        <MessageList messages={this.state.messages} thisUsersName={this.state.name} />
                        <MessageForm onMessageSubmit={message => this.handleMessageSubmit(message)} name={this.state.name} />
                    </div>
                </div>
            </div>
        );
    }

     renderUserForm() {
        return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)} />)
     }

};

export default App;