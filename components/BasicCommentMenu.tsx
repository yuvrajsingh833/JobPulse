import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { JobComment } from "@models/models";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faEdit, faEllipsis, faTrash);

interface BasicCommentMenuProps {
  comment: JobComment;
  onDelete: (e: string) => void;
  onEdit: (id: string, comment: string) => void;
}

export default function BasicCommentMenu(props: BasicCommentMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="hover:text-primary rounded-full text-2xl px-2"
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            props.onEdit(props.comment.id, props.comment.comment);
            handleClose();
          }}
          className="flex gap-2"
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.onDelete(props.comment.id);
            handleClose();
          }}
          className="flex gap-2"
        >
          <FontAwesomeIcon icon={faTrash} className="text-red-500" /> Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
