"use client";

import { JobEditModel } from "@models/models";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { TextField } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "@components/Button";
import { request } from "@api/fetch";
import { NotificationManager } from "react-notifications";
import { COMMON_ERROR_NOTIFICATION_MESSAGE } from "@constants/constants";
import { useAuth } from "@context/AuthContext";
import FormLoader from "@components/FormLoader";
import Loader from "@components/Loader";

library.add(faChevronLeft);

export default function EditJob() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.job_id;
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [jobData, setJobData] = useState<JobEditModel>({
    role: "",
    company: { name: "" },
    application_date: "",
    contract_length: "",
    job_link: "",
    platform: "",
    salary: "",
  });
  const { getToken, isLoading } = useAuth();

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const response = await request("GET", {}, `/jobs/${jobId}/`, getToken());
      setJobData(response);
    } catch (error) {
      console.error("Error fetching job details:", error);
      NotificationManager.error(COMMON_ERROR_NOTIFICATION_MESSAGE, "Error");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoading]);

  useEffect(() => {
    document.title = `Edit Job | ${jobData?.role} | JobPulse`;
  }, [jobData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await request(
        "PUT",
        jobData,
        `/jobs/${jobId}/`,
        getToken()
      );

      if (response?.id) {
        NotificationManager.success("Job updated successfully", "Success");
        router.replace(`/jobs/${jobId}`);
      }
    } catch (error) {
      console.error("Error updating job:", error);
      NotificationManager.error(COMMON_ERROR_NOTIFICATION_MESSAGE, "Error");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex items-center gap-2 font-semibold text-2xl">
          <button onClick={() => router.back()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <p className="font-semibold text-2xl">Edit Job</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-12">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Role"
            variant="outlined"
            value={jobData.role}
            onChange={(e) => setJobData({ ...jobData, role: e.target.value })}
            disabled={loading}
          />
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Company"
            variant="outlined"
            value={jobData.company?.name}
            disabled
          />
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Salary"
            variant="outlined"
            value={jobData.salary}
            onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
            disabled={loading}
          />
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Contract Length"
            variant="outlined"
            value={jobData.contract_length}
            onChange={(e) =>
              setJobData({ ...jobData, contract_length: e.target.value })
            }
            disabled={loading}
          />
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Platform"
            variant="outlined"
            value={jobData.platform}
            onChange={(e) =>
              setJobData({ ...jobData, platform: e.target.value })
            }
            disabled={loading}
          />
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Job Link"
            variant="outlined"
            value={jobData.job_link}
            onChange={(e) =>
              setJobData({ ...jobData, job_link: e.target.value })
            }
            disabled={loading}
          />
        </div>
        {loading ? (
          <FormLoader />
        ) : (
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button
              type="cancel"
              buttonType="button"
              text="Cancel"
              onClick={router.back}
            />
            <Button
              type={"primary"}
              buttonType="submit"
              text="Update Job"
            ></Button>
          </div>
        )}
      </form>
    </div>
  );
}
