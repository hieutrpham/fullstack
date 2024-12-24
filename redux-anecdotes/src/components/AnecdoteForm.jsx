import { useDispatch } from "react-redux";
import { addAnecdoteAction } from "../reducers/anecdoteReducer";
import { createNoti, resetNoti } from "../reducers/notificationReducer";

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.input.value    
        dispatch(addAnecdoteAction(content))
        dispatch(createNoti(content))
        setTimeout(() => {
          dispatch(resetNoti())
        }, 5000);
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