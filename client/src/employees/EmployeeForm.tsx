import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import FormError from "src/common/components/FormError";
import EmployeeFormInputs from "src/employees/EmployeeFormInputs";
import { Link } from "react-router-dom";
import { createMaxLengthRule, createNonNegativeRule, requiredRule } from "src/common/utility/validationRules";
import FormAction from "src/common/types/FormAction";

type Props = {
  action: FormAction;
  employee?: Employee;
  onSubmit: SubmitHandler<EmployeeFormInputs>;
}

function EmployeeForm(props: Props) {
  const { employee, action, onSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitted
    }
  } = useForm<EmployeeFormInputs>({
    defaultValues: employee == undefined ? {} : {
      id: employee.id,
      fullName: employee.fullName,
      subdivision: employee.subdivision,
      position: employee.position,
      status: employee.status,
      outOfOfficeBalance: employee.outOfOfficeBalance
    }
  });

  const getValidationClass = (fieldError: FieldError | undefined) => {
    return fieldError ? ' is-invalid' : isSubmitted ? ' is-valid' : '';
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {action == "update" && <input type="hidden" defaultValue={employee!.id} />}
      <div className="form-floating mb-3">
        <input
          className={`form-control${getValidationClass(errors.fullName)}`} id="fullName" type="text" placeholder="Full name"
          {...register("fullName", { required: requiredRule, maxLength: createMaxLengthRule(64) })}
        />
        <label htmlFor="fullName">Full name</label>
        <FormError error={errors.fullName} />
      </div>
      <div className="form-floating mb-3">
        <input
          className={`form-control${getValidationClass(errors.subdivision)}`} id="subdivision" type="text" placeholder="Subdivision"
          {...register("subdivision", { required: requiredRule, maxLength: createMaxLengthRule(32) })}
        />
        <label htmlFor="subdivision">Subdivision</label>
        <FormError error={errors.subdivision} />
      </div>
      <div className="form-floating mb-3">
        <input
          className={`form-control${getValidationClass(errors.outOfOfficeBalance)}`} id="outOfOfficeBalance" type="number" placeholder="Out of office balance"
          {...register("outOfOfficeBalance", { required: requiredRule, min: createNonNegativeRule() })}
        />
        <label htmlFor="outOfOfficeBalance">Out of office balance</label>
        <FormError error={errors.outOfOfficeBalance} />
      </div>
      <div className="form-floating mb-3">
        <select className="form-select" id="status" {...register("status")}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <label htmlFor="status">Status</label>
      </div>
      <div className="d-flex gap-3">
        {action == "create" && <Link className="btn btn-primary fs-6" to="/employees">Back to list</Link>}
        {action == "update" && <Link className="btn btn-primary fs-6" to={`/employees/${employee!.id}`}>Cancel</Link>}
        <input className="btn btn-success fs-6" type="submit" value={action == "create" ? "Add employee" : action == "update" ? "Save changes" : undefined} />
      </div>
    </form>
  );
}

export default EmployeeForm;