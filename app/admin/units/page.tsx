import React from 'react'
import UnitsForm from './_components/unit-form'
import db from '@/db/drizzle'
import AllUnit from './_components/all-unit'
import { Separator } from '@/components/ui/separator'

const UnitsPage = async () => {
    const courses = await db.query.courses.findMany()
    const units = await db.query.units.findMany()
    return (
        <div className='h-full w-full space-y-2'>
            <div>
                <div className="flex items-center justify-between px-4 pb-2">
                    <div />
                    <UnitsForm
                        courses={courses}
                    />
                </div>
                <Separator />
            </div>
            <AllUnit
                courses={courses}
                units={units}
            />
        </div>
    )
}

export default UnitsPage