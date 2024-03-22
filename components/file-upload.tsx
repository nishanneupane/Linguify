"use client"
import { FileAudioIcon, FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { UploadDropzone } from '@/lib/uploadthing'

type Props = {
    apiEndpoint: "challengeOptionImage" | "courseImage" | "challengeOptionAudio" | "media",
    onChange: (url?: string) => void
    value?: string
}
const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
    const type = value?.split('.').pop()
    if (value) {
        return (
            <div className='flex flex-col justify-center items-center '>
                {
                    (type === "mp3" || type === "mp4" || type === "wav") ? (
                        <div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10 w-full bg-sky-50'>
                            <FileAudioIcon />
                            <a href={value} target="_blank" rel='noopener_noreferrer' className='ml-2 text-sm text-sky-500 dark:text-sky-400 hover:underline'>
                                See Music
                            </a>
                            <X
                                onClick={() => onChange('')}
                                className='absolute text-rose-500 dark:[text-rose-400] h-5 w-5 backdrop-blur-2xl top-2 right-2 rounded-full p-0 cursor-pointer' />
                        </div>
                    ) : (
                        type === "pdf" ? (
                            <div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10 w-full bg-sky-50'>
                                <FileIcon />
                                <a href={value} target="_blank" rel='noopener_noreferrer' className='ml-2 text-sm text-sky-500 dark:text-sky-400 hover:underline'>
                                    view PDF
                                </a>
                                <X
                                    onClick={() => onChange('')}
                                    className='absolute text-rose-500 dark:[text-rose-400] h-5 w-5 backdrop-blur-2xl top-2 right-2 rounded-full p-0 cursor-pointer' />
                            </div>
                        ) : (
                            <div className='relative w-40 h-40'>
                                <div>
                                    <Image
                                        src={value}
                                        alt={"avatar"}
                                        fill
                                        className='object-contain Kathmandu rounded-md'
                                    />
                                    <X
                                        onClick={() => onChange('')}
                                        className='absolute text-rose-500 dark:[text-rose-400] h-5 w-5 backdrop-blur-2xl top-2 right-2 rounded-full p-0 cursor-pointer' />
                                </div>
                            </div>
                        )
                    )
                }

            </div>
        )
    }
    return (
        <div className='w-full bg-muted/30'>
            <UploadDropzone
                endpoint={apiEndpoint}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url)
                }}
                onUploadError={(err: Error) => {
                    console.log(err)
                }}
                appearance={{
                    button: {
                        backgroundColor: "#38bdf8",
                        fontWeight: "bold",
                        fontFamily: "fantasy",
                        borderBottom: "2px solid #0284c7",
                        boxShadow: "0px 2px 0px #0284c7",
                    },
                    allowedContent: {
                        color: "#38bdf8"
                    },
                    label: {
                        color: "#38bdf8"
                    }

                }}
            />
        </div>
    )
}

export default FileUpload