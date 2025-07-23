import Styles from "./Login.module.css";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const refAuthForm = useRef();
  const resData = useActionData();
  const message = resData?.message;
  const [textError, setTextError] = useState(message);
  const [isAuthError, setIsAuthError] = useState(resData?.isAuthError);

  function onChangeForm() {
    if (isAuthError) {
      setTextError(null);
      setIsAuthError(false);
    }
  }

  // This Effect() hook base on status of authentication (successful/failed) to redirect to appropriate page (Home/Login)
  useEffect(() => {
    // Display error message for authentication
    if (resData?.isAuthError) {
      setIsAuthError(true);
      setTextError(message);
    }

    // Navigate to "login" or "home" page when authentication is success
    if (message === "Successful") {
      navigate("/");
    }
  }, [resData]);

  return (
    <div>
      <div
        className={`${Styles.errorContainer} ${
          isAuthError ? Styles.authErrorInfor : ""
        }`}
      >
        {isAuthError && textError}
      </div>

      <Form
        className={Styles.authForm}
        method="POST"
        ref={refAuthForm}
        onChange={onChangeForm}
      >
        <p className={Styles.loginTitle}>Login</p>
        <input
          type="text"
          name="email"
          placeholder="Enter email"
          className={Styles.inputField}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className={Styles.inputField}
          required
        />
        <button className={Styles.submitButton}>Login</button>
      </Form>
    </div>
  );
};

export default Login;
