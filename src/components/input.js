export default function Input({ type, placeholder, className = "border p-2" }) {
    return (
      
        <input placeholder={placeholder} type={type} className={className} />
      
    );
  }
  