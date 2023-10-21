'use client'

import Modal from "@/app/components/Modal";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { HiDownload } from 'react-icons/hi'

const ImageModal = ({
    src, isOpen, onClose
}) => {

    const handleDownlaod = async()=>{
        try {

            const response = await axios.get(src, {
                responseType : 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'messenger-image.jpg';
            document.body.append(a);
            a.click();
            window.URL.revokeObjectURL(url);
            
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-80 h-80">
                <div className="h-full w-full">
                    <Image
                        src={src}
                        alt = "Image"
                        className="object-cover"
                        fill
                    />
                </div>
                <div 
                    onClick={handleDownlaod}
                    className="
                        absolute
                        flex
                        justify-center
                        items-center
                        z-[60]
                        h-8
                        w-8
                        bg-neutral-600
                        right-5
                        bottom-5
                        bg-opacity-40
                        rounded-lg
                        lg:cursor-pointer
                        lg:hover:scale-110
                        transition-all
                        duration-300
                    "
                >
                    <HiDownload className="text-white" size={20} />
                </div>
            </div>
        </Modal>
    )
}

export default ImageModal;