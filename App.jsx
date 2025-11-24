import React, { useState, useEffect } from 'react'
import JobForm from './JobForm'
import JobList from './JobList'
import { auth, db } from './firebaseConfig'
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore'
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'

// If Firebase not configured, app falls back to localStorage
const useFirebase = !!(auth && db)

export default function App(){
  const [jobs, setJobs] = useState([])
  useEffect(()=>{
    if(useFirebase){
      // sign in anonymously and listen to collection 'jobs'
      signInAnonymously(auth).then(()=>{
        const q = query(collection(db, 'jobs'), orderBy('createdAt','desc'))
        const unsub = onSnapshot(q, snap=>{
          const arr = []; snap.forEach(d=>arr.push({id:d.id, ...d.data()}))
          setJobs(arr)
        })
        return () => unsub()
      }).catch(()=>{ console.warn('Firebase auth failed') })
    } else {
      setJobs(JSON.parse(localStorage.getItem('jobs')||'[]'))
    }
  },[])

  async function addJob(job){
    if(useFirebase){
      await addDoc(collection(db,'jobs'), {...job, createdAt: new Date().toISOString() })
    } else {
      const arr = [job, ...JSON.parse(localStorage.getItem('jobs')||'[]')]; localStorage.setItem('jobs', JSON.stringify(arr)); setJobs(arr)
    }
  }

  async function updateStatus(id, status){
    if(useFirebase){
      const jobRef = doc(db,'jobs',id); await updateDoc(jobRef, { status })
    } else {
      const arr = JSON.parse(localStorage.getItem('jobs')||'[]').map(j=> j.id===id? {...j,status}:j ); localStorage.setItem('jobs', JSON.stringify(arr)); setJobs(arr)
    }
  }

  return (<div className='app'><header><h1>Job Application Tracker</h1></header><JobForm onAdd={addJob}/><JobList jobs={jobs} onUpdate={updateStatus}/></div>)
}
