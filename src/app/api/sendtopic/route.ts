import {applicationDefault, initializeApp, refreshToken}  from 'firebase-admin/app'
import { Message, getMessaging } from 'firebase-admin/messaging';
import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin'
import {v4 as uuid} from 'uuid'



type MessageType = {
  connectionCode:string;
  courseCode:string;
  topic:string;
  appName:string;
}

export async function POST(req:NextRequest) {
  console.log( process.env.SERVICE_ACCOUNT_DETAILS);
  admin.initializeApp()
  process.env.GOOGLE_APPLICATION_CREDENTIALS 
  const {connectionCode, courseCode, topic, appName}:MessageType = await req.json()
  // const servAct = require('../../../../service-account.json')
  const app = admin.initializeApp({
    projectId:'attendance-mgmt-kwasu',
    credential: admin.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT_DETAILS!) as admin.ServiceAccount),
  }, uuid() + uuid())
  // console.log(app);
  
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
  console.log('Successfully sent message:', res)
  admin.app().delete()
  .then(() => {
    console.log('Firebase app deleted successfully.');
  })
  .catch((error) => {
    console.error('Error deleting Firebase app:', error);
  })
  return NextResponse.json({msg:'success'})
    
  } catch (error) {
    console.log(JSON.stringify(error), error);
    return new NextResponse(JSON.stringify(error), {status:500})
  } finally{
    
  }

}