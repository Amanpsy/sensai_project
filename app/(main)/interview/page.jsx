import { getAssessment } from '@/actions/interview'
import React from 'react'
import StatsCards from './_components/statscards'
import PerformanceChart from './_components/performancechart'
import QuizList from './_components/quizlist'

async function  InterViewPage() {

const assessments =  await getAssessment()

  return (
    <div>
    <div>
    <h1 className='text-6xl font-bold gradient-title mb-5'>
 Interview Preparation   
    </h1>
    </div>
    
<div className='space-y-6'>
<StatsCards assessments={assessments} />

<PerformanceChart assessments={assessments}  />

<QuizList assessments={assessments} />

</div>

    </div>
  )
}

export default InterViewPage