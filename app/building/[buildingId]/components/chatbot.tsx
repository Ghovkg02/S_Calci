import React from "react";

export default function Chatbot({ data }: { data: any }) {
  if (!data) {
    return <div>No data available from Grok API.</div>;
  }

  return (
    <div className="chatbot-container p-4 border-t mt-6">
      <h2 className="text-xl font-bold mb-2">Chatbot Insights</h2>
      <div className="chatbot-content">
        {/* Customize the display of the data as needed */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
} 