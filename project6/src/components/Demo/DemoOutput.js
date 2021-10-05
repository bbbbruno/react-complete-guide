import React from 'react'

const DemoOutput = props => {
  console.log('DEMO RUNNING')

  return (
    <div>
      <p>{props.show ? 'This is new!' : ''}</p>
    </div>
  )
}

export default React.memo(DemoOutput)
