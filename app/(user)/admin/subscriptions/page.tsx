import { auth } from '@/auth'
import React from 'react'

const SubscriptionPage = async() => {
    const session = await auth()
    if(//@ts-ignore
        !session?.user.role !== "admin"){
        return <div className="h-screen flex justify-center items-center">
            <h1 className="text-emerald-400 text-5xl">You are not authorized to view this page</h1>
        </div>
    }
  return (
    <div>SubscriptionPage</div>
  )
}

export default SubscriptionPage