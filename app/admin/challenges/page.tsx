import React from 'react'
import ChallengeForm from './_components/challenges-form'
import db from '@/db/drizzle'
import AllChallenge from './_components/all-challenge'
import { Separator } from '@/components/ui/separator'

const ChallengesPage = async () => {
    const lessons = await db.query.lessons.findMany()
    const challenges = await db.query.challenges.findMany()
    const courses = await db.query.courses.findMany()
    const units = await db.query.units.findMany()
    return (
        <div className='h-full w-full space-y-2'>
            <div>
                <div className="flex items-center justify-between px-4 pb-2">
                    <div />
                    <ChallengeForm
                        lessons={lessons}
                    />
                </div>
                <Separator />
            </div>

            <AllChallenge
                challenges={challenges}
                lessons={lessons}
                courses={courses}
                units={units}
            />
        </div>
    )
}

export default ChallengesPage