import { Button } from '@/components/ui/button'
import { BatteryWarning } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className="flex items-center flex-col gap-3">
        <BatteryWarning className='h-12 w-12 ml-3 text-rose-500' />
        <p className='font-bold text-neutral-600'>
          Oops! this page is not found
        </p>
        <Link href={"/admin/course"}>
          <Button variant={"primary"}>
            Go Back to Course
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage