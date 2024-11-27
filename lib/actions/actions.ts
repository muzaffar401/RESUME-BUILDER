"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma/db"
import { redirect } from "next/navigation"
import { Template } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const updateUser = async (resumeData: any) => {
    const session = await auth()
    if (!session) {
        return redirect("/login");
    } try {
        const updatedUser = await prisma.user.update({
            where: {
                email: session?.user?.email!,
            },
            data: {
                resumeProfile: resumeData,
            },
        });
        if (updatedUser) {
            return {
                status: "success",
                message: "Profile updated successfully"
            }
        }
    } catch (error) {
        return {
            status: "error",
            message: "Something went wrong"
        };
    }
};

export const createTemplate = async (template: any) => {
    try {
        const createdTemplate = await prisma.template.create({
            data:{
                name:template.name,
                html:template.html,
                isPaid:template.isPaid,
                thumbnail:template.thumbnail,
            },
        });
        if(createdTemplate){
            return {
                status:"success",
                message:"Created template successfully"
            }
        }
    } catch (error) {
        return{
            status:"error",
            message:"Error creating template",
        };
    }
};

export const getAllTemplates = async () => {
    try {
        const templates = await prisma.template.findMany()
        return templates;
    } catch (error) {
        return{
            status:"error",
            message:"Template could not be fetched",
        };
    }
};

export const deleteTemplateById = async (id:string) => {
    try {
        const deletedTemplate = await prisma.template.delete({
            where:{
                id
            }
        })
        if(deletedTemplate){
            revalidatePath("/admin/templates");
            return{
                status:"success",
                message:"Template deleted successfully"
            }
        }
    } catch (error) {
        return {
            status:"error",
            message:"Something went wrong",
        }
    }
}
