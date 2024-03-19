import FeedWrapper from '@/components/feed-wrapper'
import StickyWrapper from '@/components/sticky-wrapper'
import React from 'react'
import Header from './_components/header'
import UserProgress from '@/components/user-progress'
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from '@/db/queries'
import { redirect } from 'next/navigation'
import Unit from './_components/unit'
import Promo from '@/components/promo'
import Quests from '@/components/quests'

const LearnPage = async () => {
    const userProgressData = getUserProgress()
    const courseProgressData = getCourseProgress()
    const lessonPercentageData = getLessonPercentage()
    const unitsData = await getUnits()
    const userSubscriptionData = getUserSubscription()
    const [userProgress, units, courseProgress, lessonPercentage, userSubscription] = await Promise.all([
        userProgressData,
        unitsData,
        courseProgressData,
        lessonPercentageData,
        userSubscriptionData
    ])

    if (!userProgress || !userProgress.activeCourse) {
        return redirect("/courses")
    }

    if (!courseProgress) {
        return redirect("/course")
    }
    const isPro = !!userSubscription?.isActive
    return (
        <div className='flex gap-[48px] px-6'>
            <FeedWrapper>
                <Header
                    title={userProgress.activeCourse.title}
                />
                {
                    units.map((unit) => (
                        <div className="mb-10" key={unit.id}>
                            <Unit
                                id={unit.id}
                                order={unit.order}
                                description={unit.description}
                                title={unit.title}
                                lessons={unit.lessons}
                                activeLesson={courseProgress.activeLesson}
                                activeLessonPercentage={lessonPercentage}
                            />
                        </div>
                    ))
                }
            </FeedWrapper>
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro}
                />
                {
                    !isPro && (
                        <Promo />
                    )
                }
                <Quests points={userProgress.points} />
            </StickyWrapper>

        </div>
    )
}

export default LearnPage