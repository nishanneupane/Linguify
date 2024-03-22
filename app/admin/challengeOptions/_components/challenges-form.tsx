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
import { challengeOptions, challenges, lessons } from '@/db/schema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import FileUpload from '@/components/file-upload'

type Props = {
    challenges?: {
        id?: number;
        order: number;
        lessonId: number;
        type: "SELECT" | "ASSIST";
        question: string;
    }[];
    challengeOption?: typeof challengeOptions.$inferSelect
    method?: "edit" | "create"
}
const formSchema = z.object({
    text: z.string().min(1, { message: "Text is required" }),
    correct: z.boolean(),
    challengeId: z.string(),
    imageSrc: z.string().min(1, { message: "Image is required" }),
    audioSrc: z.string().min(1),
})
const ChallengeOptionSForm = ({ challenges, method, challengeOption }: Props) => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: challengeOption?.text || "",
            correct: challengeOption?.correct ?? false,
            challengeId: (challengeOption?.challengeId)?.toString() || undefined,
            imageSrc: challengeOption?.imageSrc || "",
            audioSrc: challengeOption?.audioSrc || "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (method === "edit") {
                await axios.put(`/api/challengeOptions/${challengeOption?.id}`, values).then(() => {
                    toast.success("Challenge Option Updated successfully")
                    router.refresh()
                })
            } else {
                await axios.post("/api/challengeOptions", values).then(() => {
                    toast.success("Challenge Option created successfully")
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
                                Create Challenge Options
                            </Button>
                        )}
                    </DialogTitle>
                </DialogHeader>
            </DialogTrigger>
            <DialogContent className='rounded-md space-y-2 overflow-y-auto'>
                <div className="flex items-center justify-center flex-col">
                    <h1 className='flex items-center justify-center text-lg lg:text-2xl font-bold text-neutral-600'>Challenge Options Form</h1>
                    <p className='flex items-center justify-center text-xs lg:text-sm text-muted-foreground'>Give options to your challenge.</p>
                </div>
                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3 max-h-[400px] overflow-y-scroll px-3">
                        <FormField
                            control={form.control}
                            name='challengeId'
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel className='font-bold'>Challenges</FormLabel>
                                    <FormControl className='w-full flex-1'>
                                        <Select
                                            value={field.value}
                                            onValueChange={(value: string) => {
                                                field.onChange(value)
                                            }}

                                        >

                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder={"Select a Challenge"} />
                                            </SelectTrigger>
                                            <SelectContent className='max-h-[250px]'>
                                                <ScrollArea className='z-[100]'>
                                                    {challenges && challenges.map((challenge: any) => (
                                                        <SelectItem key={challenge.id} value={(challenge.id).toString()} >
                                                            {challenge.question}
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
                            name='text'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Enter a text</FormLabel>
                                    <FormControl>

                                        <Input placeholder='Enter text here..' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='correct'
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-center justify-between rounded-lg border gap-4 p-4'>
                                    <FormLabel className='font-bold'>Switch if answer is correct</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='audioSrc'
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel className='font-bold'>Audio</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            apiEndpoint='challengeOptionAudio'
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='imageSrc'
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel className='font-bold'>Image</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            apiEndpoint='challengeOptionImage'
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

export default ChallengeOptionSForm