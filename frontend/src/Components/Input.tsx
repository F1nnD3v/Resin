type Props = {
    placeholder?: string,
    icon?: any,
    label: string,
    onChange?:any
}

const input = ({placeholder, icon, label, onChange}: Props) => {

    return (
        <label className={"relative block mt-4"}>
            <p className={"font-bold"}>{label}</p>
            <span className="absolute inset-y-0 left-0 top-6 flex items-center pl-2">
                {icon}
            </span>
            <input
                className="placeholder:italic placeholder:text-slate-400 bg-white w-full border-2 border-black rounded-md py-2 pl-9 pr-3 focus:outline-none "
                placeholder={placeholder} type="text" name="search" onChange={onChange}/>
        </label>
    )
}

export default input