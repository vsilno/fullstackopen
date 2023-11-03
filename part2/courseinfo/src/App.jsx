/* eslint-disable react/prop-types */
import Course from "../components/Course"
import { courses } from "./courses"

const App = () => {
  
  return (
    <div>
      {
        courses.map((c) => (
          <Course key={c.id} course={c} />
        ))
      }
    </div>
  )
}

export default App
