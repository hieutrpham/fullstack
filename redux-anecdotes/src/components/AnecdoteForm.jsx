import { useDispatch } from "react-redux";
import { addAnecdoteAction } from "../reducers/anecdoteReducer";
import { actionNoti } from "../reducers/notificationReducer";

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.input.value
        dispatch(addAnecdoteAction(content))
        dispatch(actionNoti(`you created a note '${content}'`, 1000))
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