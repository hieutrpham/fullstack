const Course = ({course}) => {
    return (
      <>
        {course.map(course => (
          <div key={course.id}>
            <h2>{course.name}</h2>
            <ul>
              {course.parts.map(part => (
                <li key={part.id}>{part.name}: {part.exercises}</li>
              ))}
            </ul>
            <p>
              total of {course.parts.reduce(
                (acc, part) => acc+part.exercises, 0 
              )} exercises
            </p>
          </div>
        ))}
      </>
    )
  }

export default Course