import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {

    const textToSpeach = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
        else {
            alert('Sorry, your browser does not support')
        }
    }
    return mockInterviewQuestion && (
        <div className='p-4 border-2 shadow-lg border-teal-600 rounded-lg my-5 '>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
                    <h2 key={index} className={`p-3 border rounded-full
                     text-sm md:text-xs text-center cursor-pointer 
                      ${activeQuestionIndex == index && 'bg-primary text-white font-bold '}`}>Question #{index + 1}
                    </h2>
                ))}
            </div>
            <h2 className='my-5 font-semibold text-sm md:text-md'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
            <Volume2 className='cursor-pointer' onClick={() => textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)} />

            <div className='my-7 rounded-lg p-5 bg-teal-100 mt-8 '>
                <h2 className='flex gap-2 items-center text-primary'>
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
                <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
            </div>
        </div>
    )
}

export default QuestionsSection
