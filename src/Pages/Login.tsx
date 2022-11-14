import { Heading, Text, Card, TextInputField, Button, Alert } from "evergreen-ui";
import { useEffect, FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/AuthStore";
import shallow from "zustand/shallow";
import Container from "../Components/Container";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthed, login, hasError, nullifyErr, checkForAuth } = useAuthStore(
    (state) => ({
      isAuthed: state.isAuthed,
      login: state.login,
      hasError: state.hasError,
      nullifyErr: state.nullifyErr,
      checkForAuth: state.checkForAuth,
    }),
    shallow
  );

  const [alert, setAlert] = useState<boolean | string>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkForAuth();
  }, []);

  useEffect(() => {
    if (typeof isAuthed !== "undefined" && isAuthed) {
      navigate("/dashboard");
    }
  }, [isAuthed]);

  useEffect(() => {
    if (hasError) {
      setAlert("Invalid credentials");
      nullifyErr();
    }
  }, [hasError]);

  const loginHandler = (event: FormEvent) => {
    event.preventDefault();

    const userEmail = emailRef.current!.value;
    const userPassword = passwordRef.current!.value;

    if (!userEmail || !userPassword || userEmail.trim() === "" || userPassword.trim() === "") {
      setAlert("Please fix your form inputs format!");
      return;
    }

    login(userEmail, userPassword);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (alert) {
      timer = setTimeout(() => {
        setAlert(false);
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [alert]);

  return (
    <Container padding={15}>
      <Heading size={700}>Artismin - Admin Dashboard for Artisans.</Heading>
      <Text>Welcome back. Please enter you cresidentials.</Text>
      <Card
        marginTop={100}
        boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
        paddingX={10}
        paddingY={20}
        textAlign="left"
      >
        {alert && (
          <Alert intent="warning" marginY={10}>
            {alert}
          </Alert>
        )}
        <form onSubmit={loginHandler}>
          <TextInputField
            label="Email Address"
            labelFor="email"
            hint="Please enter your email address"
            isRequired
            type="email"
            ref={emailRef}
          />
          <TextInputField
            label="Password"
            labelFor="password"
            hint="Please enter your password"
            type="password"
            isRequired
            ref={passwordRef}
          />
          <Button>Login</Button>
        </form>
      </Card>
    </Container>
  );
}
