import FeedWrapper from '@/components/feed-wrapper'
import StickyWrapper from '@/components/sticky-wrapper'
import React from 'react'
import Header from './_components/header'
import UserProgress from '@/components/user-progress'
import { getUserProgress } from '@/db/queries'
import { redirect } from 'next/navigation'

const LearnPage = async () => {
    const userProgressData = getUserProgress()
    const [userProgress] = await Promise.all([
        userProgressData
    ])

    if (!userProgress || !userProgress.activeCourse) {
        return redirect("/courses")
    }
    return (
        <div className='flex gap-[48px] px-6'>
            <FeedWrapper>
                <Header
                    title="Spanish"
                />

            </FeedWrapper>
            <StickyWrapper>
                <UserProgress
                    activeCourse={{ title: "Spanish", imageSrc: "/es.svg" }}
                    hearts={5}
                    points={100}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>

        </div>
    )
}

export default LearnPage