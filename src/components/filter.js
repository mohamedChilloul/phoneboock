
const Filter = ({search, searchChange})=>{
    return(
      <div>
        <label>filter Shown whith </label>
        <input value={search} onChange={searchChange}></input>
    </div>
    )
  }
  export default Filter