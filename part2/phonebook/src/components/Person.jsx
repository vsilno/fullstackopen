/* eslint-disable react/prop-types */

const Person = ({person, deletePerson}) => {
    return (
        <li>
            <span>{person.name} </span> 
            <span>{person.number} </span>
            <button onClick={() => deletePerson(person)}>delete</button>
        </li>
    )
}

export default Person