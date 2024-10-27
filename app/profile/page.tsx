"use client";

import { request } from "@api/fetch";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { NotificationManager } from "react-notifications";
import Button from "@components/Button";
import { useAuth } from "@context/AuthContext";
import { AuthUser } from "@models/models";

const Loader = () => (
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export default function Profile() {
  const { user, getToken, isLoading, refetch, logOut } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [userData, setUserData] = useState<AuthUser | null>();

  const disabledEditMode = () => {
    setEditMode(false);
  };

  const enableEditMode = () => {
    setEditMode(true);
  };

  const cancel = () => {
    disabledEditMode();
    setUserData(user);
  };

  const updateUserDetails = async () => {
    setLoading(true); // Set loading to true when updating profile

    const data = {
      username: userData?.username ?? "",
      email: userData?.email ?? "",
      first_name: userData?.first_name ?? "",
      last_name: userData?.last_name ?? "",
    };
    const response = await request(
      "PUT",
      data,
      `/users/${user?.id}/`,
      getToken()
    );

    if (response?.id) {
      NotificationManager.success("Profile updated successfully", "Success");
      refetch(); // Refresh user data after
      disabledEditMode();
    } else {
      setUserData(user); // reset the data
    }

    setLoading(false); // Reset loading state after request completes
  };

  useEffect(() => {
    document.title = "Profile | JobPulse";
  }, []);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user, refetch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <p className="text-3xl font-semibold">My Profile</p>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <TextField
          className="w-full"
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          value={userData?.first_name}
          onChange={(e) => setUserData({ ...user, first_name: e.target.value })}
          disabled={!editMode}
        />
        <TextField
          className="w-full"
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          value={userData?.last_name ?? ""}
          onChange={(e) => setUserData({ ...user, last_name: e.target.value })}
          disabled={!editMode}
        />
        <TextField
          className="w-full"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={userData?.username ?? ""}
          onChange={(e) => setUserData({ ...user, username: e.target.value })}
          disabled={!editMode}
        />
        <TextField
          className="w-full"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={userData?.email ?? ""}
          onChange={(e) => setUserData({ ...user, email: e.target.value })}
          disabled={!editMode}
        />
      </div>
      <div className="mt-6">
        {editMode ? (
          <div className="flex items-center gap-4">
            <Button type="cancel" text="Cancel" onClick={cancel} />
            <Button type="primary" text="Save" onClick={updateUserDetails} />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button type="primary" text="Edit" onClick={enableEditMode} />
            <Button type="delete" text="Sign out" onClick={logOut} />
          </div>
        )}
      </div>

      {/* Loader displayed conditionally based on 'loading' state */}
      {loading && <Loader />}
    </div>
  );
}
