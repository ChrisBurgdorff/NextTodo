import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
const appConfig = require("../config");

const secret = appConfig.JWT_SECRET;

export default function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.TodoJWT;
  //const url = req.url;
  const url = req.nextUrl.clone()

  if (jwt === undefined) {    
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  try {
    verify(jwt, secret);
    return NextResponse.next();
  } catch(err) {
    console.log(err);
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}