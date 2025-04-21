"use client"
import { entrySchema } from '@/app/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Title } from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

function EntryForm({type, entries, onChange}) {

const [isAdding, setisAdding] = useState(false)

   const {register, handleSubmit : handleValidation, formState : {errors}, reset, watch,  setValue} = useForm({
resolver: zodResolver(entrySchema),
defaultValues : {

    title : "",
    organization : "",
    startDate : "",
    endData: "",
    description : "",
    current : false,
}

   })

   const current = watch("current")

  return (
    <div>
    {
      isAdding && (
        <Card>
  <CardHeader>
    <CardTitle>Add {type}</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">

  <div className='grid grid-cols-2  gap-4'>
  <div className='space-y-2'>
  <Input
  type="text"
  placeholder="Title/Position"
  {...register("title")}
  error={errors.title}
  />
  {

    errors.title && (
      <p className='text-red-500 text-sm'>{errors.title.message}</p>

    )
  }
  </div>
  
  <div className='space-y-2'>
  <Input
  placeholder="Organization/Company"
  {...register("organization")}
  error={errors.organization}
  />
  {

    errors.organization && (
      <p className='text-red-500 text-sm'>{errors.organization.message}</p>

    )
  }
  </div>

  
  </div>
  <div className='grid grid-cols-2 gap-4'>
  <div className="space-y-2">
  <Input
    type="month"
    {...register("startDate")}
    error={errors.startDate}
  />
  {errors.startDate && (
    <p className="text-sm text-red-500">
      {errors.startDate.message}
    </p>
  )}
</div>
<div className="space-y-2">
  <Input
    type="month"
    {...register("endDate")}
    disabled={current}
    error={errors.endDate}
  />
  {errors.endDate && (
    <p className="text-sm text-red-500">
      {errors.endDate.message}
    </p>
  )}
</div>

  </div>

  <div className='flex items-center space-x-2'>
 <input type="checkbox" {...register("current")} id="current" onChange={(e) => {
  setValue("current", e.target.checked);
  if (e.target.checked) {
    setValue("endDate", "");
  } 
}} />
<label htmlFor='current' >Currently {type}</label>


  
  </div>


  <div className='space-y-2'>
<Textarea
placeholder={`Description of your ${type.toLowerCase()}`}
className="h-32"
{...register("description")}
error={errors.description}
/>
{errors.description && (
  <p className="text-sm text-red-500">
    {errors.description.message}
  </p>
)

}

</div>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
      )
    }




    {
     !isAdding && (
  <Button
  className='w-full'
  variant="outline"
  onClick={() => setisAdding(true)}
  >
  <PlusCircleIcon className='h-4 w-4 mr-2' />
  
  Add {type}</Button>
)
    }
    
    </div>
  )
}

export default EntryForm