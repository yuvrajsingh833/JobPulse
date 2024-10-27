import {
  faBarsProgress,
  faCheck,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JobStatus } from "@models/models";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faBarsProgress, faCheck, faClose);

interface StatusLabelProps {
  status: JobStatus;
}

export default function StatusLabel(props: StatusLabelProps) {
  const { status } = props;

  return (
    <div
      className={`relative inline-block bg-white rounded-full px-4 shadow-sm border-2 ${
        status === "Offered"
          ? "border-green-500"
          : status === "Rejected"
          ? "border-red-500"
          : status === "Withdrawn"
          ? "border-gray-500"
          : "border-primary"
      }`}
    >
      <div
        className={`absolute inset-0 rounded-full opacity-20 blur-sm ${
          status === "Offered"
            ? "bg-green-500"
            : status === "Rejected"
            ? "bg-red-500"
            : status === "Withdrawn"
            ? "bg-gray-500"
            : "bg-primary"
        }`}
      ></div>
      <div
        className={`relative z-10 flex gap-2 items-center ${
          status === "Offered"
            ? "text-green-500"
            : status === "Rejected"
            ? "text-red-500"
            : status === "Withdrawn"
            ? "text-gray-500"
            : "text-primary"
        }`}
      >
        <FontAwesomeIcon
          icon={
            status === "Offered" || status === "Accepted"
              ? faCheck
              : status === "Rejected" || status === "Withdrawn"
              ? faClose
              : faBarsProgress
          }
        />
        {status}
      </div>
    </div>
  );
}
