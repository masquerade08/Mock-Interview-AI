"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({ params }) {

    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        console.log(params.interviewId)
        GetInterviewDetails();
    }, [params.interviewId]);

    /**
     * Used to Get Interview Details by MockId/Interview Id
     */
    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));
            if (result.length > 0) {
                setInterviewData(result[0]);
            } else {
                console.error('No data found for the provided interviewId:', params.interviewId);
            }
        } catch (error) {
            console.error('Error fetching interview details:', error);
        }
    }

    if (!interviewData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='my-4 '>
            <h2 className='font-bold text-2xl text-primary'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                <div className='flex flex-col my-5 gap-5 '>
                    <div className='flex flex-col p-2 rounded-lg border gap-5'>
                        <h2 className='text-lg'><strong>Job Role/Job Position:</strong> {interviewData.jobPosition}</h2>
                        <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}</h2>
                        <h2 className='text-lg'><strong>Year of Experience:</strong> {interviewData.jobExperience}</h2>
                    </div>
                    <div className='p-3 border rounded-lg border-yellow-500 bg-yellow-200'>
                        <h2 className='flex gap-1 items-center text-yellow-800'><Lightbulb /><strong>Information</strong></h2>
                        <h2 className='mt-3 text-yellow-800'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>
                <div className='flex flex-col  gap-5 '>
                    {webCamEnabled ? <Webcam
                        onUserMedia={() => setWebCamEnabled(true)}
                        onUserMediaError={() => setWebCamEnabled(false)}
                        mirrored={true}
                        style={{
                            height: 300,
                            width: 300
                        }}
                    /> :
                        <>
                            <WebcamIcon className='h-72 w-full p-16 mt-5 bg-secondary rounded-lg border' />
                            <Button variant="ghost" className='w-full' onClick={() => setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
                        </>
                    }
                </div>
            </div>
            <div className='flex justify-end items-end'>
                <Link href={'/dashboard/interview/' + params.interviewId + '/start'} >
                    <Button >Start Interview</Button>
                </Link>
            </div>



        </div>
    )
}

export default Interview;
