import React, {useEffect, useState} from 'react';
import API from '../services/api';
export default function Profile(){
  const [user,setUser]=useState(null);
  useEffect(()=>{ API.get('/api/auth/profile').then(r=>setUser(r.data)).catch(()=>{}); },[]);
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p className="text-sm text-slate-500 mt-2">Created: {new Date(user.createdAt).toLocaleString()}</p>
        </div>
      ) : <p>Loading...</p>}
    </div>
  )
}
