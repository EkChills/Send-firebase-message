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
      credential: {
        "type": "service_account",
        "project_id": "attendance-mgmt-kwasu",
        "private_key_id": "ff6c192098e325256d336bb56a37f9dc9c85d12c",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxKLIqWnIvNF0f\nWzd5N7QaRwhQlBuaC+uGnHQr5wKFMOgjGREyPyIVf9eP6EJx3N5SEE+lPV5T2K7m\nE13tzegQPFuxeOYvri5D+rC18H7l/FnmFbJAkjVnpkldlEGi6zHH1S2wc3qFVpCp\nnsyOTltvI9QD+WtoVI1rg9WKeQf7nVRw2ZxjN9mR73cBaBiC3uhVAy9doyT3KS03\nVyFl+aBZNQgneVLDcdd3UgU+sbMfmrKT67MhiAJGHaagN33oBYHiklUp5FZCKs9E\nkOoBlEGhQHbcT/63lSOXCQMzI4XlSj9/9JVMfUIYtT+7dUisvXd0bNWSg6xjOG7z\noCzUHARNAgMBAAECggEADYojcb63Xtm060ZUq0hBVMfMgCINqPyTu9Y9v7Q4WlcW\nSsZp7Mnr8DI01pwE5gBgImv6NlIGIUjcdxuQUHIt8/208U+g4hCBGzNv6XvPqwKa\nGU5bsPkrqTgJf+QqjwnEJHZrt0JgIQwwYrJPBmpBLTGTDNm1ZoQdydOJ0Ls2y7lG\nBk7Y7jCH8TwZ1raZLp+xvS/pSQAvT2hpJddki725ILfglIphOdoa769uzD/tarp+\ns37ZPCd3/rGtbi1+nUZBrr8dXxpT2hsjZBNKm2dJPUsey2/vE00c/fJ6t2XvG9h0\noxrdj1iEvprGbiCL7F9vEcZuf/ifqoam5hm/uRQG8QKBgQDsP+7J7dcC6Ft8PiNl\noSVd93YWEojM/oWQAENxzUqLpPBv2t873TiygAaddxnGvjLbEs+cm8RqpXBgiyV3\nmWWYpwnybuKF5Zelh1rikZ8wcgG2irq9xnGeC3afImZgyL94jgLwUb1S0GNu2a7X\n1xCGn0t5Q6cKaMLrR9LwemYMMQKBgQC/+CPWJjxM7nKC2qeXGsU9Mc49mWFYiqAI\nleXOo6VqNxKHlxxBIV3kFD4az4RQXs2yKybpYQSVo4e9ThnRHONNcom/MO88zxAg\n5hpbLAltaNQNrzFvIkWcNatTEIocWDKWNUToa/5zeUHHOh72L6z+rD3nkFC8citU\nyjExA0He3QKBgHP9L4+UZevXiJMHLvnGlEH+LMvJbcC3dXutpW9KCz9kS2efXdpW\nUm/Qy26j+tPIrc9A/Q02rMhvUS0VI+AEQA0idY/BQRXcEwgB3G1AcZenYY/trKFf\nvIiLuEGI8hqydM8LagXzG7B8/1R9K4ps3IA71SJERM6ngItjR/0pGtEBAoGANRRe\njFMML1VrMkVVO5G6Yd5IoX2sjffeoiEYZteW4FST+gvNUzDvriXuuikQ88wS4iXO\nX49k3h9WZACZYNm0+/AkqEnWjKDQW9hkBzuY67ilkZcUex8l0jiAw7n6BjZY3nGi\nOQXLWJB5oKWwc+/gzJZBk6qyuDh1RL+XdG7rIr0CgYEAlJSw31nIOn/8wjeMeXOE\nm3qxZrpe5zr26ftp8kPeelwVBh4sTo/mH7JTzxaMwDNijh9uEirKG4z1CTLODc7m\ngAdrfeMlOBQZ75REQDZPddUi3X5TRyl7UUQlfv2DdO+F17EtSvO8iM4GCuipjBFc\ncmrasdv7bRxTKLGofQO+ahw=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-gonkx@attendance-mgmt-kwasu.iam.gserviceaccount.com",
        "client_id": "106604042971090569046",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gonkx%40attendance-mgmt-kwasu.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      } as any
      ,
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