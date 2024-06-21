import { FaAngleRight } from "react-icons/fa";
import useSignInMutation from "src/signIn/useSignInMutation";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { requiredRule } from "src/common/utility/validationRules";
import FormError from "src/common/components/FormError";

type SignInFormInputs = {
  fullName: string;
}

function SignInIndex() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<SignInFormInputs>({
    defaultValues: {
      fullName: "Administrator"
    }
  });

  const { mutate, error, isError, isSuccess } = useSignInMutation();

  if (isSuccess) {
    navigate(0);
  }

  const onSubmit = (e: SignInFormInputs) => mutate(e);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-auto">
          <div className="border rounded p-5 bg-white shadow-lg" style={{ minWidth: "400px" }}>
            <h4 className="mb-3">Sign in</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-floating mb-3">
                <input 
                  type="text" className={`form-control ${(isError || errors.fullName) && 'is-invalid'}`} id="fullName" placeholder="Full name"
                  {...register("fullName", { required: requiredRule })}
                />
                <label htmlFor="fullName">Full name</label>
                <FormError error={errors.fullName ?? error} />
              </div>
              <div className="row justify-content-center">
                <button className="btn btn-primary col-auto d-flex align-items-center fs-6" type="submit">
                  <span className="me-1">Sign in</span>
                  <FaAngleRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInIndex;