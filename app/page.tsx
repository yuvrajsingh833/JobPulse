"use client";

import { useEffect, useState } from "react";
import { request } from "@api/fetch";
import { Job } from "@models/models";
import Link from "next/link";
import Button from "@components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faMoneyBill,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Filter from "@components/Filter";
import { JOB_STATUSES } from "@constants/constants";
import Loader from "@components/Loader";
import { useAuth } from "@context/AuthContext";

library.add(faGlobe, faMoneyBill, faFilter);

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobList, setFilteredJobList] = useState({
    Applied: [],
    Offered: [],
    Rejected: [],
    Withdrawn: [],
    Accepted: [],
  });
  const { user, getToken, isLoading } = useAuth();
  const [filter, setFilter] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  const showJobCard = (job: any) => {
    return (
      <div
        key={job.id}
        className="bg-white shadow-lg border border-gray-200 hover:border-primary transition duration-200 rounded-lg p-4"
      >
        <div>
          <b className="text-xl">{job.role}</b>
          <p className="text-gray-600">{job.company.name}</p>
          <p className="text-gray-600">{job.contract_length}</p>
          <div className="flex items-center gap-2 mt-2">
            <FontAwesomeIcon icon={faMoneyBill} className="text-gray-600" />
            <p className="text-lg text-gray-600">{job.salary}</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <FontAwesomeIcon icon={faGlobe} className="text-gray-600" />
            <p className="text-lg text-gray-600">{job.platform}</p>
          </div>
        </div>
        <Link href={`/jobs/${job.id}`}>
          <Button className="mt-4" type="secondary" text="View Details" />
        </Link>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const response = await request("GET", {}, "/jobs/", getToken());
        setJobs(response);

        // Sort by status
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

    // if (!isLoading) {
    fetchData();
    // }
    document.title = `Home | JobPulse`;
  }, [getToken]);

  if (isLoading || loading) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <p className="text-3xl font-semibold">Welcome, {user?.first_name}</p>
        <Link href={"/jobs/new"}>
          <Button type="primary" text="Add New Job" />
        </Link>
      </div>
      <div className="flex md:flex-row flex-col justify-around gap-4 items-center mt-6">
        <div className="flex flex-col items-center p-4 rounded-lg bg-gray-100 shadow-md w-full md:w-1/3">
          <p className="text-lg font-semibold text-gray-700">Applied</p>
          <p className="text-4xl font-bold text-primary">
            {filteredJobList["Applied"]?.length}
          </p>
        </div>
        <div className="flex flex-col items-center p-4 rounded-lg bg-gray-100 shadow-md w-full md:w-1/3">
          <p className="text-lg font-semibold text-gray-700">Offered</p>
          <p className="text-4xl font-bold text-primary">
            {filteredJobList["Offered"]?.length}
          </p>
        </div>
        <div className="flex flex-col items-center p-4 rounded-lg bg-gray-100 shadow-md w-full md:w-1/3">
          <p className="text-lg font-semibold text-gray-700">Rejected</p>
          <p className="text-4xl font-bold text-primary">
            {filteredJobList["Rejected"]?.length}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Filter statuses={JOB_STATUSES} filter={filter} setFilter={setFilter}>
          <FontAwesomeIcon icon={faFilter} className="mr-2" /> Filter
        </Filter>
      </div>
      <div>
        {jobs && jobs.length ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobs
              ?.filter(
                (job: Job) =>
                  filter.length === 0 || filter.includes(job.status.status)
              )
              .map((job: Job) => showJobCard(job))}
          </div>
        ) : (
          <div className="flex mt-6 justify-center bg-lightgray p-3 rounded-lg shadow text-gray-500 font-semibold">
            No Jobs Found
          </div>
        )}
      </div>
    </div>
  );
}
