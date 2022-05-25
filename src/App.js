import { useState, useEffect } from 'react'
//import axios from "axios"
import personService from './services/persons'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import Notification from './components/notification'





const App= ()=> {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage]= useState(null)
  const [err, setErr]= useState(false)

  const handleAdd = (event)=>{
    event.preventDefault()
    let names =persons.map((p)=>p.name) 
    let exist = names.indexOf(name)
    if (exist === -1){
      let newPerson = {name : name, number:number}
      //adding the new person to the json-server
      personService.addPerson(newPerson).then(res=>{
        setPersons(persons.concat(res))
        setName('')
        setNumber('')
        setMessage(`${newPerson.name} added successfully !`)
        setTimeout(()=>{
          setMessage(null)
        },4000)
      })
    }else{
      if(window.confirm(`${name} already added to phoneBoock , do you want to replace the his number?`)){
        let exitedPers = persons.find(p =>p.name === name)
        let newPerson = {...exitedPers, number:number}
        personService.updatePerson(newPerson.id,newPerson).then(res =>{
          setPersons(persons.map(p=>p.id!==newPerson.id ? p : res))
          setName('')
          setNumber('')
          setMessage(`the number of -- ${newPerson.name} -- updated successfully !`)
          setTimeout(()=>{
            setMessage(null)
          },4000)
        }).catch(err =>{
          setErr(true)
          setMessage(` ${newPerson.name} has been already deleted from the phoneBoock ?`)
          setPersons(persons.filter(p=>p.id!==newPerson.id))
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
      }
    }
    
  }
  const nameChange = (event)=>{
    setName(event.target.value)
  }
  const numberChange = (event)=>{
    setNumber(event.target.value)
  }
  const searchChange=(event)=>{
    setSearch(event.target.value)
  }

  const handleDelete = (id)=>{
    //console.log('delete ', id)
    let deletedPers = persons.find(p=>p.id === id)
    if(window.confirm(`do you realy want to delete ${deletedPers.name} from the phoneBoock ?`)){
      personService.deletePerson(id).then(res=>{
      setPersons(persons.filter(p =>p.id!==id))
      }).catch(err =>{
        setErr(true)
        setMessage(` ${deletedPers.name} has been already deleted from the phoneBoock ?`)
        setPersons(persons.filter(p=>p.id!==id))
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
    }
  }
  const filtredList = persons.filter((p)=>p.name.toLocaleLowerCase().match(search.toLocaleLowerCase()))
  //console.log(filtredList)

  useEffect(()=>{
    personService.getAll().then(res =>setPersons(res))
  },[])
  return (
    <div>
      <h2>Phoneboock</h2>
      <Notification message={message} err={err}></Notification>
      <Filter search={search} searchChange={searchChange}></Filter>
      <h2>add a new</h2>
      <PersonForm handleAdd={handleAdd}name={name}number={number}nameChange={nameChange}numberChange={numberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={filtredList}handleDelete={handleDelete}></Persons>
    </div>
  );
}

export default App;
