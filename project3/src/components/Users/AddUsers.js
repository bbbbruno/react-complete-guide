import { useState, useRef } from 'react'

import ErrorModal from '../UI/ErrorModal'
import Card from '../UI/Card'
import Button from '../UI/Button'

import classes from './AddUsers.module.css'

const AddUsers = props => {
  const nameInputRef = useRef()
  const ageInputRef = useRef()

  const [error, setError] = useState(null)

  const addUserHandler = event => {
    event.preventDefault()

    const enteredUsername = nameInputRef.current.value
    const enteredAge = ageInputRef.current.value

    if (!enteredUsername.trim().length || !enteredAge.trim().length) {
      return setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      })
    }
    if (+enteredAge < 1) {
      return setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      })
    }

    props.onAddUser(enteredUsername, enteredAge)
    nameInputRef.current.value = ''
    ageInputRef.current.value = ''
  }

  const errorHandler = () => {
    setError(null)
  }

  return (
    <>
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
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  )
}

export default AddUsers
