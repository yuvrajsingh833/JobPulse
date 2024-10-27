"use client";

import { JobCreateModel } from "@models/models";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@components/Button";
import { request } from "@api/fetch";
import { NotificationManager } from "react-notifications";
import { useAuth } from "@context/AuthContext";
import FormLoader from "@/components/FormLoader";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faChevronLeft);

const initialJobData: JobCreateModel = {
  role: "",
  company: "",
  application_date: "",
  contract_length: "",
  job_link: "",
  platform: "",
  salary: "",
};

export default function NewJob() {
  const router = useRouter();
  const [jobData, setJobData] = useState<JobCreateModel>(initialJobData);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const response = await request("POST", jobData, "/jobs/", getToken());

    if (response?.id) {
      NotificationManager.success("Job posted successfully", "Success");
      router.replace("/jobs");
    }

    setLoading(false);
  };

  useEffect(() => {
    document.title = "New Job | JobPulse";
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex items-center gap-2 font-semibold text-2xl">
          <button onClick={() => router.back()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <p className="font-semibold text-2xl">Add New Job</p>
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
            value={jobData.company}
            onChange={(e) =>
              setJobData({ ...jobData, company: e.target.value })
            }
            disabled={loading}
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
              text="Submit Job"
            ></Button>
          </div>
        )}
      </form>
    </div>
  );
}
