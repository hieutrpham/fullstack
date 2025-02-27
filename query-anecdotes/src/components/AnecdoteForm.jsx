import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAnecdotes } from "../services";
import { useTimeoutNoti } from "../reducers/notification";

const AnecdoteForm = () => {
  const dispatch = useTimeoutNoti();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: (err) => {
      dispatch(err.response.data.error);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log(content, content.length);

    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
