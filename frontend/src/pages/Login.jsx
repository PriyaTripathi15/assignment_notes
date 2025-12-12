import React, {useState} from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
export default function Login(){
  const [form,setForm]=useState({email:'',password:''});
  const [err,setErr]=useState('');
  const nav = useNavigate();
  const submit = async e=>{
    e.preventDefault();
    setErr('');
    if(!form.email||!form.password){ setErr('All fields required'); return; }
    try{
      const res = await API.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      nav('/dashboard');
    }catch(e){ setErr(e.response?.data?.msg || 'Failed'); }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Welcome back</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="input" />
        <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="input" />
        {err && <div className="text-red-600">{err}</div>}
        <button className="btn w-full" type="submit">Login</button>
      </form>
    </div>
  )
}
