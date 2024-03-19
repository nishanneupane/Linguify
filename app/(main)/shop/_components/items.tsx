"use client"
import { refillHearts } from '@/actions/user-progress';
import { Button } from '@/components/ui/button';
import { POINTS_TO_REFILL, TOTAL_FREE_HEARTS } from '@/lib/constants';
import Image from 'next/image';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}
const Items = ({ hasActiveSubscription, hearts, points }: Props) => {
    const [pending, startTransition] = useTransition()
    const onRefillHearts = () => {
        if (pending || hearts === TOTAL_FREE_HEARTS || points < POINTS_TO_REFILL) {
            return
        }
        startTransition(() => {
            refillHearts()
                .catch(() => toast.error("Something went wrong"))
        })
    }

    return (
        <ul className='w-full'>
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image
                    src={"/heart.svg"}
                    alt='Heart'
                    height={60}
                    width={60}
                />
                <div className="flex-1">
                    <p className='text-neutral-700 text-base lg:text-xl font-bold'>Refill hearts</p>
                </div>
                <Button
                    onClick={onRefillHearts}
                    disabled={(hearts === TOTAL_FREE_HEARTS) || (points < POINTS_TO_REFILL) || (pending)}
                >
                    {
                        hearts === TOTAL_FREE_HEARTS ? "Full" : (
                            <div className="flex items-center">
                                <Image
                                    src={"/points.svg"}
                                    alt='Point'
                                    height={20}
                                    width={20}
                                />
                                <p>
                                    {POINTS_TO_REFILL}
                                </p>
                            </div>
                        )
                    }
                </Button>
            </div>
        </ul>
    )
}

export default Items