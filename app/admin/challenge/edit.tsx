import React from 'react'
import { Edit, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin'

const ChallengeEdit = () => {
    return (
        <Edit className='flex items-center justify-center'>

            <h1 className='font-bold text-muted-foreground text-xl lg:text-3xl text-center '>Edit Challenges</h1>
            <p className='text-xs text-muted-foreground text-center'>Edit your challenges.</p>

            <SimpleForm
                className='p-8 rounded-lg bg-transparent backdrop-blur-3xl shadow-md '
                redirect="list"
            >
                <div className='mb-4 h-full w-full lg:w-[400px] mx-auto'>
                    <TextInput
                        source="question"
                        validate={[required()]}
                        fullWidth
                        variant="standard"
                        label="Question"
                        className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-300 '
                    />
                </div>

                <div className='mb-4 h-full w-full lg:w-[400px] mx-auto'>
                    <SelectInput
                        source='type'
                        choices={[
                            {
                                id: "SELECT",
                                name: "SELECT",
                            },
                            {
                                id: "ASSIST",
                                name: "ASSIST",
                            },
                        ]}
                        validate={[required()]}
                        className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-300 '
                    />
                </div>
                <div className='mb-4 h-full w-full lg:w-[400px] mx-auto'>
                    <ReferenceInput
                        source='lessonId'
                        reference='lessons'
                        className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-300 '
                    />
                </div>
                <div className='mb-4 h-full w-full lg:w-[400px] mx-auto'>
                    <NumberInput
                        source='order'
                        validate={[required()]}
                        fullWidth
                        label="Order"
                        variant="standard"
                        className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-300 '
                    />
                </div>

            </SimpleForm>
        </Edit >
    )
}

export default ChallengeEdit