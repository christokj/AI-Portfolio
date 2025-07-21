import React, { type KeyboardEvent } from "react";

interface Props {
    input: string;
    setInput: (val: string) => void;
    onEnter: (val: string) => void;
}

const InputPrompt: React.FC<Props> = ({ input, setInput, onEnter }) => {
    const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onEnter(input);
    };

    return (
        <div className="flex items-center">
            <span className="text-green-500">user@portfolio:~$</span>
            <input
                autoFocus
                type="text"
                className="bg-transparent border-none text-green-300 focus:outline-none ml-2 w-full"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
            />
            <span className="animate-blink ml-1">_</span>
        </div>
    );
};

export default InputPrompt;