"use client";
import React, { useEffect, useState } from "react";
import { onboardingSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { updateUser } from '@/actions/user';
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function OnBoardingForm({ industries }) {
  const [selectedIndustry, setselectedIndustry] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });


  
  
  const watchIndustry = watch("industry");
  useEffect(() => {
    console.log(industries);
    console.log(selectedIndustry);
  }, [selectedIndustry, setValue]);

  const onSubmit = async (values) => {

    try {
        const formatIndustry = `${values.industry} -${values.subIndustry.toLowerCase().replace(/ /g, "_" )}`
console.log(updateUserfn, "updateUserfn")
        await updateUserfn({
            ...values, industry : formatIndustry
        })
    } catch (error) {
        console.log(error)
    }
  };

     const {loading : updateLoading, fn : updateUserfn, data : updateResult} =  useFetch(updateUser)

     useEffect(() => {
    
  if(updateResult?.sucess && !updateLoading) {
console.log(updateResult, "updateResult")
console.log(updateLoading, "updateResult2")
toast.success('Profile Updated Sucessfully')
router.push("/dashboard")
  }

     }, [updateLoading,  updateResult])

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className=" space-y-3 ">
              <Label htmlFor="industry">Industries</Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setselectedIndustry(
                    industries.find((ind) => ind.id === value)
                  );
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Industries</SelectLabel>
                    {industries.map((ind) => (
                      <SelectItem key={ind.id} value={ind.id}>
                        {ind.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Specialization</Label>
                <Select
                  onValueChange={(value) => setValue("subIndustry", value)}
                >
                  <SelectTrigger id="subIndustry">
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Specializations</SelectLabel>
                      {selectedIndustry?.subIndustries.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}
            <div className="space-y-2">
<Label htmlFor="subIndustry">Years of Experience</Label>

<Input {...register("experience")} id ='experience' type='number' min='0' max='50' placeholder='Enter years of experience' />

{errors.experience && (
  <p className="text-sm text-red-500">
    {errors.experience.message}
  </p>
)}
</div>


<div className="space-y-2">
<Label htmlFor="subIndustry">Skills</Label>

<Input {...register("skills")} id ='skills' placeholder='e.g. Python, JavaScript , Golang' />
<p className="text-sm text-muted-foreground"> Separate multiple skills with commas</p>
{errors.experience && (
  <p className="text-sm text-red-500">
    {errors.experience.message}
  </p>
)}
</div>


<div className="space-y-2">
<Label htmlFor="subIbiondustry">Professional Bio</Label>

<Textarea className='h-32' {...register("bio")} id ='bio' placeholder='Tell us about your professional background...' />
{errors.bio && (
  <p className="text-sm text-red-500">
    {errors.bio.message}
  </p>
)}
</div>

<Button type="submit" className="w-full" disabled={updateLoading}>
{updateLoading ? (
  <>
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    Saving...
  </>
) : (
  "Complete Profile"
)}
</Button>          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default OnBoardingForm;
