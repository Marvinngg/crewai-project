// components/JobSelector.tsx
import React from 'react';
import { useCrewJob } from '@/hooks/useCrewJob';

const JobSelector: React.FC = () => {
  const { jobIds, selectJob, currentJobId } = useCrewJob();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Select Job ID</label>
      <select
        value={currentJobId}
        onChange={(e) => selectJob(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select a job</option>
        {jobIds.map((jobId) => (
          <option key={jobId} value={jobId}>
            {jobId}
          </option>
        ))}
      </select>
    </div>
  );
};

export default JobSelector;
