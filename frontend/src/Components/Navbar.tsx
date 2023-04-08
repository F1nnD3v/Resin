

const navbar = () => {

    return (
        <div className={"bg-black"}>
            <ul className={"flex flex-row [&>li]:text-white [&>li]:p-2 [&>li:hover]:bg-gray-800 [&>li:hover]:cursor-pointer"}>
                <li className={"ml-2"}>
                    File
                </li>
                <li>
                    Edit
                </li>
            </ul>
        </div>
    )
}

export default navbar