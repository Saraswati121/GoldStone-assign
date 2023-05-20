import React, { useState, useEffect } from 'react';
import "./style.css";
import axios from 'axios';

export const Userlist = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users'); 
        //console.log(response.data.userData)
         setUsers(response.data.userData);
      } catch (error) {
        console.error('Error fetching user data', error);
        setUsers([])
      }
    };
  
    const handleEditUser = (user) => {
      setSelectedUser(user);
    };
  
    const handleUpdateUser = async () => {
      try {
        await axios.put(`http://localhost:8080/users/${selectedUser._id}`, selectedUser);
        fetchUsers(); 
        setSelectedUser(null); 
      } catch (error) {
        console.error('Error updating user', error);
      }
    };

  return (
    <div>
      <h2>User List</h2>
      <div className='conteiner'>
      {users.map((user) => (
        <div key={user.id} className='card' >
          <h2>{user.name}</h2>
          <p><b>Email</b>: {user.email}</p>
          <p><b>Gender</b>: {user.gender}</p>
          <p><b>Status</b>: {user.status}</p>
          {selectedUser && selectedUser.id === user.id ? (
            <div>
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />
              <button onClick={handleUpdateUser} className='btn'>Save</button>
            </div>
          ) : (
            <button onClick={() => handleEditUser(user)} className='btn'>Edit</button>
          )}
        </div>
      ))}
      </div>
    </div>
  )
}
