import { Heading, Text, Card, TextInputField, Button, Alert, Pane } from "evergreen-ui";
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
  const [isLoading, setIsLoading] = useState(false);

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

  const loginHandler = async (event: FormEvent) => {
    event.preventDefault();

    const userEmail = emailRef.current?.value;
    const userPassword = passwordRef.current?.value;

    if (!userEmail || !userPassword || userEmail.trim() === "" || userPassword.trim() === "") {
      setAlert("Please fix your form inputs format!");
      return;
    }

    setIsLoading(true);
    await login(userEmail, userPassword);
    setIsLoading(false);
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
      <Pane maxWidth={450} marginX="auto">
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
              hint="Please enter your email address"
              required
              type="email"
              ref={emailRef}
              autoComplete="email"
            />
            <TextInputField
              label="Password"
              hint="Please enter your password"
              type="password"
              required
              ref={passwordRef}
              autoComplete="current-password"
            />
            <Button isLoading={isLoading}>Login</Button>
          </form>
        </Card>
      </Pane>
    </Container>
  );
}
