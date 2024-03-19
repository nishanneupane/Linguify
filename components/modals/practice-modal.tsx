"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import Image from 'next/image'
import { Button } from '../ui/button'
import { usePracticeModal } from '@/store/use-practice-modal'

const PracticeModal = () => {
    const [isClient, setIsClient] = useState(false)
    const { close, isOpen } = usePracticeModal()

    useEffect(() => setIsClient(true), [])

    if (!isClient) {
        return null
    }
    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex items-center w-full justify-center mb-5'>
                        <Image
                            src={"/heart.svg"}
                            alt='Heart'
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className='text-center font-bold text-2xl'>
                        Practice lesson
                    </DialogTitle>
                    <DialogDescription className='text-center text-base'>
                        Use practice lessons to regain hearts and points . You wont loose hearts or points in practice lessons
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>

                        <Button
                            variant={"primary"}
                            className='w-full'
                            size={"lg"}
                            onClick={close}
                        >
                            I Understand
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PracticeModal