"use client"

import { Button } from '@/components/ui/button'
import { Download, SaveIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema } from '@/app/lib/schema'
import useFetch from '@/hooks/useFetch'
import { saveResume } from '@/actions/resume'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EntryForm } from './entry-form'




function ResumeBuilder({initialContent}) {

    const [activeTab, setactiveTab] = useState("edit")


 const { register, handleSubmit, formState: { errors }, watch, control } = useForm({
        resolver : zodResolver(resumeSchema),
        defaultValues : {
            contactInfo : {},
            summary : "",
            skills : "",
            experience : [],
            education : [],
            projects : [],
        }
    })

const {
    loading : isSaving, 
    fn : saveResumeFn,
    data : saveResult,
    error : saveError
} = useFetch(saveResume)

const formValues = watch()
useEffect(() => {
  if(initialContent) {
setactiveTab("preview")

  }


}, [initialContent])

const onSubmit = async (data) => {}


  return (
    <div className='space-y-4'>
    
    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
    <h1 className="font-bold gradient-title text-5xl md:text-6xl">
      Resume Builder
    </h1>
    <div className='space-x-2'>
    <Button variant='destructive'>
    <SaveIcon className='h-4 w-4'/>
    Save
    </Button>

    <Button >
    <Download />
    Download PDF
    </Button>

    </div>
    </div>
    
    <Tabs value={activeTab} onValueChange={setactiveTab}>
    <TabsList>
      <TabsTrigger value="edit">Form</TabsTrigger>
      <TabsTrigger value="preview">Markdown</TabsTrigger>
    </TabsList>
    <TabsContent value="edit">
    <form className='space-y-8' onSubmit={handleSubmit(onSubmit)} >
    
    
    <div className='space-y-6'>
    
    
    
    <h3 className='text-lg font-medium'>
    Contact Information
    </h3>


    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50'>

    <div className='space-y-2'>
    <label className='text-sm font-medium' >Email</label>
    <Input type="email" placeholder="your@gmail.com" error={errors?.contactInfo?.email} {...register("contactInfo.email")} />

    {
    errors?.contactInfo?.email && (
    <p className="text-sm text-red-500"  >
    {errors?.contactInfo?.email?.message}
    </p>
    )
    }
    </div>




<div className='space-y-2'>
<label className='text-sm font-medium' >Mobile Number</label>
<Input type="tel" placeholder="+1 234 567 8900"  {...register("contactInfo.mobile")} />

{
errors?.contactInfo?.mobile && (
<p className="text-sm text-red-500"  >
{errors?.contactInfo?.mobile?.message}
</p>
)
}
</div>



<div className='space-y-2'>
<label className='text-sm font-medium' >Linkedin</label>
<Input type="url" placeholder="http://linkedin.com/in/your-profile" error={errors?.contactInfo?.linkedin} {...register("contactInfo.linkedin")} />

{
errors?.contactInfo?.linkedin && (
<p className="text-sm text-red-500"  >
{errors?.contactInfo?.linkedin?.message}
</p>
)
}
</div>
 


<div className='space-y-2'>
<label className='text-sm font-medium' >Twitter/X profile</label>
<Input type="email" placeholder="http://linkedin.com/in/your-handle" error={errors?.contactInfo?.twitter} {...register("contactInfo.twitter")} />

{
errors?.contactInfo?.email && (
<p className="text-sm text-red-500"  >
{errors?.contactInfo?.twitter?.message}
</p>
)
}
</div>
    
    </div>
    
    </div>
    
    <div className='space-y-4'>
    <h3 className='text-lg font-medium'>
    Professional Summary
    </h3>
    <Controller name='summary' control={control} render={({field}) => (
        <Textarea placeholder='Write a short summary about yourself' className='h-32' {...field}  error={errors.summary}/>
    )}  />
    {
        errors.summary && (
            <p className='text-sm text-red-500'> {errors.summary.message}</p>
        )
    }
    </div>
    

       
    <div className='space-y-4'>
    <h3 className='text-lg font-medium'>
    Skills
    </h3>
    <Controller name='skills' control={control} render={({field}) => (
        <Textarea placeholder='List your key skills' className='h-32' {...field}  error={errors.skills}/>
    )}  />
    {
        errors.skills && (
            <p className='text-sm text-red-500'> {errors.skills.message}</p>
        )
    }
    </div>
    
    

       
    <div className='space-y-4'>
    <h3 className='text-lg font-medium'>
    Work Experience
    </h3>
    <Controller name='experience' control={control} render={({field}) => (

        <EntryForm type='Experience' entries={field.value} onChange={field.onChange} />
    )}  />
    {
        errors.experience && (
            <p className='text-sm text-red-500'> {errors.experience.message}</p>
        )
    }
    </div>



       
    <div className='space-y-4'>
    <h3 className='text-lg font-medium'>
    Education
    </h3>
    <Controller name='education' control={control} render={({field}) => (
        <EntryForm type='education' entries={field.value} onChange={field.onChange} />

    )}  />
    {
        errors.education && (
            <p className='text-sm text-red-500'> {errors.education.message}</p>
        )
    }
    </div>



       
    <div className='space-y-4'>
    <h3 className='text-lg font-medium'>
    Projects
    </h3>
    <Controller name='projects' control={control} render={({field}) => (
        <EntryForm type='projects' entries={field.value} onChange={field.onChange} />

    )}  />
    {
        errors.projects && (
            <p className='text-sm text-red-500'> {errors.projects.message}</p>
        )
    }
    </div>
    
    </form>
    
    
    
    
    </TabsContent>
    <TabsContent value="preview">Change your password here.</TabsContent>
  </Tabs>
  

    </div>
  )
}

export default ResumeBuilder