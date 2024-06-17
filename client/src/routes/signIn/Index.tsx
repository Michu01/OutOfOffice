import { useMutation } from "@tanstack/react-query";
import apiClient from "../../services/apiClient";
import { FormEvent } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

async function signIn(data: { fullName: string }) {
  return await apiClient.post("identity/signIn", data);
}

function SignInIndex() {
  const navigate = useNavigate();

  const { mutate, error, isError } = useMutation({
    mutationFn: signIn,
    onSuccess: () => navigate(0)
  });

  const message = (error as AxiosError<string>)?.response?.data;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullName = e.currentTarget.fullName.value;

    mutate({ fullName });
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-auto">
          <div className="border rounded p-5 bg-white shadow-lg" style={{ minWidth: "400px" }}>
            <h4 className="mb-3">Sign in</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input type="text" className={`form-control ${isError && 'is-invalid'}`} id="fullName" name="fullName" placeholder="Full name" required />
                <label htmlFor="fullName">Full name</label>
                <div className="invalid-feedback">
                  {message}
                </div>
              </div>
              <div className="row justify-content-center">
                <button className="btn btn-primary col-auto d-flex align-items-center" type="submit">
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