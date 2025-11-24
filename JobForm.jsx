import React, { useState } from 'react'
export default function JobForm({ onAdd }){
  const [company,setCompany]=useState(''); const [role,setRole]=useState('');
  function submit(e){ e.preventDefault(); if(!company) return; onAdd({ id: Date.now().toString(), company, role, status: 'applied' }); setCompany(''); setRole(''); }
  return (<form className='jobform' onSubmit={submit}><input placeholder='Company' value={company} onChange={e=>setCompany(e.target.value)} required /><input placeholder='Role' value={role} onChange={e=>setRole(e.target.value)} /><button type='submit'>Add</button></form>)
}
