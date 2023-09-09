import {applicationDefault, initializeApp, refreshToken} from 'firebase-admin/app'
import { Message, getMessaging } from 'firebase-admin/messaging';
import { NextRequest, NextResponse } from 'next/server';
import {v4 as uuid} from 'uuid'

type MessageType = {
  connectionCode:string;
  courseCode:string;
  topic:string;
}

export async function POST(req:NextRequest) {
  try {
    const {connectionCode, courseCode, topic}:MessageType = await req.json()
    await initializeApp({
      projectId:'attendance-mgmt-kwasu',
      credential: applicationDefault(),
      // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
    }, 'fb-msg'+uuid());

    if(!connectionCode || !courseCode) {
      return new NextResponse('bad request', {status:400})
    }
    
    const message:Message = {
      notification: {
        title: connectionCode,
        body: courseCode,
      },
      topic:topic,
    };
  
    // const app = initializeApp({projectId:'attendance-mgmt-kwasu', credential:refreshToken('AIzaSyCza-5FM9SQlM70vPDBd-cNSil6H6EaGvE')})
  const res = await getMessaging().send(message)
  console.log('Successfully sent message:', res);
  return NextResponse.json({msg:'success'})
    
  } catch (error) {
    console.log(JSON.stringify(error), error);
    return new NextResponse(JSON.stringify(error), {status:500})
  }

}