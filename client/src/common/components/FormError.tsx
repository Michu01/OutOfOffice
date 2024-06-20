import { AxiosError } from "axios";
import { FieldError } from "react-hook-form";

function FormError({ error }: { error: FieldError | Error | null | undefined }) {
  return (
    <div className="invalid-feedback">
      {(error as AxiosError<string>)?.response?.data ?? error?.message}
    </div>
  );
}

export default FormError;