"use client";
import UserBox from "./UserBox";

const UserList = ({items}) => {
    return (
        <aside className="
            fixed
            inset-y-0
            pb-20
            lg:pb-0
            lg:left-20
            lg:w-80
            lg:block
            overflow-y-auto
            border-r
            border-gray-200
            block
            w-full
            left-0
        ">
            <div className="px-5">
                <div className="flex-col">
                    <div className="text-lg font-bold text-purple-700 py-4">
                        Peoples
                    </div>
                </div>
                {items.map((item)=>(
                    <UserBox
                        key = {item.id}
                        data = {item}
                    />
                ))}
            </div>
        </aside>
    )
}

export default UserList;