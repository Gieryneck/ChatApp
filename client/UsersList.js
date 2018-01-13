import React from 'react';
import styles from './UsersList.sass';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/fontawesome-free-regular';
import { faUsers } from '@fortawesome/fontawesome-free-solid';

const UsersList = props => (
  <div className={styles.UsersListWrapper}>
    <div className={styles.UsersOnline}>
    <FontAwesomeIcon icon={ faUsers } />
      {props.users.length} Users Online
    </div>
    <ul className={styles.UsersList}>
      {
        props.users.map((user) => {
          return (
            <li key={user.id} className={styles.UserItem}>
              {user.name}
            </li>
          );
        })
      }
    </ul>
  </div>
);

export default UsersList;       