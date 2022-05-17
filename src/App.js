import { useState } from 'react'

const App= ()=> {
  const [persons, setPersons] = useState([{name:'chilloul mohamed'}])
  const [name, setName] = useState('')
  
  const handleAdd = (event)=>{
    event.preventDefault()
    let newPerson = {name : name}
    setPersons(persons.concat(newPerson))
    setName('')
  }
  const nameChange = (event)=>{
    setName(event.target.value)
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
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>persons</h2>
      {
        persons.map((person)=><div key={person.name}>{person.name}</div>)
      }
    </div>
  );
}

export default App;
