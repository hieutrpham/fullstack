interface Course {
  name: string
  exerciseCount: number
}

interface ContentProps {
  courseParts: Course[]
}

const Content = (props: ContentProps) => {
  return <>{props.courseParts.map((c, index) => <p key={index}>{c.name} {c.exerciseCount}</p>)}</>
}

export default Content