import React from "react";

const OutputRenderer = ({ line }: { line: string }) => {
    return <div className="whitespace-pre-wrap">{line}</div>;
};

export default OutputRenderer;