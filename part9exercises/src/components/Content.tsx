import {CoursePart} from "../types"
import Part from "./Part"

interface ContentProps {
  courseParts: Array<CoursePart>
}

const Content = ({courseParts}: ContentProps) => {
  return <>{courseParts.map((c, index) => <p key={index}><Part part={c} /></p>)}</>
}

export default Content