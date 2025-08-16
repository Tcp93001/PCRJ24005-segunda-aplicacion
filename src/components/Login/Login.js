import { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./Login.module.css";
import AuthContext from "../../context/AuthContext";

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: action.payload,
        emailIsValid: action.payload.includes('@')
      }
    case 'UPDATE_PASSWORD':
      return {
        ...state,
        password: action.payload,
        passwordIsValid: action.payload.includes('@')
      }
    case 'INPUT_BLUR':
      return {
        ...state,
        emailIsValid: state.email.includes('@'),
        passwordIsValid: state.password.trim().length > 6
      }

    default:
      return { value: '', isValid: false }
  }
}

function Login() {
  const { onLogin } = useContext(AuthContext)
  const [formIsValid, setFormIsValid] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    email: '',
    emailIsValid: null,
    password: '',
    passwordIsValid: null
  })

  const { emailIsValid, passwordIsValid } = state

  // const [email, setEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [password, setPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 500)

    return () => {
      clearTimeout(timer)
    }

  }, [emailIsValid, passwordIsValid])


  const emailChangeHandler = (event) => {
    dispatch({ type: 'UPDATE_EMAIL', payload: event.target.value })
    // setEmail(event.target.value);

    // setFormIsValid(
    //   event.target.value.includes("@") && password.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: 'UPDATE_PASSWORD', payload: event.target.value })

    // setFormIsValid(event.target.value.trim().length > 6 && email.includes("@"));
  };

  const validateHandler = () => {
    dispatch({ type: 'INPUT_BLUR' })
    // setEmailIsValid(email.includes("@"));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(state.email, state.password);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            value={state.email}
            onChange={emailChangeHandler}
            onBlur={validateHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={state.password}
            onChange={passwordChangeHandler}
            onBlur={validateHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Login;
