import React from "react";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="min-h-screen p-4 font-mono">{children}</div>;
};

export default DefaultLayout;