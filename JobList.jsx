import React from 'react'
export default function JobList({ jobs, onUpdate }){
  if(!jobs || jobs.length===0) return <p>No job applications yet.</p>
  return (<ul className='joblist'>{jobs.map(j=>(<li key={j.id}><div><strong>{j.company}</strong>{j.role && <span> - {j.role}</span>}</div><div><span className='status'>{j.status}</span><button onClick={()=>onUpdate(j.id,'interview')}>Interview</button><button onClick={()=>onUpdate(j.id,'offer')}>Offer</button><button onClick={()=>onUpdate(j.id,'rejected')}>Reject</button></div></li>))}</ul>)
}
