import React from 'react'
import { BooleanInput, Create, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin'

const ChallengeOptionCreate = () => {
  return (
    <Create className='flex items-center justify-center'>

      <h1 className='font-bold text-muted-foreground text-xl lg:text-3xl text-center '>Create Challenges Options</h1>
      <p className='text-xs text-muted-foreground text-center'>Give options for your challenges.</p>

      <SimpleForm
        className='p-8 rounded-lg bg-transparent backdrop-blur-3xl shadow-md '
      >
        <div className='mb-4 h-full w-full lg:w-[400px] mx-auto'>
          <TextInput
            source="text"
            validate={[required()]}
            fullWidth
            variant="standard"
            label="Text"
            className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-300 '
          />
        </div>

        <div className='mb-4 h-full w-full lg:w-[400px] mx-auto'>
          <BooleanInput
            source='correct'
            label="Correct option"
          />
        </div>
        <div className='mb-4 h-full w-full lg:w-[400px] mx-auto'>
          <ReferenceInput
            source='challengeId'
            reference='challenges'
            className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-300 '
          />
        </div>
        <div className='mb-4 h-full w-full lg:w-[400px] mx-auto'>
          <TextInput
            source='imageSrc'
            fullWidth
            label="Image URL"
            variant="standard"
            className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-300 '
          />
        </div>
        <div className='mb-4 h-full w-full lg:w-[400px] mx-auto'>
          <TextInput
            source='audioSrc'
            fullWidth
            label="Audio URL"
            variant="standard"
            className='mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-300 '
          />
        </div>

      </SimpleForm>
    </Create >
  )
}

export default ChallengeOptionCreate