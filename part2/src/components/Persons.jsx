const Persons = ({personToShow, onDelete}) => {
    return (
        <ul>
            {personToShow.map(person => {
                return (
                    <li key={person.id}>
                        {person.name}: {person.number}
                        <button key={person.id} onClick={() => onDelete(person.id)}>
                            delete</button>
                    </li>

                )}
            )}
        </ul>
    )
}

export default Persons