import { FieldError } from "react-hook-form";

function FormError({ error }: { error: FieldError | undefined }) {
  return (
    <div className="invalid-feedback">
      {error?.message}
    </div>
  );
}

export default FormError;