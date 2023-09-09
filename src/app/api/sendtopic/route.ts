import {applicationDefault, initializeApp, refreshToken}  from 'firebase-admin/app'
import { Message, getMessaging } from 'firebase-admin/messaging';
import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin'
import {v4 as uuid} from 'uuid'
import servAct from '../../../../service-account.json'



type MessageType = {
  connectionCode:string;
  courseCode:string;
  topic:string;
  appName:string;
}

export async function POST(req:NextRequest) {
  // console.log(  process.env.GOOGLE_APPLICATION_CREDENTIALS);
  // admin.initializeApp()
  const app = admin.initializeApp({
    projectId:'attendance-mgmt-kwasu',
    credential: admin.credential.cert(servAct as any),
  }, 'damn'+uuid())
  process.env.GOOGLE_APPLICATION_CREDENTIALS 
  const {connectionCode, courseCode, topic, appName}:MessageType = await req.json()
  // const servAct = require('../../../../service-account.json')
  console.log(app);
  
  try {
    // initializeApp({
    //   projectId:'attendance-mgmt-kwasu',
    //   credential: applicationDefault(),
    //   // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
    // }, 'fb-msg'+uuid());
  
    
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