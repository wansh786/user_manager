import React, { useState } from 'react'
import './singup.css';

export const Singup = () => {
    const [deleted,setDeleted]=useState(false)
    const [email,setEmails]=useState("");
    const [password,setPassword]=useState("");
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    

    const handSingUp=()=>{
        const payload={
            deleted,
            email,
            password,
            firstName,
            lastName,
            
        }
        fetch("http://localhost:8080/users/register",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        .then(res=>res.json)
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
    }
  return (
    <div>
        <input type="text" value={email} placeholder='Email' onChange={(e)=>setEmails(e.target.value)} />
        <input type="text" value={firstName} placeholder='First Name' onChange={(e)=>setFirstName(e.target.value)} />
        <input type="text" value={lastName} placeholder='Last Name' onChange={(e)=>setLastName(e.target.value)} />
        <input type="text" value={password} placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={handSingUp}>Register</button>
    </div>
  )
}
