import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
const appConfig = require("../config");
//import axios from "axios";

const secret = appConfig.JWT_SECRET;

export default function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.TodoJWT;
  //const url = req.url;
  const url = req.nextUrl.clone();
  console.log("IN THE FUCKING MIDDLEWARE");

  if (jwt === undefined) {    
    url.pathname = '/login';
    return NextResponse.next();
  }
  try {
    const userInfo = verify(jwt, secret);
    console.log(userInfo.id);
    if (userInfo.id) {
      console.log(appConfig.API_BASE_URL + '/api/user/' + userInfo.id);
      fetch(appConfig.API_BASE_URL + '/api/user/' + userInfo.id)
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
      }
    return NextResponse.next();
  } catch(err) {
    console.log(err);
    url.pathname = '/login';
    return NextResponse.next();
  }
  return NextResponse.next();
}