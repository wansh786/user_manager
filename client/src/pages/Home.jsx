import React, { useState, useEffect } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import { Singup } from './Singup';

export const Home = () => {

    const [users, setUsers] = useState([]);
    const [email, setEmails] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate();

  
    useEffect(() => {
        fetch("http://localhost:8080/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.log(err));
    }, []);

    const handleSignup = () => {
        const payload = {
            email,
            password,
            firstName,
            lastName,
        };
        fetch("http://localhost:8080/users/register", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                setUsers([...users, data]); 
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (userId) => {
        fetch(`http://localhost:8080/users/${userId}`, {
            method: "DELETE"
        })
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
          <div>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
          <button>Export</button>
          </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td><button onClick={() => handleDelete(user.id)}>DELETE</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
