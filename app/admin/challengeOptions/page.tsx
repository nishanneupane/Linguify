import React from 'react'
import ChallengeOptionSForm from './_components/challenges-form'
import db from '@/db/drizzle'
import AllChallengeOptions from './_components/all-challenge-options'
import { Separator } from '@/components/ui/separator'

const ChallengeOptionsPage = async () => {
    const challenges = await db.query.challenges.findMany()
    const lessons = await db.query.lessons.findMany()
    const units = await db.query.units.findMany()
    const courses = await db.query.courses.findMany()
    const challengeOptions = await db.query.challengeOptions.findMany()
    return (
        <div className='h-full w-full space-y-2'>
            <div>
                <div className="flex items-center justify-between px-4 pb-2">
                    <div />
                    <ChallengeOptionSForm
                        challenges={challenges}
                    />
                </div>
                <Separator />
            </div>


            <AllChallengeOptions
                challenges={challenges}
                lessons={lessons}
                units={units}
                challengeOptions={challengeOptions}
                courses={courses}
            />
        </div>
    )
}

export default ChallengeOptionsPage