

import React from 'react'
import {initializeApp} from 'firebase-admin/app'
import admin from 'firebase-admin'
import {v4 as uuid} from 'uuid'



const body =  {
  connectionCode:"wanna lig?",
  courseCode:"2:45",
  topic:"100"
}



export default async function Home() {
  // const res = await fetch('https://send-firebase-message.vercel.app/api/sendtopic', {
  //   method:'POST',
  //   body:body as any
  // })
  // console.log(res);
  // await res.json()
  

  
  return (
    <div>page</div>
  )
}
