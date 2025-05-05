import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, addUser } from '../features/userSlice';
import './UserList.css';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    if (newUser.trim() === '') return;
    const id = Date.now(); // unique ID
    dispatch(addUser({ id, name: newUser }));
    setNewUser('');
  };

  return (
    <div className="container">
      <h2 className="title">Carla's Flowernote List</h2>

      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter user name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '6px 0 0 6px',
            border: '1px solid #ccc',
            outline: 'none',
          }}
        />
        <button
          onClick={handleAddUser}
          style={{
            borderRadius: '0 6px 6px 0',
            padding: '10px 16px',
            backgroundColor: '#ff6b81',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </div>

      {loading && (
        <div className="loader">
          <img
            src="/static/happy-cat.gif"
            alt="Loading..."
            style={{ width: '120px', height: 'auto', marginBottom: '10px' }}
          />
          <p className='title'>Loading users... 😺</p>
        </div>
      )}

      {error && <p>Error: {error}</p>}

      {!loading &&
        users.map(user => (
          <div key={user.id} className="user-card">
            <span>{user.name}</span>
            <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default UserList;
