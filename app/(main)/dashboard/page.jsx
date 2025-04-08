import React from 'react'
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import { getIndustryInsight } from '@/actions/dashboard';
import DashboardView from './_components/dashboard_view';

async function IndustyInsightsPage() {

  const insights = await getIndustryInsight()

  const {isOnboarded}  = await getUserOnboardingStatus()
  console.log(isOnboarded)
  
  if (!isOnboarded) {
      redirect('/onboarding')
  }
  return (
    <div className='container mx-auto'>
    
    <DashboardView insights={insights}/>
    
    </div>
  )
}

export default IndustyInsightsPage