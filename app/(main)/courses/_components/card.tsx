import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

type Props = {
    id: number;
    title: string;
    imageSrc: string;
    onClick: (id:number) => void;
    disabled?: boolean;
    active?: boolean;
}
const Card = ({ id, imageSrc, onClick, title, active, disabled }: Props) => {
    return (
        <div
            onClick={() => onClick(id)}
            className={
                cn("h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] w-[180px] lg:w-[200px]",
                    disabled && "pointer-events-none opacity-50")
            }
        >
            <div className="min-h-[24px] w-full flex items-center justify-end">
                {
                    active && (
                        <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
                            <CheckIcon className='h-4 w-4 text-white stroke-[4]' />
                        </div>
                    )
                }
            </div>

            <Image
                src={imageSrc}
                width={93.33}
                height={70}
                alt={title}
                className='rounded-lg drop-shadow-md border object-cover'
            />
            <p className="text-neutral-700 text-center font-bold mt-3">{title}</p>
        </div>
    )
}

export default Card