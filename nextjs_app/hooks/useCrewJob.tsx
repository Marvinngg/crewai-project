"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type EventType = {
  data: string;
  timestamp: string;
};

export type NamedUrl = {
  name: string;
  url: string;
};

export type PositionInfo = {
  company: string;
  position: string;
  name: string;
  blog_articles_urls: string[];
  youtube_interviews_urls: NamedUrl[];
};

export const useCrewJob = () => {
  // State
  const [running, setRunning] = useState<boolean>(false);
  const [companies, setCompanies] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCompanies = localStorage.getItem('companies');
      return savedCompanies ? JSON.parse(savedCompanies) : [];
    }
    return [];
  });

  const [positions, setPositions] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const savedPositions = localStorage.getItem('positions');
      return savedPositions ? JSON.parse(savedPositions) : [];
    }
    return [];
  });

  const [events, setEvents] = useState<EventType[]>([]);
  const [positionInfoList, setPositionInfoList] = useState<PositionInfo[]>([]);
  const [currentJobId, setCurrentJobId] = useState<string>("");
  const [inputData, setInputData] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const savedInputData = localStorage.getItem('inputData');
      return savedInputData ? JSON.parse(savedInputData) : [];
    }
    return [];
  });

  const [jobIds, setJobIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const savedJobIds = localStorage.getItem('jobIds');
      return savedJobIds ? JSON.parse(savedJobIds) : [];
    }
    return [];
  });

  // useEffects
  useEffect(() => {
    let intervalId: number;
    console.log("currentJobId", currentJobId);

    const fetchJobStatus = async () => {
      try {
        console.log("calling fetchJobStatus");
        const response = await axios.get<{
          status: string;
          result: { positions: PositionInfo[] };
          events: EventType[];
        // }>(`http://localhost:3001/api/crew/fe3baa34-71ff-4987-87cf-0700df1f09e2`);
        }>(`http://localhost:3001/api/crew/${currentJobId}`);
        const { status, events: fetchedEvents, result } = response.data;

        console.log("status update", response.data);

        setEvents(fetchedEvents);
        localStorage.setItem(`events_${currentJobId}`, JSON.stringify(fetchedEvents));

        if (result) {
          console.log("setting job result", result);
          console.log("setting job positions", result.positions);
          setPositionInfoList(result.positions || []);
          localStorage.setItem(`positionInfoList_${currentJobId}`, JSON.stringify(result.positions));
        }

        if (status === "COMPLETE" || status === "ERROR") {
          if (intervalId) {
            clearInterval(intervalId);
          }
          setRunning(false);
          toast.success(`Job ${status.toLowerCase()}.`);
        }
      } 
      catch (error) {
        // if (intervalId) {
        //   clearInterval(intervalId);
        // }
        // setRunning(false);
        // toast.error("Failed to get job status.");
        console.error(error);
      }
    };

    if (currentJobId !== "") {
      intervalId = setInterval(fetchJobStatus, 1000) as unknown as number;
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentJobId]);

  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('positions', JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem('inputData', JSON.stringify(inputData));
  }, [inputData]);

  useEffect(() => {
    localStorage.setItem('jobIds', JSON.stringify(jobIds));
  }, [jobIds]);

  useEffect(() => {
    if (currentJobId !== "") {
      const savedEvents = localStorage.getItem(`events_${currentJobId}`);
      const savedPositions = localStorage.getItem(`positionInfoList_${currentJobId}`);
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      }
      if (savedPositions) {
        setPositionInfoList(JSON.parse(savedPositions));
      }
    }
  }, [currentJobId]);

  const startJob = async () => {
    // Clear previous job data
    setEvents([]);
    setPositionInfoList([]);
    setRunning(true);

    try {
      const response = await axios.post<{ job_id: string }>(
        "http://localhost:3001/api/crew",
        {
          companies,
          positions,
        }
      );

      toast.success("Job started");

      console.log("jobId", response.data.job_id);
      const newJobId = response.data.job_id;
      setCurrentJobId(newJobId);
      setJobIds((prevJobIds) => {
        const updatedJobIds = [...prevJobIds, newJobId];
        localStorage.setItem('jobIds', JSON.stringify(updatedJobIds));
        return updatedJobIds;
      });
    } catch (error) {
      toast.error("Failed to start job");
      console.error(error);
      setCurrentJobId("");
    }
  };

  const startJob_analyse = async () => {
    // Clear previous job data
    setEvents([]);
    setPositionInfoList([]);
    setRunning(true);

    try {
      const inputDataStr = inputData.join(' ');
      const response = await axios.post<{ job_id: string }>(
        "http://localhost:3001/api/crew-analyse",
        {
          inputData,inputDataStr
        }
      );

      toast.success("Job started");
      console.log("input", inputDataStr);
      console.log("jobId", response.data.job_id);
      const newJobId = response.data.job_id;
      setCurrentJobId(newJobId);
      setJobIds((prevJobIds) => {
        const updatedJobIds = [...prevJobIds, newJobId];
        localStorage.setItem('jobIds', JSON.stringify(updatedJobIds));
        return updatedJobIds;
      });
    } catch (error) {
      toast.error("Failed to start job");
      console.error(error);
      setCurrentJobId("");
    }
  };

  const selectJob = (jobId: string) => {
    setCurrentJobId(jobId);
    const savedEvents = localStorage.getItem(`events_${jobId}`);
    const savedPositions = localStorage.getItem(`positionInfoList_${jobId}`);
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      setEvents([]);
    }
    if (savedPositions) {
      setPositionInfoList(JSON.parse(savedPositions));
    } else {
      setPositionInfoList([]);
    }
  };

  return {
    running,
    events,
    setEvents,
    positionInfoList,
    setPositionInfoList,
    currentJobId,
    setCurrentJobId,
    companies,
    setCompanies,
    positions,
    setPositions,
    startJob,
    startJob_analyse,
    inputData,
    setInputData,
    jobIds,
    selectJob,
  };
};
