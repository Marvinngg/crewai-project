"use client";

import InputSection from "@/components/InputSection";
import { EventLog } from "@/components/EventLog";
import { FinalOutput } from "@/components/FinalOutput";
import TipEditor1 from '@/components/TipEditor1';
import { useCrewJob } from "@/hooks/useCrewJob";
import JobSelector from '@/components/JobSelector';
import { FinalOutput2 } from "@/components/FinalOutput2";
export default function Page1() {
  const crewJob = useCrewJob();

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 flex flex-col items-center py-10">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Inputs</h2>
          <InputSection
            title="Inputs"
            placeholder="输入格式为：公司/行业/宏观经济 你所要分析的公司或者行业或者国家"
            data={crewJob.inputData}
            setData={crewJob.setInputData}
          />
          <TipEditor1 />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">Output</h2>
            <JobSelector />
            <button
              onClick={() => crewJob.startJob_analyse()}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              disabled={crewJob.running}
            >
              {crewJob.running ? "Running..." : "Start"}
            </button>
          </div>
          <div className="flex-grow">
            <FinalOutput positionInfoList={crewJob.positionInfoList} />
          </div>
          <div>
            {/* <EventLog events={crewJob.events} /> */}
            <FinalOutput2 result={crewJob.results} />
          </div>
        </div>
      </div>
    </div>
  );
}
