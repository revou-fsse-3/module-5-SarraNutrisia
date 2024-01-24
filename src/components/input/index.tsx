interface InputProps {
    type: string;
    placeholder: string;
    value?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const Input: React.FC<InputProps> = ({
    type,
    placeholder,
    value,
    className,
    onChange,
  }) => {
  
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={className}
        />
      </div>
    );
  };
  
  export default Input;