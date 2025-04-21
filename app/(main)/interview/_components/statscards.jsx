import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Brain, Trophy } from 'lucide-react';

function StatsCards({assessments}) {



const getAverageScore = () => {

if(!assessments)  return null;

const total = assessments.reduce((acc,crr) => acc + crr.quizScore, 0)
return (total / assessments.length).toFixed(1)

}

const getLatestAsssessment  = () => {
    if(!assessments) return null

    return assessments[0]
}


 const getTotalQuestions = () => {
if(!assessments?.length) return 0
return assessments.reduce((acc, crr) => acc + crr.questions.length, 0)

 }



  return (
    <div className='grid gap-4 md:grid-cols-3'>
    <Card>
  <CardHeader className='flex items-center justify-between space-y-0 pb-2 '>
    <CardTitle className='text-sm font-medium'>Average Score</CardTitle>
    <Trophy className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">{getAverageScore()} %</div>
    <p className="text-xs text-muted-foreground">Across All Assessments</p>
  </CardContent>
 
</Card>



<Card>
<CardHeader className='flex items-center justify-between space-y-0 pb-2 '>
  <CardTitle className='text-sm font-medium'>Questions Practiced</CardTitle>
  <Brain className='h-4 w-4 text-muted-foreground' />
  </CardHeader>
<CardContent>
  <div className="text-2xl font-bold">{getTotalQuestions()}</div>
  <p className="text-xs text-muted-foreground">Total Questions</p>
</CardContent>

</Card>



<Card>
<CardHeader className='flex items-center justify-between space-y-0 pb-2 '>
  <CardTitle className='text-sm font-medium'>Latest Score</CardTitle>
  <Trophy className='h-4 w-4 text-muted-foreground' />
  </CardHeader>
<CardContent>
  <div className="text-2xl font-bold">{getLatestAsssessment().quizScore.toFixed(1) || 0} %</div>
  <p className="text-xs text-muted-foreground">Most Recent Quiz</p>
</CardContent>

</Card>
    
    </div>
  )
}

export default StatsCards