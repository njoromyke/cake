import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Form from "../../components/form/Form";
import InputComponent from "../../components/form/InputComponent";
import NavBar from "../../components/NavBar";
import SubmitButton from "../../components/form/SubmitButton";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import moment from "moment";

const socket = io("https://occipital-iron-ounce.glitch.me/");

const validationSchema = Yup.object().shape({
  phone: Yup.string().required("Name is required"),
  location: Yup.string().required("Location is required"),
});

const CheckOut = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const[deliveryLoc, setDeliveryLoc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [res, setRes] = useState("");

  const { cart } = useCart();

  const handleSubmit = (values) => {
    setPhoneNumber(values.phone);
    setDeliveryLoc(values.location);  };

  socket.on("connect", () => {
    console.log("connected");
  });
  socket.on("querying", (response) => {
    setLoading(true);
  });

  socket.on("queried", (response) => {
    setRes(response);
  });

  const requestStkPush = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "https://occipital-iron-ounce.glitch.me/mpesa"
      );
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };
  const navigate = useNavigate();

  async function createOrder() {
    const ordersDoc = await collection(db, "orders");
    const order = {
      phoneNumber,
      location: deliveryLoc,
      orderItems: cart,
      totalPrice: cart.totalPrice,
      status: "paid",
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      paymentMethod: "mpesa",
    };
    const docRef = await addDoc(ordersDoc, order);
    console.log(docRef);
    if (docRef) {
      toast.success("Order created successfully");
      navigate("/orders");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (res && res === "Request cancelled by user") {
      setRes(null);
      toast.error("Request cancelled by user", {
        theme: "colored",
        hideProgressBar: true,
      });
      setLoading(false);
    }
    if (res === "The service request is processed successfully.") {
      setRes(null);
      createOrder();
    }

    if (res === "The initiator information is invalid.") {
      toast.error("The initiator information is invalid.");
    }
  }, [res]);

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
              {loading && (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={true}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}

              <Paper>
                <Typography
                  sx={{
                    mb: 3,
                  }}
                  component="div"
                  variant="h6"
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
                  variant="h6"
                >
                  Total Price : {cart.totalPrice}
                </Typography>
                <Button
                  variant="contained"
                  disabled={phoneNumber === ""}
                  onClick={requestStkPush}
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
