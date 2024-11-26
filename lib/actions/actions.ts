"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma/db"
import { redirect } from "next/navigation"

export const updateUser = async(resumeData:any) => {
    const session = await auth()
    if(!session){
        return redirect("/login");
    } try {
        const updatedUser = await prisma.user.update({
            where:{
                email:session?.user?.email!,
            },
            data:{
                resumeProfile: resumeData,
            },
        });
        if(updatedUser){
            return {
                status:"success",
                message:"Profile updated successfully"
            }
        }
    } catch (error) {
        
    }
};