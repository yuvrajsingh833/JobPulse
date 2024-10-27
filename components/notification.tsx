"use client";

import { NotificationContainer } from "react-notifications";

export default function Notification(props: any) {
  return (
    <div>
      {props.children}
      <NotificationContainer />
    </div>
  );
}
