import React from 'react'
import { industries } from './../../data/industries';
import OnBoardingForm from './_components/onboarding-form';
import { getUserOnboardingStatus } from '@/actions/user';
import { async } from './../../../actions/user';
import { redirect } from 'next/navigation';

const OnBoarding = async () =>  {  

const {isOnboarded}  = getUserOnboardingStatus()
console.log(isOnboarded, "isOnboarded")
if (isOnboarded) {
  console.log(isOnboarded, "isOnboarded2")

    redirect('/dashboard')
}



  return (
    <main>
    <OnBoardingForm industries={industries} />
    
    </main>
  )
}

export default OnBoarding