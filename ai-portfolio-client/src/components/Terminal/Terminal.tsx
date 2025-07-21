import React, { useEffect, useRef, useState } from "react";
import InputPrompt from "./InputPrompt";
import OutputRenderer from "./OutputRenderer";
import { commandMap } from "../../utils/commands";
import { getOpenAIResponse } from "../../utils/gpt";
import fuse from "../../utils/fuseSetup";

const Terminal: React.FC = () => {
    const [history, setHistory] = useState<string[]>(() => {
        return JSON.parse(localStorage.getItem("terminalHistory") || "[]");
    });
    const [input, setInput] = useState("");
    const terminalEndRef = useRef<HTMLDivElement>(null);

    const handleCommand = async (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        let output: string;

        if (commandMap[trimmed]) {
            output = commandMap[trimmed];
        } else if (trimmed === "clear") {
            setHistory([]);
            localStorage.setItem("terminalHistory", "[]");
            return;
        } else {
            const suggestion = fuse.search(trimmed)[0]?.item;
            if (suggestion) {
                output = `Did you mean: ${suggestion}?`;
            } else {
                output = await getOpenAIResponse(trimmed);
            }
        }

        const newHistory = [...history, `$ ${cmd}`, output];
        setHistory(newHistory);
        localStorage.setItem("terminalHistory", JSON.stringify(newHistory));
        setInput("");
    };

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    return (
        <div className="bg-black text-green-400 overflow-y-auto">
            {history.map((line, i) => (
                <OutputRenderer key={i} line={line} />
            ))}
            <InputPrompt input={input} setInput={setInput} onEnter={handleCommand} />
            <div ref={terminalEndRef} />
        </div>
    );
};

export default Terminal;