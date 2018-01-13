import React, {Component} from 'react';

import styles from './UserForm.sass';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onUserSubmit(this.state.name); // this.props.onUserSubmit is given to UserForm by App in App's renderLayout
  }

  handleChange(e) {
    this.setState({ name : e.target.value });
  }

  render() {
    return(
      <div className={styles.UserForm}>  
        <h1>Chit<span>Chat</span></h1>
        <form onSubmit={e => this.handleSubmit(e)}>
            <input
            className={styles.UserInput}
            placeholder='Write your nickname and press enter :)'
            onChange={e => this.handleChange(e)}
            value={this.state.name}
            autoFocus // in React for autofocus
            />
        </form>
      </div>  
    );
  }
}

export default UserForm;