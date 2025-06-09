const InitialLoader = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-[#f0f0f0]">
            <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-[#096A7F] animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-4 h-4 rounded-full bg-[#B5EDF8] animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-4 h-4 rounded-full bg-[#E8672D] animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
        </div>
    );
};

export default InitialLoader;
