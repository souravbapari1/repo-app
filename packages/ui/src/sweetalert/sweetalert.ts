import Swal from "sweetalert2";

// Utility class for SweetAlert2
class SweetAlertUtil {
  /**
   * Displays a simple alert.
   */
  static showAlert(
    title: string,
    text: string,
    icon: "success" | "error" | "warning" | "info" | "question" = "info"
  ): Promise<any> {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
    });
  }

  /**
   * Displays a confirmation dialog with callbacks for Yes and No actions.
   */
  static confirmWithActions(
    title: string,
    text: string,
    onConfirm: () => void,
    onCancel: () => void,
    confirmText = "Yes",
    cancelText = "No"
  ): void {
    Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else {
        onCancel();
      }
    });
  }

  /**
   * Displays a prompt input dialog.
   */
  static prompt(
    title: string,
    inputType: "text" | "email" | "password" | "number" = "text",
    placeholder = ""
  ): Promise<string | null> {
    return Swal.fire({
      title,
      input: inputType,
      inputPlaceholder: placeholder,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        return Promise.resolve(result.value);
      } else {
        return Promise.reject(null);
      }
    });
  }

  /**
   * Displays an auto-closing toast message.
   */
  static toast(
    message: string,
    icon: "success" | "error" | "warning" | "info" | "question" = "info",
    timer = 3000
  ): void {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title: message,
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
    });
  }

  /**
   * Displays an error alert.
   */
  static showError(title: string, text: string): Promise<any> {
    return Swal.fire({
      title,
      text,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

export const sweetAlert = SweetAlertUtil;
