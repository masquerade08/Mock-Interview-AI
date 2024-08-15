"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderPinwheel } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/utils/db'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDailog, setOpenDailog] = useState(false)
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExp, setJobExp] = useState();
    const [loading, setloading] = useState(false);
    const [jsonResp, setjsonResp] = useState([]);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        setloading(true);
        e.preventDefault()
        console.log(jobPosition, jobDesc, jobExp);

        const InputPrompt = "Job Position: " + jobPosition + " , Job description: " + jobDesc + ", year of experience:" + jobExp + " ,Depend on this information give me " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + " interview questions with Answered in Json format, Give question and answers as field in Json"

        const result = await chatSession.sendMessage(InputPrompt);
        const Mockjsonresp = (result.response.text()).replace('```json', '').replace('```', '')

        console.log(JSON.parse(Mockjsonresp));
        setjsonResp(Mockjsonresp);

        if (Mockjsonresp) {

            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: Mockjsonresp,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExp,
                    createdBy: user?.primaryEmailAddress.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy')
                }).returning({ mockId: MockInterview.mockId });
            console.log("Inserted ID:", resp)
            if (resp) {
                setOpenDailog(false);
                router.push('/dashboard/interview/' + resp[0]?.mockId)
            }
        }
        else {
            console.log("Error");
        }
        setloading(false);
    }
    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary
        hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDailog(true)}>
                <h2 className=' text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDailog}>

                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job Interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    {/* <h2 className='font-bold text-2xl'></h2> */}
                                    <h2>Add Details about your job position/role, Job description and years of experience</h2>

                                    <div className='mt-7 my-3'>
                                        <label className='my-2'>Job Role/Job Position</label>
                                        <Input placeholder="Ex.- Full Stack Developer " required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className='mt-3 '>
                                        <label className='my-2'>Job Description/Tech Stack (In Short)</label>
                                        <Textarea placeholder="Ex.- React, Angular, Node.js, MySQL etc " required
                                            onChange={(event) => setJobDesc(event.target.value)}
                                        />
                                    </div>
                                    <div className='mt-3'>
                                        <label className='my-2'>Year of experience</label>
                                        <Input placeholder="Ex.-3 " type="number" max="40" required
                                            onChange={(event) => setJobExp(event.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='flex gap-5 justify-end mt-2'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDailog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ?
                                            <>
                                                <LoaderPinwheel className='animate-spin' />'Generating From AI'</> : 'Start Interview'}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview