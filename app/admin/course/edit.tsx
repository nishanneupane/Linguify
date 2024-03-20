import React from 'react'
import { Edit, required, SimpleForm, TextInput } from 'react-admin'

const CourseEdit = () => {
    return (
        <Edit className='flex items-center justify-center'>
            
            <h1 className='font-bold text-muted-foreground text-xl lg:text-3xl text-center'>Edit Course</h1>
            <p className='text-xs text-muted-foreground text-center'>Edit your course.</p>

            <SimpleForm
                className='p-8 rounded-lg bg-transparent backdrop-blur-3xl shadow-md '
                redirect="list"
            >
                <div className='mb-4 h-full w-full lg:w-[400px] mx-auto'>
                    <TextInput
                        source="id"
                        validate={[required()]}
                        fullWidth
                        label="Id"
                        variant="standard"
                        className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-300 '
                    />
                </div>
                <div className='mb-4 h-full w-full lg:w-[400px] mx-auto'>
                    <TextInput
                        source="title"
                        validate={[required()]}
                        fullWidth
                        label="Title"
                        variant="standard"
                        className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-300 '
                    />
                </div>
                <div className='mb-4 h-full w-full lg:w-[400px] mx-auto'>
                    <TextInput
                        source="imageSrc"
                        validate={[required()]}
                        fullWidth
                        label="Image"
                        variant="standard"
                        className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-300 '
                    />
                </div>


            </SimpleForm>
        </Edit>
    )
}

export default CourseEdit