import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import {actionNoti} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    // console.log(filter)
    
    if (filter) {
      return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter)) 
    }
    
    return anecdotes
  })

  console.log(anecdotes)

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  console.log('sorted', sortedAnecdotes)
    
  const dispatch = useDispatch()

  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(vote(anecdote.id, anecdote.content, anecdote.votes))
              dispatch(actionNoti(`you voted '${anecdote.content}'`, 1000))
            }}>
              vote
            </button>

        </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList