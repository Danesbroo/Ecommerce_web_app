"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LogIn from '@/Components/LoginLogout/LogIn'

export default function page() {
  const router = useRouter()
  
    // useEffect(()=>{
    //   router.push('/');
    // },[])

  return (
    <>
        <LogIn/>
    </>
  )
}
