import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import FormError from "src/common/components/FormError";
import AvatarSize from "src/common/constants/AvatarSize";
import EmployeeBriefComponent from "src/employees/components/EmployeeBriefComponent";
import EmployeeSelect from "src/employees/components/EmployeeSelect";
import { useState } from "react";
import ProjectFormInputs from "src/projects/models/ProjectFormInputs";
import { Link } from "react-router-dom";
import { createMaxLengthRule, requiredRule } from "src/common/utility/validationRules";
import FormAction from "src/common/types/FormAction";

type Props = {
  action: FormAction;
  project?: Project;
  onSubmit: SubmitHandler<ProjectFormInputs>;
}

function ProjectForm(props: Props) {
  const { project, action, onSubmit } = props;

  const {
    register,
    unregister,
    handleSubmit,
    formState: {
      errors,
      isSubmitted
    }
  } = useForm<ProjectFormInputs>({
    defaultValues: project == undefined ? {} : {
      id: project.id,
      name: project.name,
      type: project.type,
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status,
      comment: project.comment,
      employeeIds: project.employees.map(e => e.id)
    },
  });

  const [employees, setEmployees] = useState<Employee[]>(project?.employees ?? []);

  const getValidationClass = (fieldError: FieldError | undefined) => {
    return fieldError ? ' is-invalid' : isSubmitted ? ' is-valid' : '';
  }

  const addEmployee = (employee: Employee) => {
    if (!employees.some(e => e.id == employee.id)) {
      setEmployees([...employees, employee]);
    }
  }

  const removeEmployee = (employee: Employee) => {
    setEmployees(employees.filter(e => e.id != employee.id));
    unregister('employeeIds');
  }

  const beforeSubmit = (data: ProjectFormInputs) => {
    data.endDate = data.endDate == "" ? null : data.endDate;
    data.employeeIds = data.employeeIds ?? [];

    onSubmit(data);
  }

  const validateEndDate = (value: string | null, formValues: ProjectFormInputs) =>
     (value == null || value == "" || value >= formValues.startDate) || "End date must be empty, greater than or equal to start date";

  return (
    <form onSubmit={handleSubmit(beforeSubmit)}>
      {action == "update" && <input type="hidden" defaultValue={project!.id} />}
      <div className="form-floating mb-3">
        <input
          className={`form-control${getValidationClass(errors.name)}`} id="name" type="text" placeholder="Project name"
          {...register("name", { required: requiredRule, maxLength: createMaxLengthRule(64) })}
        />
        <label htmlFor="name">Project name</label>
        <FormError error={errors.name} />
      </div>
      <div className="form-floating mb-3">
        <input
          className={`form-control${getValidationClass(errors.type)}`} id="type" type="text" placeholder="Project type"
          {...register("type", { required: requiredRule, maxLength: createMaxLengthRule(32) })}
        />
        <label htmlFor="type">Project type</label>
        <FormError error={errors.type} />
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
            {...register("endDate", { validate: validateEndDate })}
          />
          <FormError error={errors.endDate} />
        </div>
      </div>
      <div className="form-floating mb-3">
        <select className="form-select" id="status" {...register("status")}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <label htmlFor="status">Project status</label>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className={`form-control${getValidationClass(errors.comment)}`} id="comment" placeholder="Comment"
          {...register("comment", { maxLength: createMaxLengthRule(1024) })}
        />
        <label htmlFor="comment">Comment</label>
        <FormError error={errors.comment} />
      </div>
      <div className="mb-3">
        <EmployeeSelect onChange={addEmployee} />
      </div>
      {employees.map((e, i) =>
        <div key={e.id} className="mb-3 border rounded-5 d-flex">
          <input type="hidden" {...register(`employeeIds.${i}`, { value: e.id })} />
          <EmployeeBriefComponent className="me-auto" avatarSize={AvatarSize.Normal} employee={e} />
          <button className="btn btn-danger" type="button" onClick={() => removeEmployee(e)}>
            <FaXmark />
          </button>
        </div>
      )}
      <div className="d-flex gap-3">
        {action == "create" && <Link className="btn btn-primary fs-6" to="/projects">Back to list</Link>}
        {action == "update" && <Link className="btn btn-primary fs-6" to={`/projects/${project!.id}`}>Cancel</Link>}
        <input className="btn btn-success fs-6" type="submit" value={action == "create" ? "Create project" : action == "update" ? "Save changes" : undefined} />
      </div>
    </form>
  );
}

export default ProjectForm;