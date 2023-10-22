'use client';

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
import { BsEmojiSmile } from 'react-icons/bs';
import { useState } from "react";
import EmojiDialogue from "./EmojiDialogue";

const Form = () => {

    const { conversationId } = useConversation();
    const [isEmojiDialogueOpen, setEmojiDialogueOpen] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {
            errors
        },
    } = useForm({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit = (data) => {
        setValue('message', '', { shouldValidate: true });
        axios.post("/api/messages", {
            ...data,
            conversationId
        });
    }

    const handleUpload = (result) => {
        axios.post("/api/messages", {
            image: result?.info?.secure_url,
            conversationId
        })
    }

    return (
        <div className="
            py-4
            px-4
            bg-white
            border-t
            flex
            items-center
            gap-2
            lg:gap-4
            w-full
        ">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="f3ytpcsd"
            >
                <HiPhoto size={30} className="text-purple-600" />
            </CldUploadButton>
            {isEmojiDialogueOpen && (
                <EmojiDialogue
                    setValue={setValue}
                    getValues={getValues}
                />
            )}
            <div
                onClick={() => setEmojiDialogueOpen(!isEmojiDialogueOpen)}
                className="
                        hidden
                        w-10
                        h-8
                        rounded-lg
                        lg:flex
                        justify-center
                        items-center
                        hover:bg-neutral-100
                        cursor-pointer
                    "
            >
                <BsEmojiSmile size={20} className="text-purple-700" />
            </div>
            <div onClick={()=>setEmojiDialogueOpen(false)} className="w-full">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center gap-2 lg:gap-4 w-full relative"
                >
                    <MessageInput
                        id="message"
                        type="text"
                        register={register}
                        errors={errors}
                        required
                        placeholder="Write a message"
                    />
                    <button
                        type="submit"
                        className="
                            rounded-full 
                            p-2
                            bg-purple-600
                            hover:bg-purple-700
                            cursor-default
                            lg:cursor-pointer
                            transition
                        "
                    >
                        <HiPaperAirplane size={18}
                            className="text-white"
                        />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Form;