import React from "react";
import  { useEffect } from "react";

interface FinalOutputProps {
  result: any; // result 数据类型
}

export const FinalOutput2: React.FC<FinalOutputProps> = ({ result }) => {
    useEffect(() => {
        // 在这里添加你想要的代码，例如：
        console.log("Result changed:", result);
      }, [result]);
    return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">最终输出</h2>
      <div className="flex-grow overflow-auto border border-gray-300 rounded-md p-4 bg-gray-50">
        {result && Object.entries(result).map(([key, value], index) => (
          <div key={index} className="mb-6 bg-white p-4 rounded-md shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">{key}</h3>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};
