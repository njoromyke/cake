import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useTheme } from "@emotion/react";
import Grid from "@mui/material/Grid";
import {
  Alert,
  Backdrop,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserAuth } from "../../context/UserAuthContext";
import { getAuth } from "firebase/auth";
import InputComponent from "../../components/form/InputComponent";
import SubmitButton from "../../components/form/SubmitButton";
import Form from "../../components/form/Form";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().label("Email").email(),
  password: Yup.string().required().label("Password").min(4),
});
const LoginScreen = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  //digital clock

  const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //user auth
  const user = getAuth().currentUser;

  React.useEffect(() => {
    if (user && user.uid) {
      navigate("/home", { replace: true });
      toast.success("Login Successful");
    }
  }, [navigate,user]);

  const { login } = useUserAuth();

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      await login(email, password);
      navigate("/home", { replace: true });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: palette.primary.main,
        height: "100vh",
        width: "100vw",
        display: "flex",
      }}
    >
      <Container maxWidth="sm">
        {loading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Grid item xs={12} md={12} m={"auto"}>
            <Card variant="outlined">
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {error && (
                    <Alert severity="error" color="error">
                      {error}{" "}
                    </Alert>
                  )}

                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "heading",
                      textAlign: "center",
                    }}
                  >
                    {time}
                  </Typography>

                  <Typography
                    variant="h5"
                    component="h2"
                    style={{
                      color: palette.primary.main,
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    Login
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{
                      color: palette.primary.main,
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  ></Typography>
                  <Form
                    onSubmit={handleSubmit}
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                  >
                    <InputComponent label="email" type="email" />
                    <InputComponent label="password" type="password" />
                    <SubmitButton title={`Login`} />
                  </Form>
                  <Typography variant="body1">
                    Don't have an account?
                    <Link href="/signup" color="primary">
                      Sign Up
                    </Link>
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoginScreen;
