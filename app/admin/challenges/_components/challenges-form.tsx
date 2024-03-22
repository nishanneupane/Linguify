"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { challenges, lessons } from '@/db/schema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'

type Props = {
    lessons: typeof lessons.$inferSelect[]
    challenges?: {
        id?: number;
        order: number;
        lessonId: number;
        type: "SELECT" | "ASSIST";
        question: string;
    };
    method?: "edit" | "create"
}
const formSchema = z.object({
    question: z.string().min(1, { message: "question is required" }),
    type: z.string(),
    lessonId: z.string(),
    order: z.string()
})
const ChallengeForm = ({ challenges, method, lessons }: Props) => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: challenges?.question || "",
            type: challenges?.type || "",
            lessonId: (challenges?.lessonId)?.toString() || undefined,
            order: (challenges?.order)?.toString() || "0"
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (method === "edit") {
                await axios.put(`/api/challenges/${challenges?.id}`, values).then(() => {
                    toast.success("Challenge Updated successfully")
                    router.refresh()
                })
            } else {
                await axios.post("/api/challenges", values).then(() => {
                    toast.success("Challenge created successfully")
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
                                Create Challenge
                            </Button>
                        )}
                    </DialogTitle>
                </DialogHeader>
            </DialogTrigger>
            <DialogContent className='rounded-md space-y-2 overflow-y-auto'>
                <div className="flex items-center justify-center flex-col">
                    <h1 className='flex items-center justify-center text-lg lg:text-2xl font-bold text-neutral-600'>Challenge Form</h1>
                    <p className='flex items-center justify-center text-xs lg:text-sm text-muted-foreground'>Build a practice challenge platform.</p>
                </div>
                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name='question'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Question</FormLabel>
                                    <FormControl>

                                        <Input placeholder='Give a question' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-between">
                            <FormField
                                control={form.control}
                                name='type'
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel className='font-bold'>Type</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={(value: string) => {
                                                    field.onChange(value)
                                                }}

                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder={"Select a Type"} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value={"SELECT"}>
                                                        SELECT
                                                    </SelectItem>
                                                    <SelectItem value={"ASSIST"}>
                                                        ASSIST
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>


                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='lessonId'
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel className='font-bold'>lessons</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={(value: string) => {
                                                    field.onChange(value)
                                                }}

                                            >

                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder={"Select a Unit"} />
                                                </SelectTrigger>
                                                <SelectContent className='max-h-[250px]'>
                                                    <ScrollArea className='z-[100]'>
                                                        {lessons.map((lesson: any) => (
                                                            <SelectItem key={lesson.id} value={(lesson.id).toString()} >
                                                                {lesson.title}
                                                            </SelectItem>
                                                        ))}
                                                    </ScrollArea>
                                                </SelectContent>

                                            </Select>


                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name='order'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Order</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
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

export default ChallengeForm