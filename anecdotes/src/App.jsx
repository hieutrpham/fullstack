import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(Array(8).fill(0))
  console.log(voted)
  const nextClick = () => setSelected(getRandomInt(0, 7))

  const voteClick = (idx) => {
    const copy = [...voted];      // Create a shallow copy of the array
    copy[idx] += 1;               // Increment the value at the specified index
    return setVoted(copy)
  }
  const maxVote = Math.max(...voted)

  return (
    <>
      <header>Anecdote of the day</header>
      <div>
        <p>
          {anecdotes[selected]}
        <br/><br/>has {voted[selected]} votes  
        </p>
      </div>
      <Button onClick={() => voteClick(selected)} text='vote' />
      <Button onClick={nextClick} text='next' />
      <br/><br/>
      <header>Anecdote with most votes</header>
      <br/>
      {anecdotes[voted.indexOf(maxVote)]} 
      <br/><br/>
      <div>has {maxVote} votes</div>
    </>
  )
}

export default App