function Button({
  label,
  className = "my-2 py-2 bg-my-color  text-white  hover:bg-my-color/70 rounded-md px-3",
  onClick,
  disabled,
  icon,
}) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
}

export default Button;
