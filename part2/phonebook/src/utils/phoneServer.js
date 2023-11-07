import axios from "axios"

const baseUrl = "/api/persons"

const getPersons = () => {
    const res = axios.get(baseUrl)
    return res.then(res => res.data)
}

const addPerson = (person) => {
    const res = axios.post(baseUrl, person)
    return res.then(res => res.data)
}

const editNumber = (person) => {
    const res = axios.put(`${baseUrl}/${person.id}`, person)
    return res.then(res => res.data)
}

const deletePerson = (person) => {
    const proceed = window.confirm(`This operation will delete ${person.name}, do you want to continue?`)
    if (!proceed) return
    const res = axios.delete(`${baseUrl}/${person.id}`)
    res.catch((e) => {
        window.alert(`${person.name} was not found. Refresh the page and try again. \n${e.message}`)
    })
    return res.then(res => res.data)  
}

export default { getPersons, addPerson, editNumber, deletePerson }