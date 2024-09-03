"use client"
import React, { useEffect } from 'react'
import Logo from '../../../_components/Logo'
import { OrganizationSwitcher, UserButton, useUser} from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

function Header(){
  const { userId } = useAuth();
  const {user} = useUser();
  console.log(user)
  useEffect(()=>{
    user&&saveUserData();
  },[])

  const saveUserData = async()=>{
    const docId =user?.primaryEmailAddress?.emailAddress; 
    try{
      await setDoc(doc(db,'Users',docId),{
        name:user?.fullName,
        avatar:user?.imageUrl,
        email:user?.primaryEmailAddress?.emailAddress
      })
      console.log("document uploaded")
    }
    catch(e){
      console.log(e);
    }
  }
  console.log(userId)
  return (

    <div className=' flex justify-between items-center p-3 shadow-md'>
        <Logo/>
        <OrganizationSwitcher afterLeaveOrganizationUrl={'/dashboard'}
        afterCreateOrganizationUrl={'/dashboard'}/>
        <UserButton/>
    </div>
  );
}

export default Header