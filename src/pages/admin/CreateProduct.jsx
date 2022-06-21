import React from "react";
import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import SubmitButton from "../../components/form/SubmitButton";
import Form from "../../components/form/Form";
import InputComponent from "../../components/form/InputComponent";
import NavBar from "../../components/NavBar";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  image: Yup.string().required("Image is required"),
  price: Yup.number().required("Price is required"),
});

const CreateProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  useEffect(() => {}, []);

  const productsRef = collection(db, "products");

  const handleSubmit = async ({ name, image, price }) => {
    setLoading(true);
    try {
      const products = {
        name,
        image,
        price: parseInt(price),
      };
      const createProduct = await addDoc(productsRef, products);
      if (createProduct) {
        toast.success("products created successfully");
        navigate("/products");
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        {loading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 10,
          }}
        >
          {error && <Typography color="error">{error}</Typography>}

          <Typography variant="h5" component="h2">
            Add products
          </Typography>
          <>
            <Form
              initialValues={{
                name: "",
                image: "",
                price: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <InputComponent label="name" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputComponent label="image" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputComponent label="price" />
                </Grid>
                <Grid
                  item
                  md={12}
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <SubmitButton title={"Add Product"} />
                </Grid>
              </Grid>
            </Form>
          </>
        </Box>
      </Container>
      <>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                component="p"
                variant="p"
                sx={{
                  textAlign: "center",
                }}
              >
                &copy; Cake ordering {moment().format("YYYY")} All rights
                reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </>
    </>
  );
};

export default CreateProduct;
