const Notification = ({message, err})=>{
    const seccessStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
    const errStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
    if (message === null){
      return null
    }
    return(
      <div style={err? errStyle : seccessStyle}>
        {message}
      </div>
    )
  }

  export default Notification