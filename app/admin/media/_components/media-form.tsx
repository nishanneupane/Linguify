"use client"
import { addMedia } from '@/actions/media'
import FileUpload from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import * as z from 'zod'


const formSchema = z.object({
    image: z.string().min(1, { message: "Image is required" })
})

const MediaForm = () => {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await addMedia(values.image).then(() => {
                toast.success("Media created successfully")
                router.refresh()
            })
        } catch (error) {
            toast.error("Something went wrong ! please try again.")
        }
    }

    const isLoading = form.formState.isSubmitting

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DialogHeader>
                    <DialogTitle className='w-full'>

                        <Button
                            variant={"primary"}
                        >
                            Add Media
                        </Button>

                    </DialogTitle>
                </DialogHeader>
            </DialogTrigger>
            <DialogContent className='rounded-md space-y-2 overflow-y-auto'>
                <div className="flex items-center justify-center flex-col">
                    <h1 className='flex items-center justify-center text-lg lg:text-2xl font-bold text-neutral-600'>Media Form</h1>
                    <p className='flex items-center justify-center text-xs lg:text-sm text-muted-foreground'>Upload your media safely.</p>
                </div>
                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name='image'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Image</FormLabel>
                                    <FormControl>

                                        <FileUpload
                                            apiEndpoint={"media"}
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />





                        <DialogFooter className='flex items-center justify-end gap-3 py-2 flex-row w-full'>
                            <DialogClose asChild>
                                <Button type='button' variant={"danger"}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type='submit' variant={"primary"} disabled={isLoading}>
                                Create
                            </Button>

                        </DialogFooter>

                    </form>
                </Form>
            </DialogContent>

        </Dialog>
    )
}

export default MediaForm