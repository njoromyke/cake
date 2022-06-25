import React from "react";
import { useTheme } from "@emotion/react";
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import Form from "../../components/form/Form";
import InputComponent from "../../components/form/InputComponent";
import SubmitButton from "../../components/form/SubmitButton";
import { db } from "../../config/firebase";

const validationSchema = Yup.object().shape({
  image: Yup.string().required("Image is required"),
  price: Yup.number().required("Price is required"),
  description: Yup.string().required("Description is required"),
});

const EditProduct = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [product, setData] = React.useState({});

  const { palette } = useTheme();

  const navigate = useNavigate();

  const user = getAuth().currentUser;
  const params = useParams();
  const productsRef = collection(db, "products");

  useEffect(() => {
    if (user && !user.uid) {
      navigate("/login", { replace: true });
    }
    async function fetchData() {
      setLoading(true);
      try {
        const productDoc = await doc(db, "products", params.id);

        const product = await getDoc(productDoc);
        setData(product.data());

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }
    fetchData();
  }, [navigate, params.id]);

  const handleSubmit = async ({ name, image, price, description }) => {
    setLoading(true);
    try {
      const editedproduct = {
        image,
        description,
        price: parseInt(price),
        name,
      };
      const vDoc = await doc(db, "products", params.id);

      await updateDoc(vDoc, editedproduct);
      navigate("/admin/products");
      toast.success("product updated successfully");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Container draggable>
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
          backgroundColor: palette.background.default,
        }}
      >
        {error && <Typography color="error">{error}</Typography>}

        <Typography variant="h5" component="h2">
          Edit product
        </Typography>
        <>
          {product && product.name && (
            <Form
              initialValues={{
                name: product.name,
                image: product.image,
                price: product.price,
                description: product.description,

              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputComponent label="name" />
                </Grid>

                <Grid item xs={6}>
                  <InputComponent label="price" />
                </Grid>
                <Grid item xs={6}>
                  <InputComponent label="image" />
                </Grid>
                <Grid item xs={12}>
                  <InputComponent label="description" multiline row={4} />
                </Grid>

                <Grid item xs={6}>
                  <SubmitButton title={"Edit product"} />
                </Grid>
              </Grid>
            </Form>
          )}
        </>
      </Box>
    </Container>
  );
};

export default EditProduct;
