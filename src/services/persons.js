import axios from "axios"

const baseUrl = '/api/persons'

const getAll = ()=>{
    let request = axios.get(baseUrl)
    return request.then(res =>res.data)
}

const addPerson = (newPerson) =>{
    let request = axios.post(baseUrl, newPerson)
    return request.then(res=>res.data)
}
const deletePerson = (id)=>{
    let request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res=>res.data)
}
const updatePerson = (id, newPerson)=>{
    let request = axios.put(`${baseUrl}/${id}`,newPerson)
    return request.then(res =>res.data)
}

export default {getAll, addPerson, deletePerson, updatePerson}