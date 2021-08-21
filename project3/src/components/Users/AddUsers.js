import { useState } from 'react';

import ErrorModal from '../UI/ErrorModal';
import Card from '../UI/Card';
import Button from '../UI/Button';

import classes from './AddUsers.module.css';

const AddUsers = props => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState(null);

  const usernameChangeHandler = event => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = event => {
    setEnteredAge(event.target.value);
  };

  const addUserHandler = event => {
    event.preventDefault();

    if (!enteredUsername.trim().length || !enteredAge.trim().length) {
      return setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
    }
    if (+enteredAge < 1) {
      return setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
    }

    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername('');
    setEnteredAge('');
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUsers;
