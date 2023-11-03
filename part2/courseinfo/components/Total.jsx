/* eslint-disable react/prop-types */


const Total = ({parts}) => {
    const { exercises } = parts.reduce((a, b) => {
        return { exercises: a.exercises + b.exercises}
    })
    return (
      <p><b>Number of exercises: {exercises}</b></p>
    )
  }

export default Total