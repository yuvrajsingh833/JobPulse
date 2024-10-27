import { ButtonTypes } from "@models/types";

interface ButtonProps {
  type: ButtonTypes;
  buttonType?: "submit" | "reset" | "button" | undefined;
  text?: string;
  onClick?: (e: any) => void;
  className?: string;
  children?: React.ReactNode;
  heightStyle?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={`${
        props.type === "primary"
          ? "bg-primary text-white"
          : props.type === "secondary"
          ? "bg-white border border-primary"
          : props.type === "delete"
          ? "bg-red-500 text-white"
          : props.type === "cancel"
          ? "bg-gray-200"
          : "border border-primary"
      } font-bold p-2 rounded-lg px-12 py-2 flex justify-center items-center w-full gap-2 ${
        props?.className
      }`}
      onClick={props.onClick}
      type={props?.buttonType}
      style={{ height: props.heightStyle }}
    >
      {props.text} {props.children}
    </button>
  );
}
