import { useState } from 'react'
import useCounter from '../hooks/useCounter'
import Card from './Card'

const BackwardCounter = () => {
  const [forwards, setForwards] = useState(false)
  const counter = useCounter(forwards)

  const changeForwards = () => {
    setForwards(prevState => !prevState)
  }

  return (
    <>
      <Card>{counter}</Card>
      <button onClick={changeForwards}>reverse</button>
    </>
  )
}

export default BackwardCounter
