import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
const appConfig = require("../config");
//import axios from "axios";
import { AuthContext} from '../Contexts/AuthContext';
import { useContext } from "react";

const secret = appConfig.JWT_SECRET;

export default function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.TodoJWT;
  const url = req.nextUrl.clone();
  

  if (jwt === undefined) {    
    return NextResponse.next();
  }
  try {
    const userInfo = verify(jwt, secret);
    if (userInfo.id) {
      fetch(appConfig.API_BASE_URL + '/api/user/' + userInfo.id)
        .then(response => response.json())
        .then(data => {
          //const user = data[0];
          
        });
      }
    return NextResponse.next();
  } catch(err) {
    console.log(err);
    return NextResponse.next();
  }
  return NextResponse.next();
}