export default function Button ({label,className="border w-35 my-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded px-4", onClick, disabled}) {
    return(
        
        <button className={className} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    )
}