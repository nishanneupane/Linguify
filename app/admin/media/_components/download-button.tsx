"use client"
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React from 'react'

type Props = {
    url: string
}
const MediaDownloadButton = ({ url }: Props) => {

    const handleDownload = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to download the file');
            }
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', 'linguify');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    }


    return (
        <Button
            variant={"ghost"}
            className='opacity-0 group-hover:opacity-100 absolute top-2 right-2 bg-transparent backdrop-blur-3xl'
            onClick={handleDownload}
        >
            <Download className='h-5 w-5 text-sky-500' />
        </Button>
    )
}

export default MediaDownloadButton