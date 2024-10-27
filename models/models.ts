export type Company = {
  name: string;
};

export type JobStatus =
  | "Applied"
  | "Offered"
  | "Rejected"
  | "Withdrawn"
  | "Accepted";

export type StatusUpdate = {
  id: string;
  job: string;
  status: JobStatus;
  update_text: string;
  date_posted: string;
};

export type JobComment = {
  id: string;
  job: string;
  comment: string;
  date: string;
};

export type Job = {
  id: string;
  role: string;
  company: Company;
  application_date: string;
  contract_length: string;
  job_link: string;
  platform: string;
  salary: string;
  status: StatusUpdate;
  statuses: StatusUpdate[];
  comments: JobComment[];
};

export type JobCreateModel = {
  role: string;
  company: string;
  application_date: string;
  contract_length: string;
  job_link: string;
  platform: string;
  salary: string;
};

export type JobEditModel = {
  role: string;
  company: Company;
  application_date: string;
  contract_length: string;
  job_link: string;
  platform: string;
  salary: string;
};

export type User = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
};

export type AuthUser = {
  id?: number | string;
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  token?: string;
  image?: string;
};
