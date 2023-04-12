import { AiOutlineClose } from "react-icons/ai";
import { IconButton } from "../buttons";

interface SnackbarMessageProps {
  message?: string;
  dismissable?: boolean;
  duration?: number;
}

export default function SnackbarMessage({
  message,
  dismissable,
}: SnackbarMessageProps) {
  const close = () => {};

  return (
    <div className="p-5 bg-slate-800 flex flex-col justify-between gap-5 text-white rounded-lg">
      {message}
      {dismissable && (
        <IconButton onClick={close}>
          <AiOutlineClose></AiOutlineClose>
        </IconButton>
      )}
    </div>
  );
}
