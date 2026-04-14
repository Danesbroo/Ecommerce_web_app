import { NextRequest, NextResponse } from 'next/server';

export function middleware(request) {
    const url = request.nextUrl;  // nextUrl is predefined function to grap 

    // redirect if user logged in or not 
    const isLoggedIn = request.cookies.get("token")?.value;

    if (!isLoggedIn && url.pathname.startsWith("/my-dashboard")) { // if user is not logged In but try to open my-dashboard redirect it to login/register page
        return NextResponse.redirect(new URL("/login-register", request.url));
    }

    if (!isLoggedIn && url.pathname.startsWith("/checkout")) {
        return NextResponse.redirect(new URL("/login-register", request.url));
    }
    if (isLoggedIn && url.pathname.startsWith("/login-register")) { // if user is logged In but try to open login/register page redirect it to my-dashboard page
        return NextResponse.redirect(new URL("/my-dashboard", request.url));
        }

        
    // }
    //continue request
    return NextResponse.next();
}
