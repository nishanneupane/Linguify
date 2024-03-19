import { getCourses, getUserProgress } from '@/db/queries'
import React from 'react'
import List from './_components/list'

const CoursesPage = async () => {
    const coursesData = getCourses()
    const userProgressData = getUserProgress()

    const [courses, userProgress] = await Promise.all([
        coursesData,
        userProgressData
    ])
    return (
        <div className='h-full max-w-[912px] px-3 mx-auto'>
            <h1 className="text-2xl font-bold text-neutral-700">
                Language Courses
            </h1>
            {
                (courses.length <= 0) ? (
                    <div className='text-muted-foreground text-sm h-full w-full flex items-center justify-center'>
                        No courses found
                    </div>
                ) : (
                    <List
                        courses={courses}
                        activeCourseId={userProgress?.activeCourseId}
                    />
                )
            }
        </div>
    )
}

export default CoursesPage