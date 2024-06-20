import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import FormError from "src/common/components/FormError";
import LeaveRequestFormInputs from "src/leaveRequests/models/LeaveRequestFormInputs";
import { Link } from "react-router-dom";
import { createMaxLengthRule, requiredRule } from "src/common/utility/validationRules";

type Props = {
  onSubmit: SubmitHandler<LeaveRequestFormInputs>;
}

function LeaveRequestForm(props: Props) {
  const { onSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitted
    }
  } = useForm<LeaveRequestFormInputs>();

  const getValidationClass = (fieldError: FieldError | undefined) => {
    return fieldError ? ' is-invalid' : isSubmitted ? ' is-valid' : '';
  }

  const beforeSubmit = (data: LeaveRequestFormInputs) => {
    data.comment = data.comment == "" ? undefined : data.comment;

    onSubmit(data);
  }

  const validateEndDate = (value: string | null, formValues: LeaveRequestFormInputs) =>
     (value != null && value >= formValues.startDate) || "End date must be greater than or equal to start date";

  return (
    <form onSubmit={handleSubmit(beforeSubmit)}>
      <div className="form-floating mb-3">
        <input
          className={`form-control${getValidationClass(errors.absenceReason)}`} id="absenceReason" type="text" placeholder="Absence reason"
          {...register("absenceReason", { required: requiredRule, maxLength: createMaxLengthRule(32) })}
        />
        <label htmlFor="absenceReason">Absence reason</label>
        <FormError error={errors.absenceReason} />
      </div>
      <div className="row mb-3">
        <label className="col-2 col-form-label" htmlFor="startDate">Start date</label>
        <div className="col-3">
          <input
            className={`form-control${getValidationClass(errors.startDate)}`} id="startDate" type="date"
            {...register("startDate", { required: requiredRule })}
          />
          <FormError error={errors.startDate} />
        </div>
        <div className="col-2" />
        <label className="col-2 col-form-label" htmlFor="endDate">End date</label>
        <div className="col-3">
          <input
            className={`form-control${getValidationClass(errors.endDate)}`} id="endDate" type="date"
            {...register("endDate", { required: requiredRule, validate: validateEndDate })}
          />
          <FormError error={errors.endDate} />
        </div>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className={`form-control${getValidationClass(errors.comment)}`} id="comment" placeholder="Comment"
          {...register("comment", { maxLength: createMaxLengthRule(1024) })}
        />
        <label htmlFor="comment">Comment</label>
        <FormError error={errors.comment} />
      </div>
      <div className="d-flex gap-3">
        <Link className="btn btn-primary fs-6" to="/leaveRequests">Back to list</Link>
        <input className="btn btn-success fs-6" type="submit" value="Submit" />
      </div>
    </form>
  );
}

export default LeaveRequestForm;