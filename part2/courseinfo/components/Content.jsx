/* eslint-disable react/prop-types */
import Part from './Part'
import Total from './Total'

const Content = ({parts}) => {
    return (
      <div>
        {   
            parts.map((p) => (
                <Part key={p.name} part={p} />
            ))
        }
        <Total parts={parts} />
      </div>
    )
  }

export default Content