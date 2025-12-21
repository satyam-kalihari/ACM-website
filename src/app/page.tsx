
import { auth, clerkClient } from '@clerk/nextjs/server'
import React from 'react'


const page = async() => {
  const { sessionClaims } = await auth();
  return (
    <div>
      {sessionClaims?.sub}
      page
    </div>
  )
}

export default page