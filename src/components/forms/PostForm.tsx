import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea.tsx";
import {useNavigate} from "react-router-dom";
import {useToast} from "@/components/ui/use-toast.ts";
import {useUserContext} from "@/context/AuthContext.tsx";
import {PostValidation} from "@/lib/validation";
import {Models} from "appwrite";
import {useCreatePost} from "@/lib/react-query/queriesAndMutations.ts";
import FileUploader from "@/components/shared/FileUploader.tsx";
import React from "react";

type PostFromProps = {
    post?: Models.Document;
}



const PostForm = ({ post }: PostFromProps) => {
    const { mutateAsync: createPost, isPending: isLoadingCreate} = useCreatePost();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useUserContext();
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post.location : "",
            tags: post ? post.tags.join(",") : "",
        },
    });

    async function onSubmit(values: z.infer<typeof PostValidation>){
        const newPost = await createPost({
            ...values,
            userId: user.id,
        })

        if(!newPost){
            toast({
                title: 'Please try again!'
            })
        }

        navigate("/");
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"shad-form_label"}>Caption</FormLabel>
                            <FormControl>
                                <Textarea className={"shad-textarea custom-scrollbar"} {...field} />
                            </FormControl>
                            <FormMessage className={"shad-form_message"}/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={post?.imageUrl}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">
                                Add Tags (separated by comma " , ")
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Art, Expression, Learn"
                                    type="text"
                                    className="shad-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 items-center justify-end">
                    <Button type="submit" className={"shad-button_dark_4"}>Cancel</Button>
                    <Button type="submit" className={"shad-button_primary whitespace-nowrap"}>Submit</Button>
                </div>
            </form>
        </Form>
    );
};

export default PostForm;