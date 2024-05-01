"use server"
import { cookies } from "next/headers";

export async function checktoken(){
    const token = cookies().get("token");
    console.log("I am token" ,token);
    if(!token){
        return false;
    }
    return true;
}