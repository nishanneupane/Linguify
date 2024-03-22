import React from 'react'
import MediaForm from './_components/media-form'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import db from '@/db/drizzle'
import Image from 'next/image'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { eq } from 'drizzle-orm'
import { media } from '@/db/schema'
import MediaDownloadButton from './_components/download-button'

const MediaPage = async () => {
    const { userId } = await auth()
    if (!userId) {
        redirect("/sign-in")
    }
    const mediaItems = await db.query.media.findMany({
        where: eq(media.userId, userId)
    })


    return (
        <div className='h-full w-full space-y-2'>

            <>
                <div>
                    <div className="flex items-center justify-between px-4 pb-2">
                        <div />
                        <MediaForm
                        />
                    </div>
                    <Separator />
                </div>


                {
                    mediaItems.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            No media found
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-4 px-3">
                            {
                                mediaItems.map((item) => (
                                    <AspectRatio key={item.id} ratio={16 / 9} className='bg-muted shadow-lg border-b-4 active:border-b-2 border-sky-500 rounded-md transition-all duration-200 cursor-pointer hover:opacity-90 group'>
                                        <Image
                                            src={item.image}
                                            alt={"media"}
                                            fill
                                            className='object-contain rounded-md'
                                        />
                                        <MediaDownloadButton url={item.image} />
                                    </AspectRatio>
                                ))
                            }
                        </div>
                    )
                }
            </>



        </div>
    )
}

export default MediaPage