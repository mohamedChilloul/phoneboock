import { useState, useEffect } from 'react'
//import axios from "axios"
import personService from './services/persons'
const Filter = ({search, searchChange})=>{
  return(
    <div>
      <label>filter Shown whith </label>
      <input value={search} onChange={searchChange}></input>
  </div>
  )
}

const PersonForm = (props)=>{
  return(
    <form onSubmit={props.handleAdd}>
        <div>
          <label>name : </label>
          <input type='text' onChange={props.nameChange} value={props.name}></input>
        </div>
        <div>
          <label>number : </label>
          <input type='text' onChange={props.numberChange} value={props.number}></input>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
  )
}
const Persons = ({persons, handleDelete})=>{
  return(
      persons.map((person)=>
        <div key={person.name}>
          {person.name} {person.number} <button onClick={()=>handleDelete(person.id)}>delete</button>
        </div>)
  )
}

const App= ()=> {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')

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
      })
    }else{
      alert(`${name} is already added to the phoneboock `)
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
      setPersons(persons.filter(p =>p.id!=id))
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
      <Filter search={search} searchChange={searchChange}></Filter>
      <h2>add a new</h2>
      <PersonForm handleAdd={handleAdd}name={name}number={number}nameChange={nameChange}numberChange={numberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={filtredList}handleDelete={handleDelete}></Persons>
    </div>
  );
}

export default App;
