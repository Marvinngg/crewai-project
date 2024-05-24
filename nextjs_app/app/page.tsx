"use client";

import { useEffect, useState } from "react";
import { EventLog } from "@/components/EventLog";
import { FinalOutput } from "@/components/FinalOutput";
import InputSection from "@/components/InputSection";
import { useCrewJob } from "@/hooks/useCrewJob";
import TipEditor from '@/components/TipEditor';
import JobSelector from '@/components/JobSelector';

export default function Home() {
  const crewJob = useCrewJob();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this code runs only on the client
  }, []);

  if (!isClient) {
    return null; // Prevents rendering until the component is mounted on the client
  }

  return (
    <div className="bg-white min-h-screen text-gray-900 flex flex-col items-center py-10">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg flex-grow">
            <h2 className="text-3xl font-semibold mb-4">Companies</h2>
            <InputSection
              title="Companies"
              placeholder="Add a company"
              data={crewJob.companies}
              setData={crewJob.setCompanies}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex-grow">
            <h2 className="text-3xl font-semibold mb-4">Positions</h2>
            <InputSection
              title="Positions"
              placeholder="Add a position"
              data={crewJob.positions}
              setData={crewJob.setPositions}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
          <TipEditor />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Output</h2>
            <JobSelector />
            <button
              onClick={() => crewJob.startJob()}
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
            <EventLog events={crewJob.events} />
          </div>
        </div>
      </div>
    </div>
  );
}
