import Swal from "sweetalert2";

export const showSimpleAlert = (
  text: string,
  icon?: "success" | "error" | "warning" | "info" | "question" | undefined,
  showCancelButton?: boolean,
  title?: string
) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
  });
};
