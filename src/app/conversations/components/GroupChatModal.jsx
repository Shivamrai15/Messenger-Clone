'use client';

import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "@/app/components/inputs/Select";
import Button from "@/app/components/Button";

const GroupChatModal = ({isOpen, onClose, users}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState : {
            errors
        }
    } = useForm({
        defaultValues : {
            name : '',
            members : []
        }
    });

    const members = watch('members');

    const onSubmit = (data)=>{
        setIsLoading(true);
        axios.post('/api/conversations', {
            ...data,
            isGroup : true
        })
        .then(()=>{
            router.refresh();
            onClose();
        })
        .catch(()=>toast.error("Something went wrong"))
        .finally(()=>setIsLoading(false));
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2
                            className="
                                text-base
                                font-semibold
                                leading-7
                                text-gray-900
                            "
                        >
                            Create a Group Chat
                        </h2>
                        <p
                            className="
                                mt-1
                                text-sm
                                leading-6
                                text-gray-600
                            "
                        >
                            Create a chat with more than 2 people.
                        </p>
                        <div
                            className="
                                mt-10
                                flex
                                flex-col
                                gap-y-8
                            "
                        >
                            <Input
                                register={register}
                                label="Group Name"
                                id="name"
                                disabled={isLoading}
                                required
                                errors={errors}
                            />
                            <Select
                                disabled = {isLoading}
                                label = "Members"
                                id = 'members'
                                options = {users.map((user)=>({
                                    value : user.id,
                                    label : user.name,
                                }))}
                                onChange = {(value)=>{setValue('members', value, {
                                    shouldValidate : true
                                })}}
                                value = {members}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="
                        mt-6
                        flex
                        items-center
                        justify-end
                        gap-x-6
                    "
                >
                    <Button
                        disabled={isLoading}
                        type = "button"
                        onClick={onClose}
                        secondary
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        type = "submit"
                    >
                        Create Group
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default GroupChatModal;