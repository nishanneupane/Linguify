"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import Image from 'next/image'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import { useDeleteLesson } from '@/store/use-delete-lesson-modal'

const DeleteLessonModal = () => {
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const { close, isOpen, id } = useDeleteLesson()

    useEffect(() => setIsClient(true), [])

    const onDelete = async () => {
        try {
            await axios.delete(`/api/lessons/${id}`)
                .then(() => {
                    toast.success("lesson deleted successfully")
                    router.refresh()
                })
        } catch (error) {
            toast.error("Failed to delete the lesson")
        }
    }
    if (!isClient) {
        return null
    }
    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex items-center w-full justify-center mb-5'>
                        <Image
                            src={"/mascot_sad.svg"}
                            alt='Mascot'
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className='text-center font-bold text-2xl'>
                        Are you sure want to delete this lesson?
                    </DialogTitle>
                    <DialogDescription className='text-center text-base'>
                        This action cannot be undone and this will be permanently deleted forever.
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
                            Cancel
                        </Button>
                        <Button
                            variant={"dangerOutline"}
                            className='w-full'
                            size={"lg"}
                            onClick={() => {
                                onDelete()
                                close();

                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteLessonModal