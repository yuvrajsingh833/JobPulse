import { CircularProgress } from "@mui/material";

export default function FormLoader() {
  return (
    <div className="flex justify-center w-full">
      <CircularProgress color="secondary" />
    </div>
  );
}
