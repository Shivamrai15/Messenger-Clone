'use client';
import Image from "next/image";

const AvatarGroup = ({users}) => {

    const sliceUsers = users.slice(0, 3);
    const positionMap = {
        0 : 'top-0 left-[12px]',
        1 : 'bottom-0',
        2 : 'bottom-0 right-0'
    }
    return (
        <div className="
            relative
            h-10
            w-10
        ">
            {sliceUsers.map((user, index)=>(
                <div
                    key = {user.id}
                    className={`
                        absolute
                        inline-block
                        rounded-full
                        overflow-hidden
                        h-[21px]
                        w-[21px]
                        bg-gray-400
                        ${positionMap[index]}
                    `}
                >
                    <Image
                        alt="avatar"
                        fill
                        src={user?.image||'/images/placeholder.png'}
                    />
                </div>
            ))}
        </div>
    )
}

export default AvatarGroup;