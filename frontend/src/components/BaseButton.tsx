interface BaseButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'filled' | 'outlined';
    className?: string;
}

const BaseButton = ({ label, onClick, variant = 'filled', className = '' }: BaseButtonProps) => {
    const baseStyles = 'w-[329px] h-[44px] font-semibold rounded-full';
    const filled = 'bg-[#096A7F] text-white';
    const outlined = 'border-2 border-[#096A7F] text-[#096A7F]';

    const styles = `${baseStyles} ${variant === 'filled' ? filled : outlined} ${className}`;

    return (
        <button className={styles} onClick={onClick}>
            {label}
        </button>
    );
};

export default BaseButton;
