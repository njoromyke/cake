import { Alert, Button, Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import * as Yup from "yup";
import React, { useState } from "react";
import Form from "../../components/form/Form";
import InputComponent from "../../components/form/InputComponent";
import NavBar from "../../components/NavBar";
import SubmitButton from "../../components/form/SubmitButton";
import { useCart } from "../../context/CartContext";

const validationSchema = Yup.object().shape({
  phone: Yup.string().required("Name is required"),
  location: Yup.string().required("Location is required"),
});

const CheckOut = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  const { cart } = useCart();

  const handleSubmit = (values) => {
    setPhoneNumber(values.phone);
    console.log(values);
  };
  return (
    <>
      <NavBar />
      <Box
        sx={{
          mt: 5,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            mb: 3,
          }}
          component="div"
          variant="h3"
        >
          CheckOut
        </Typography>
        <Container>
          <Grid container spacing={3}>
            <>
              <Form
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                initialValues={{
                  location: "",
                  phone: "",
                }}
              >
                <Grid item xs={6} md={6}>
                  <InputComponent label="location" type="text" required />
                </Grid>
                <Grid item xs={6} md={6}>
                  <InputComponent label="phone" type="text" required />
                </Grid>
                <Grid item xs={6} md={6}>
                  <SubmitButton title="Submit" />
                </Grid>
              </Form>
            </>
            <Grid item xs={12} md={12}>
              <Paper>
                <Typography
                  sx={{
                    mb: 3,
                  }}
                  component="div"
                  variant="h5"
                >
                  Lipa na Mpesa
                </Typography>
                <Alert severity="info">
                  <Typography variant="body2" color="text.secondary">
                    Please ensure your phone number is correct.
                  </Typography>
                </Alert>

                <Typography
                  sx={{
                    mb: 3,
                  }}
                  component="div"
                  variant="h5"
                >
                  Total Price : {cart.totalPrice}
                </Typography>
                <Button
                  variant="contained"
                  disabled={phoneNumber === ""}
                  sx={{
                    mb: 3,
                    mt: 3,
                    float: "left",
                  }}
                  color="primary"
                >
                  Request Stk Push
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CheckOut;
