"use client"

import React from 'react'
import {initializeApp} from 'firebase-admin/app'
import admin from 'firebase-admin'
import servAct from  '../../service-account.json'
import {v4 as uuid} from 'uuid'



const body =  {
  connectionCode:"wanna lig?",
  courseCode:"2:45",
  topic:"100"
}



export default  function Home() {
  // const res = await fetch('https://send-firebase-message.vercel.app/api/sendtopic', {
  //   method:'POST',
  //   body:body as any
  // })
  // const data = await res.json()
  // console.log(data);

  React.useEffect(() => {
    const app = initializeApp({
      projectId:'attendance-mgmt-kwasu',
      credential: admin.credential.cert(servAct as any),
    }, uuid())
    console.log(app);
    
  },[])
  
  return (
    <div>page</div>
  )
}
