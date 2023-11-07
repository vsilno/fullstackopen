import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import server from './utils/phoneServer'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    server.getPersons().then(res => setPersons(res))
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    const person = { name: newName, number: newNumber }
    const isPerson = persons.find((p) => p.name === newName)
    if (isPerson) {
      const edit = window.confirm(`"${newName}" already exists, do you want to edit its number?`)
      if (edit) {
        server
        .editNumber({ ...isPerson, number: newNumber })
        .then(res => {
          const newArr = persons.map(p => p.name === res.name ? res : p)
          setPersons(newArr)
          showNotification({
            message: `${newName} has been updated successfully !`,
            type: 'success'
          })
        })
        .catch(() => {
          
          showNotification({
            message: `${newName} was not found. Please try again.`,
            type: 'error'
          })
        })
        setNewName('')
        setNewNumber('')
      }
      return
    } 

    if (!isPerson && newName && newNumber) {
      server
        .addPerson(person)
        .then(res => {
          setPersons(persons.concat(res))
          showNotification({
            message: `${newName} has been added successfully !`,
            type: 'success'
          })
        })
        .catch(e => {
          showNotification({
            message: `${e.response.data.error}`,
            type: 'error'
          })
        })
      setNewName('')
      setNewNumber('')
    } else {
      window.alert('Fields must be filled properly')
    }
  }

  const handleDelete = (person) => {
    server
      .deletePerson(person)
      .then(() => {
        const newArray = persons.filter((p) => p.id !== person.id)
        setPersons(newArray)
      }).catch(() => {
        showNotification({
          message: `${person.name} was not found. Please try again.`,
          type: 'error'
        })
      })
  }

  const showNotification = ({message, type}) => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const filteredArray = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification { ...{ message } } />
      <Filter filter={filter} setFilter={setFilter}/>

      <h2>Add a new</h2>

      <PersonForm { ...{ newName, newNumber, handleSubmit, setNewName, setNewNumber} } />

      <h2>Numbers</h2>

      <Persons persons={filteredArray} deletePerson={handleDelete} />
    </div>
  )
}

export default App