interface InputWithIconProps {
    id: string;
    name: string;
    label: string;
    type?: string;
    placeholder: string;
    iconSrc: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    rightIconSrc?: string;
    onRightIconClick?: () => void;
}

const InputWithIcon = ({
                           id,
                           name,
                           label,
                           type = 'text',
                           placeholder,
                           iconSrc,
                           value,
                           onChange,
                           rightIconSrc,
                           onRightIconClick,
                       }: InputWithIconProps) => {
    return (
        <div className="relative w-[329px] mb-5">
            <label
                htmlFor={id}
                className="absolute -top-2 left-3 px-1 bg-white text-sm text-[#02191E] z-10"
            >
                {label}
            </label>

            <div className="flex items-center h-[60px] border border-[#E8672D] rounded-md px-3 py-2">
                <img src={iconSrc} alt="icon" className="w-5 h-5 mr-2" />
                <input
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
                {rightIconSrc && (
                    <img
                        src={rightIconSrc}
                        alt="Mostrar/Ocultar"
                        className="w-5 h-5 ml-2 cursor-pointer"
                        onClick={onRightIconClick}
                    />
                )}
            </div>
        </div>
    );
};

export default InputWithIcon;