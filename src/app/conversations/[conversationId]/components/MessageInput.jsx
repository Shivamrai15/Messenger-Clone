"use client";

const MessageInput = ({
    id, register, errors, required, placeholder, type
}) => {
    return (
        <div className="w-full relative">
            <input
               type={type}
               id = {id}
               placeholder={placeholder}
               autoComplete={id}
               {...register(id, { required })} 
               className="
                    text-black
                    font-normal
                    py-2
                    px-3
                    bg-neutral-100
                    w-full
                    rounded-full
                    focus:outline-none
               "
            />
        </div>
    )
}

export default MessageInput