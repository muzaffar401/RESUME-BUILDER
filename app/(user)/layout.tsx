import Container from "@/components/Container"
import Navbar from "@/components/Navbar"
import { FormProvider } from "@/context/FormContext"
import React from "react"

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <FormProvider>
            <Navbar />
            <Container>
                {children}
            </Container>
        </FormProvider>
    )
}

export default UserLayout