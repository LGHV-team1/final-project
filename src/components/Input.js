export default function Input({ type, placeholder, className = "border p-2" ,onChange, value}) {
    return (
      
        <input placeholder={placeholder} type={type} className={className} value={value} onChange={onChange} />
      
    );
  }
  