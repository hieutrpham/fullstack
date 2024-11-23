import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticsLine = (props) => {
  return(
    <>
      <td>{props.text}</td>
      <td>{props.count}</td>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0) {
    return (
      <>
        <header>Statistics</header>
        <p>No feedback given</p>
      </>
    )
  }
  else return (
    <>
      <header>Statistics</header>
      <table>
        <tr>
          <StatisticsLine text='good' count={good}/>
        </tr>
        <tr>
          <StatisticsLine text='neutral' count={neutral}/>
        </tr>
        <tr>
          <StatisticsLine text='bad' count={bad}/>
        </tr>
        <tr>
          <StatisticsLine text='all' count={all}/>
        </tr>
        <tr>
          <StatisticsLine text='average' count={(good-bad)/all}/>
        </tr>
        <tr>
          <StatisticsLine text='positive' count={(good/all)}/>
        </tr>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const vote = (type) => {
    const handler = () => {

      if (type === 'good') {
        setGood(good+1)
      }

      if (type === 'neutral') {
        setNeutral(neutral+1)
      }

      if(type === 'bad'){
        setBad(bad+1)
      }
    }
    return handler
  }

  return (
    <>
      <header>Give Feedback</header>

      <p>
        <Button handleClick={vote('good')} text="good"/>
        <Button handleClick={vote('neutral')} text="neutral"/>
        <Button handleClick={vote('bad')} text="bad"/>
      </p>

      <Statistics good={good} neutral={neutral} bad={bad}/>

    </>
  )
}

export default App