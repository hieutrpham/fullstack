import { useDispatch } from "react-redux";
import { addAnecdoteAction } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.input.value    
        dispatch(addAnecdoteAction(content))
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='input'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm 