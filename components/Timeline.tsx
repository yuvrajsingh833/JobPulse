import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { StatusUpdate } from "@models/models";
import tailwindConfig from "../tailwind.config";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faLocationCrosshairs);

interface StatusTimelineProps {
  statuses: StatusUpdate[] | undefined;
}

export default function StatusTimeline(props: StatusTimelineProps) {
  const primaryColor = (tailwindConfig.theme?.extend?.colors as any).primary;

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {props?.statuses?.map((status) => (
        <TimelineItem key={status.id}>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            {new Date(status.date_posted).toLocaleString()}
          </TimelineOppositeContent>
          <TimelineSeparator sx={{ color: primaryColor }}>
            <TimelineConnector />
            <TimelineDot sx={{ backgroundColor: primaryColor }}>
              <FontAwesomeIcon icon={faLocationCrosshairs} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              {status.status}
            </Typography>
            <Typography>{status.update_text}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
