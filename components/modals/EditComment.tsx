"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Button from "@components/Button";
import { TextField } from "@mui/material";
import { useState } from "react";
import FormLoader from "@components/FormLoader";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faComment);

interface EditCommentProps {
  initialComment: string;
  onSubmit: (newComment: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function EditComment(props: EditCommentProps) {
  const [newComment, setNewComment] = useState(props.initialComment);
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <FontAwesomeIcon icon={faComment} />
        <p>Edit Comment</p>
      </div>
      <div className="mt-4">
        <TextField
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full md:w-4/5"
        />
      </div>
      {props.isLoading ? (
        <div className="mt-4 flex justify-center">
          <FormLoader />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2 justify-end mt-4">
          <Button type="cancel" text="Cancel" onClick={props.onCancel} />
          <Button
            type="primary"
            buttonType="submit"
            text="Edit"
            onClick={() => props.onSubmit(newComment)}
          />
        </div>
      )}
    </div>
  );
}
