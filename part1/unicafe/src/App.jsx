import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedback = (setFn) => {
    setFn(prev => prev + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button name='good' handleClick={() => handleFeedback(setGood)} />
      <Button name='neutral' handleClick={() => handleFeedback(setNeutral)} />
      <Button name='bad' handleClick={() => handleFeedback(setBad)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({name, handleClick}) => (
  <button onClick={handleClick}>
    {name}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  const allFeedback = good + neutral + bad
  const average = (good - bad) / allFeedback
  const positive = `${(good / allFeedback * 100)} %`
  return (
    <div>
      <h2>Statistics</h2>
      {
        allFeedback 
        ?
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={allFeedback} />
            <StatisticsLine text="average" value={average} />
            <StatisticsLine text="positive" value={positive} />
          </tbody>
        </table>
        :
        <p>No feedback given</p>
      }
    </div>
  )
}

const StatisticsLine = ({text, value}) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
}

export default App