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
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Form from "../../components/form/Form";
import InputComponent from "../../components/form/InputComponent";
import SubmitButton from "../../components/form/SubmitButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name").min(4),
  email: Yup.string().required().label("Email").email(),
  password: Yup.string()
    .required("Password is required")
    .label("Password")
    .min(4),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number is not valid"),
});
const RegisterScreen = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const user = getAuth().currentUser;

  //digital clock
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user && user.uid) {
      navigate("/home", { replace: true });
    }
  }, [navigate, user]);

  const handleSubmit = async ({ email, password, phoneNumber, name }) => {
      setLoading(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      if (cred) {
        const userId = cred.user.uid;
        const userData = {
          email: email,
          phoneNumber: phoneNumber,
          name: name,
          isAdmin: false,
        };
        await setDoc(doc(db, "users", userId), userData);
      }
      navigate("/home", { replace: true });
    } catch (error) {
      setError(error.message);
      setLoading(false)
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
                  {error && <Alert severity="error">{error}</Alert>}

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "heading",
                      textAlign: "center",
                    }}
                    gutterBottom
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
                    Sign up for an account
                  </Typography>
                  <Form
                    onSubmit={handleSubmit}
                    initialValues={{
                      name: "",
                      email: "",
                      password: "",
                      phoneNumber: "",
                    }}
                    validationSchema={validationSchema}
                  >
                    <InputComponent label="name" type="text" />
                    <InputComponent label="email" type="email" />
                    <InputComponent label="password" type="password" />
                    <InputComponent label="phoneNumber" type="number" />
                    <SubmitButton title={`Register`} />
                  </Form>
                  <Typography variant="body1">
                    Already have an account?
                    <Link href="/" color="primary">
                      Sign In
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

export default RegisterScreen;
