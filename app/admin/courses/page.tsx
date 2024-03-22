import React from 'react'
import CoursesForm from './_components/course-form'
import AllCourse from './_components/all-course'
import db from '@/db/drizzle'
import { Separator } from '@/components/ui/separator'


const CoursesPage = async () => {
    const courses = await db.query.courses.findMany()

    return (
        <div className='h-full w-full space-y-2'>
            <div>
                <div className="flex items-center justify-between px-4 pb-2">
                    <div />
                    <CoursesForm />
                </div>
                <Separator/>
            </div>
            <AllCourse
                courses={courses}
            />
        </div>
    )
}

export default CoursesPage