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
import { lessons, units } from '@/db/schema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'

type Props = {
    units: typeof units.$inferSelect[]
    lessons?: typeof lessons.$inferSelect
    method?: "edit" | "create"
}
const formSchema = z.object({
    title: z.string().min(1, { message: "title is required" }),
    unitId: z.string(),
    order: z.string()
})
const LessonForm = ({ lessons, method, units }: Props) => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: lessons?.title || "",
            unitId: (lessons?.unitId)?.toString() || undefined,
            order: (lessons?.order)?.toString() || "0"
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (method === "edit") {
                await axios.put(`/api/lessons/${lessons?.id}`, values).then(() => {
                    toast.success("Lesson Updated successfully")
                    router.refresh()
                })
            } else {
                await axios.post("/api/lessons", values).then(() => {
                    toast.success("Lesson created successfully")
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
                                Create Lesson
                            </Button>
                        )}
                    </DialogTitle>
                </DialogHeader>
            </DialogTrigger>
            <DialogContent className='rounded-md space-y-2 overflow-y-auto'>
                <div className="flex items-center justify-center flex-col">
                    <h1 className='flex items-center justify-center text-lg lg:text-2xl font-bold text-neutral-600'>Lesson Form</h1>
                    <p className='flex items-center justify-center text-xs lg:text-sm text-muted-foreground'>Build a professional Lesson Form</p>
                </div>
                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Title</FormLabel>
                                    <FormControl>

                                        <Input placeholder='Give title for Lesson' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='unitId'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Units</FormLabel>
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
                                                <ScrollArea>
                                                    {units.map((unit: any) => (
                                                        <SelectItem key={unit.id} value={(unit.id).toString()}>
                                                            {unit.title}
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

export default LessonForm