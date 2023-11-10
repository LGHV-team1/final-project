export default function Button({ label, className = "border w-35 my-5 py-2 bg-my-color hover:bg-my-color text-white rounded px-4", onClick, disabled }) {
    return (
      <button className={className} onClick={onClick} disabled={disabled}>
        {label}
      </button>
    );
  }
  