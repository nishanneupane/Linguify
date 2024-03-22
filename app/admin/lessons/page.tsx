import db from '@/db/drizzle'
import React from 'react'
import LessonForm from './_components/lesson-form'
import AllLesson from './_components/all-lesson'
import { Separator } from '@/components/ui/separator'

const LessonsPage = async () => {
    const units = await db.query.units.findMany()
    const lessons = await db.query.lessons.findMany()
    const courses = await db.query.courses.findMany()
    return (
        <div className='h-full w-full space-y-2'>
            <div>
                <div className="flex items-center justify-between px-4 pb-2">
                    <div />
                    <LessonForm
                        units={units}
                    />
                </div>
                <Separator />
            </div>
            <AllLesson
                units={units}
                lessons={lessons}
                courses={courses}
            />
        </div>
    )
}

export default LessonsPage