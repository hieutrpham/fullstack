import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";
import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return {
    type,
    value,
    onChange,
  };
};

const Authors = (props) => {
  const name = useField("text");
  const born = useField("number");
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return null;
  }
  const authors = result.data.allAuthors;

  const handleSubmit = (e) => {
    e.preventDefault();
    const authorName = name.value;
    const authorBorn = Number(born.value);

    editAuthor({ variables: { name: authorName, setBornTo: authorBorn } });
  };

  return (
    <>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        name <input {...name} />
        <br />
        born <input {...born} />
        <br />
        <button type="submit">update author</button>
      </form>
    </>
  );
};

export default Authors;
