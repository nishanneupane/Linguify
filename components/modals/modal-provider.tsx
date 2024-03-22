"use client"
import React, { useEffect, useState } from 'react'
import PracticeModal from './practice-modal'
import HeartsModal from './hearts-modal'
import ExitModal from './exit-modal'
import DeleteModal from './delete-modal'
import DeleteUnitModal from './delete-unit-modal'
import DeleteLessonModal from './delete-lesson-modal'
import DeleteChallengeModal from './delete-challenge-modal'
import DeleteChallengeOptionsModal from './delete-challenge-options-modal'

const ModalProvider = () => {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => setIsClient(true), [])

    if (!isClient) {
        return null
    }
    return (
        <>
            <PracticeModal />
            <HeartsModal />
            <ExitModal />
            <DeleteModal />
            <DeleteUnitModal />
            <DeleteLessonModal />
            <DeleteChallengeModal />
            <DeleteChallengeOptionsModal />
        </>
    )
}

export default ModalProvider