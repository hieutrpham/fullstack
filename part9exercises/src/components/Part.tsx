import { CoursePart, CoursePartBase } from "../types"

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

const Base = (base: CoursePartBase) => <strong>{base.name} {base.exerciseCount}</strong>

interface PartProps {
  part: CoursePart
}

const Part = ({part}: PartProps) => {
  switch (part.kind) {
    case 'basic':
      return (
        <>
          <Base name={part.name} exerciseCount={part.exerciseCount}/> 
          <br/>
          <em>{part.description}</em>
        </>
      )
    case 'group':
      return (
        <>
          <Base name={part.name} exerciseCount={part.exerciseCount}/> 
          <br/>
          Project Count {part.groupProjectCount}
        </>
      )
    case 'background':
      return (
        <>
          <Base name={part.name} exerciseCount={part.exerciseCount}/> 
          <br/>
          {part.backgroundMaterial}
        </>
      )
    case 'special':
      return (
        <>
          <Base name={part.name} exerciseCount={part.exerciseCount}/> 
          <br/>
          <em>{part.description}</em>
          <br/>
          required skills: {part.requirements.join(', ')}
        </>
      )
    default:
      return assertNever(part)
  }
}

export default Part