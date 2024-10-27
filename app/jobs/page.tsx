"use client";

import { useEffect, useState, useRef } from "react";
import { request } from "@api/fetch";
import { Job, JobStatus } from "@models/models";
import Link from "next/link";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@components/Button";
import Loader from "@components/Loader";
import { JOB_STATUSES } from "../constants/constants";
import { useAuth } from "@context/AuthContext";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faArrowLeft, faArrowRight);

export default function Jobs() {
  const [filteredJobList, setFilteredJobList] = useState<{
    [key: string]: Job[];
  }>({
    Applied: [],
    Offered: [],
    Rejected: [],
    Withdrawn: [],
    Accepted: [],
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isLoading, getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  const showBoardColumn = (status: JobStatus) => {
    return (
      <div
        key={status}
        className="p-4 shadow rounded-xl bg-lightgray min-w-[300px] md:min-w-[350px] md:w-[350px] flex flex-col h-[85vh] max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-2xl">{status}</p>
          <p className="p-2 px-4 text-xl rounded-full bg-primary text-lightbg font-bold">
            {filteredJobList[status].length}
          </p>
        </div>
        <div className="flex flex-col gap-6 overflow-y-auto pb-3">
          {filteredJobList[status].map((job: Job) => showJobCard(job))}
        </div>
        {filteredJobList[status].length === 0 && (
          <div className="flex justify-center p-2 bg-lightbg rounded-lg text-gray-500 font-semibold">
            No Jobs found
          </div>
        )}
      </div>
    );
  };

  const showJobCard = (job: any) => {
    return (
      <div
        key={job.id}
        className="bg-lightbg p-3 border-2 hover:border-primary transition duration-200 shadow rounded-lg"
      >
        <div>
          <b className="text-xl">{job.role}</b>
          <p>{job.company.name}</p>
          <p>{job.contract_length}</p>
          <p>Salary: {job.salary}</p>
        </div>
        <Link href={`/jobs/${job.id}`}>
          <Button className="mt-4" type="secondary" text="View Details" />
        </Link>
      </div>
    );
  };

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true when fetching starts
      const response = await request("GET", {}, "/jobs/", getToken());

      // sort by status
      const organizedJobs = response.reduce(
        (acc: { [key: string]: Job[] }, job: Job) => {
          const status = job.status.status;
          if (!acc[status]) {
            acc[status] = [];
          }
          acc[status].push(job);
          return acc;
        },
        {
          Applied: [],
          Offered: [],
          Rejected: [],
          Withdrawn: [],
          Accepted: [],
        }
      );

      setFilteredJobList(organizedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false); // Set loading to false when fetching completes
    }
  };

  useEffect(() => {
    if (!isLoading) {
      fetchData();
    }
    document.title = "Jobs | JobPulse";
  }, [isLoading]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <p className="text-3xl font-semibold">List Jobs {isLoading}</p>
        <Link href={"/jobs/new"}>
          <Button text="+ New" type="primary" />
        </Link>
      </div>
      <div className="flex gap-4 relative">
        <button
          className="absolute px-3 left-1 top-1/2 transform -translate-y-1/2 bg-tertiary bg-opacity-50 rounded-full p-2"
          onClick={scrollLeft}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="flex gap-4 overflow-x-auto" ref={scrollRef}>
          {JOB_STATUSES.map((job_status: JobStatus) =>
            showBoardColumn(job_status)
          )}
        </div>
        <button
          className="absolute px-3 right-1 top-1/2 transform -translate-y-1/2 bg-tertiary bg-opacity-50 rounded-full p-2"
          onClick={scrollRight}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
