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

  export default PersonForm