import React from 'react'
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';

async function IndustyInsightsPage() {


  const {isOnboarded}  = await getUserOnboardingStatus()
  console.log(isOnboarded)
  
  if (!isOnboarded) {
      redirect('/onboarding')
  }
  return (
    <div>IndustyInsightsPage</div>
  )
}

export default IndustyInsightsPage