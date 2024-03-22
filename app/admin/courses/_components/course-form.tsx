"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FileUpload from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { courses } from '@/db/schema'

type Props = {
    courses?: typeof courses.$inferSelect
    method?: "edit" | "create"
}
const formSchema = z.object({
    title: z.string().min(1, { message: "title is required" }),
    imageSrc: z.string().min(1, { message: "Image is required" }),
})
const CoursesForm = ({ courses, method }: Props) => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: courses?.title || "",
            imageSrc: courses?.imageSrc || ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (method === "edit") {
                await axios.put(`/api/courses/${courses?.id}`, values).then(() => {
                    toast.success("Course Updated successfully")
                    router.refresh()
                })
            } else {
                await axios.post("/api/courses", values).then(() => {
                    toast.success("Course created successfully")
                    router.refresh()
                })
            }
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
                        {method === "edit" ? (
                            <p className="text-base bg-green-100 cursor-pointer ps-2 py-1.5 font-normal">Edit</p>
                        ) : (
                            <Button
                                variant={"primary"}
                            >
                                Create Course
                            </Button>
                        )}
                    </DialogTitle>
                </DialogHeader>
            </DialogTrigger>
            <DialogContent className='rounded-md space-y-2 overflow-y-auto'>
                <div className="flex items-center justify-center flex-col">
                    <h1 className='flex items-center justify-center text-lg lg:text-2xl font-bold text-neutral-600'>Course Form</h1>
                    <p className='flex items-center justify-center text-xs lg:text-sm text-muted-foreground'>create language course for different countries.</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Title</FormLabel>
                                    <FormDescription>Please give a appropriate country name for your course</FormDescription>
                                    <FormControl>

                                        <Input placeholder='Give a course title' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='imageSrc'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Image</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            apiEndpoint='courseImage'
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
                                {
                                    method === "edit" ? "Edit" : "Create"
                                }
                            </Button>

                        </DialogFooter>

                    </form>
                </Form>
            </DialogContent>

        </Dialog>
    )
}

export default CoursesForm