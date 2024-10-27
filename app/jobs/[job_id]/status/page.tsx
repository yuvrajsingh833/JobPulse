"use client";

import { request } from "@api/fetch";
import { JOB_STATUSES } from "@constants/constants";
import Dropdown from "@components/Dropdown";
import { Job, JobStatus } from "@models/models";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { NotificationManager } from "react-notifications";
import Button from "@components/Button";
import { useAuth } from "@context/AuthContext";
import FormLoader from "@components/FormLoader";

library.add(faChevronLeft);

const Loader = () => (
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export default function UpdateJobStatus() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.job_id;
  const [jobDetails, setJobDetails] = useState<Job>();
  const [status, setStatus] = useState<JobStatus>("Applied");
  const [updateText, setUpdateText] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const fetchData = async () => {
    setLoadingData(true);
    const response = await request("GET", {}, `/jobs/${jobId}/`, getToken());
    setJobDetails(response);
    setStatus(response.status.status);
    setLoadingData(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const data = { status: status, update_text: updateText };
    const response = await request(
      "POST",
      data,
      `/jobs/${jobId}/update_status/`,
      getToken()
    );

    if (response?.id) {
      NotificationManager.success("Status updated successfully", "Success");
      router.replace(`/jobs/${jobId}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    document.title = `Update Status | ${jobDetails?.role} | JobPulse`;
  }, [jobDetails]);

  if (loadingData) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <div className="mb-8 flex flex-col md:flex-row md:items-center gap-2">
        <div className="flex items-center gap-2 font-semibold text-2xl">
          <button onClick={() => router.back()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <p>Update Job Status</p>
        </div>
        <p>ID: {jobId}</p>
      </div>
      <div>
        <div>
          <p className="text-xl font-semibold">
            {jobDetails?.role} - {jobDetails?.company?.name}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <Dropdown
            name={"Status"}
            state={status}
            setState={setStatus}
            options={JOB_STATUSES}
            disabled={loading}
          ></Dropdown>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Update Text"
            variant="outlined"
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
            disabled={loading}
          />
          {loading ? (
            <FormLoader />
          ) : (
            <div className="flex justify-center gap-2">
              <Button
                type="cancel"
                buttonType={"button"}
                text={"Cancel"}
                onClick={() => router.back()}
              ></Button>
              <Button
                type="primary"
                buttonType="submit"
                text={"Update"}
              ></Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
