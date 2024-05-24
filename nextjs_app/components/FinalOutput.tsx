import React from "react";
import { PositionInfo } from "@/hooks/useCrewJob";

interface FinalOutputProps {
  positionInfoList: PositionInfo[];
}

export const FinalOutput: React.FC<FinalOutputProps> = ({
  positionInfoList,
}) => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Final Output</h2>
      <div className="flex-grow overflow-auto border border-gray-300 rounded-md p-4 bg-gray-50">
        {positionInfoList.length === 0 ? (
          <p className="text-gray-600">No job result yet.</p>
        ) : (
          positionInfoList.map((position, index) => (
            <div key={index} className="mb-6 bg-white p-4 rounded-md shadow-sm border border-gray-200">
              <div className="ml-4">
                <p className="mb-2">
                  <strong className="text-gray-700">Company:</strong>{" "}
                  {capitalizeFirstLetter(position.company)}
                </p>
                <p className="mb-2">
                  <strong className="text-gray-700">Position:</strong>{" "}
                  {capitalizeFirstLetter(position.position)}
                </p>
                <p className="mb-2">
                  <strong className="text-gray-700">Name:</strong> {position.name}
                </p>
                <div className="mb-2">
                  <strong className="text-gray-700">Blog Articles URLs:</strong>
                  <ul className="list-disc ml-5">
                    {position.blog_articles_urls.length > 0 ? (
                      position.blog_articles_urls.map((url, urlIndex) => (
                        <li key={urlIndex}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            {url}
                          </a>
                        </li>
                      ))
                    ) : (
                      <p>None</p>
                    )}
                  </ul>
                </div>
                <div>
                  <strong className="text-gray-700">YouTube Interviews:</strong>
                  <ul className="list-disc ml-5">
                    {position.youtube_interviews_urls.length > 0 ? (
                      position.youtube_interviews_urls.map((video, videoIndex) => (
                        <li key={videoIndex}>
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            {video.name}
                          </a>
                        </li>
                      ))
                    ) : (
                      <p>None</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
