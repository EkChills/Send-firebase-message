import React from 'react'

const body =  {
  connectionCode:"wanna lig?",
  courseCode:"2:45",
  topic:"100"
}

export default async function page() {
  const res = await fetch('https://send-firebase-message.vercel.app/api/sendtopic', {
    method:'POST',
    body:body as any
  })
  const data = await res.json()
  console.log(data);
  
  return (
    <div>page</div>
  )
}
