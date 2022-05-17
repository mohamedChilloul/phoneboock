import { useState } from 'react'

const App= ()=> {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleAdd = (event)=>{
    event.preventDefault()
    let names =persons.map((p)=>p.name) 
    let exist = names.indexOf(name)
    if (exist === -1){
      let newPerson = {name : name, number:number}
      setPersons(persons.concat(newPerson))
      setName('')
      setNumber('')
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
  const filtredList = persons.filter((p)=>p.name.toLocaleLowerCase().match(search.toLocaleLowerCase()))
  //console.log(filtredList)
  return (
    <div>
      <h2>Phoneboock</h2>
      <div>
        <label>filter Shown whith </label>
        <input value={search} onChange={searchChange}></input>
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleAdd}>
        <div>
          <label>name : </label>
          <input type='text' onChange={nameChange} value={name}></input>
        </div>
        <div>
          <label>number : </label>
          <input type='text' onChange={numberChange} value={number}></input>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        filtredList.map((person)=><div key={person.id}>{person.name} {person.number}</div>)
      }
    </div>
  );
}

export default App;
