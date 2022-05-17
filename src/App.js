import { useState } from 'react'

const App= ()=> {
  const [persons, setPersons] = useState([{name:'chilloul mohamed',number:'1234567890'}])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

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
  return (
    <div>
      <h2>Phoneboock</h2>
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
        persons.map((person)=><div key={person.name}>{person.name} {person.number}</div>)
      }
    </div>
  );
}

export default App;
