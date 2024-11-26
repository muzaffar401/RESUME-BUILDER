import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { NextResponse } from "next/server";
import { prisma } from "./prisma/db";
export const authConfig = {
    adapter:PrismaAdapter(prisma),
    providers:[GitHub],
    pages:{
        signIn:"/login",
    },
    session:{
        strategy:"jwt"
    },
    callbacks:{
        authorized({auth,request:{nextUrl}}){
            const isLoggedIn = !!auth?.user
            const isOnHome = nextUrl.pathname.startsWith("/")
            if(isOnHome && !isLoggedIn){
                if(isLoggedIn) return true;
                return false;
            } else if(isLoggedIn && nextUrl.pathname === "/login"){
                return NextResponse.redirect(new URL("/",nextUrl))
            }
            return true;
        }
    }

} satisfies NextAuthConfig