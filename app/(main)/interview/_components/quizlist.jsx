"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import QuizResult from './quizresult';


function QuizList({assessments}) {
const [selectedQuiz, setselectedQuiz] = useState(null)

const router = useRouter()


  return (
    <>
    <Card>
  <CardHeader className="flex flex-row items-center justify-between">
   <div>
   <CardTitle className='graident-title text-3xl md:text-4xl'>Recent Quizzes</CardTitle>
   <CardDescription>Review your past quiz performance</CardDescription>
   </div>
   <Button onClick={() => router.push("/interview/mock")}>
   
   Start New Quiz
   </Button>
 
  </CardHeader>
  <CardContent>
<div className='space-y-4'>

{assessments.map((assessment, index) => {
  return (
    <Card key={assessment.id} className='cursor-pointer hover:bg-muted/50 transition-colors' onClick={() => setselectedQuiz(assessment)} >
    <CardHeader>
      <CardTitle> Quiz {index + 1}</CardTitle>
      <CardDescription className='flex justify-between w-full'>
      
      <div>
      
      Score : {assessment.quizScore.toFixed(1)}

      </div>
      <div>{format(new Date(assessment.createdAt), "MMMM dd, yyyy HH:mm")}</div>
      
      
      </CardDescription>
    </CardHeader>
    <CardContent className='text-sm text-muted-foreground'>
      <p> {assessment.improvementTip} </p>
    </CardContent>

  </Card>
  )
} )}


</div>



  </CardContent>
 
</Card>

<Dialog open={!!selectedQuiz} onOpenChange={() => setselectedQuiz(null)} >
  <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
    <DialogHeader>
      <DialogTitle></DialogTitle>
     <QuizResult result={selectedQuiz}  hideStartNew onStartNew={() => router.push("/interview/mock")} />
    </DialogHeader>
  </DialogContent>
</Dialog>
    
    </>
  )
}

export default QuizList