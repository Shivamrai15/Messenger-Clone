'use client'
import clsx from "clsx";
import Link from "next/link";

const DesktopItem = ({
    label, icon, href, onClick, active
}) => {

    const handleClick = () => {
        if (onClick){
            return onClick()
        }
    }


    return (
        <li onClick={handleClick}>
            <Link href={href}
                className={clsx(`
                    group
                    flex
                    gap-x-3
                    rounded-md
                    p-3
                    text-sm
                    leading-6
                    font-semibold
                    text-gray-500
                    hover:text-black
                    hover:bg-gray-100
                `, active && 'bg-gray-100 text-black')}
            >
                {icon}
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    )
}

export default DesktopItem;