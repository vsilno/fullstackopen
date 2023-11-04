/* eslint-disable react/prop-types */
import Person from "./Person"

const Persons = ({persons, deletePerson}) => {
    return (
        <ul>
            {
                persons.map((p) => (<Person key={p.name} person={p} deletePerson={deletePerson} />))
            }
        </ul>
    )
}

export default Persons