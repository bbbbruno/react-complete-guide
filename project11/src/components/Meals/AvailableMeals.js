import { useEffect, useState } from 'react'

import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState('')

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true)
      const response = await fetch(
        'https://react-http-db4d6-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
      )

      if (!response.ok) throw new Error('Something went wrong')

      const responseData = await response.json()

      const loadedMeals = Object.entries(responseData).map(([key, value]) => {
        return {
          id: key,
          name: value.name,
          description: value.description,
          price: value.price,
        }
      })
      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch(error => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  if (isLoading) {
    return (
      <section className={classes['meals-loading']}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes['meals-error']}>
        <p>{httpError}</p>
      </section>
    )
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map(meal => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
