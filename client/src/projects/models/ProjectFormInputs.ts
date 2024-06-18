type ProjectFormInputs = {
  id: number;
  name: string;
  type: string;
  startDate: string;
  endDate: string | null;
  comment: string | null;
  status: string;
  employeeIds: number[];
}

export default ProjectFormInputs;