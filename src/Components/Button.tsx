
type Props = {
    text: string,
    icon?: any,
    className?: string,
    onClick?: any,
    onHover?: any,
    onMouseOut?: any
}

const Button = ({text, icon, className, onClick, onHover, onMouseOut}:Props) => {

    return (
        <button className={`flex text-center text-black border-none bg-red-400 p-2 rounded-lg ${className}`} onClick={onClick} onMouseOver={onHover} onMouseOut={onMouseOut}>
            {text} {icon}
        </button>
    )
}

export default Button