import React, { useState, useEffect } from 'react'
import useHttp from './hooks/useHttp'

import Tasks from './components/Tasks/Tasks'
import NewTask from './components/NewTask/NewTask'

function App() {
  const [tasks, setTasks] = useState([])

  const transformTasks = tasksObj => {
    const loadedTasks = Object.entries(tasksObj).map(([key, value]) => {
      return { id: key, text: value.text }
    })
    setTasks(loadedTasks)
  }

  const { isLoading, error, sendRequest: fetchTasks } = useHttp()

  useEffect(() => {
    fetchTasks(
      {
        url: 'https://react-http-db4d6-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
      },
      transformTasks
    )
  }, [fetchTasks])

  const taskAddHandler = task => {
    setTasks(prevTasks => prevTasks.concat(task))
  }

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  )
}

export default App
