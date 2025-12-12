import React, {useState} from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
export default function Register(){
  const [form,setForm]=useState({name:'',email:'',password:''});
  const [err,setErr]=useState('');
  const nav = useNavigate();
  const submit = async e=>{
    e.preventDefault();
    setErr('');
    if(!form.name||!form.email||!form.password){ setErr('All fields required'); return; }
    try{
      const res = await API.post('/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      nav('/dashboard');
    }catch(e){ setErr(e.response?.data?.msg || 'Failed'); }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="input" />
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="input" />
        <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="input" />
        {err && <div className="text-red-600">{err}</div>}
        <button className="btn w-full" type="submit">Register</button>
      </form>
    </div>
  )
}
