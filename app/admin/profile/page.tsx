import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const ProfilePage = () => {
    return (
        <div className="max-h-[90%] max-w-[90%] m-auto">
            <UserProfile
                appearance={{
                    variables: {

                    },
                    elements: {
                        card: {
                            boxShadow: "none",
                            border: "1px solid gray"
                        }
                    }
                }}
            />
        </div>
    )
}

export default ProfilePage