import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import NavBar from "../components/NavBar";
import { db } from "../config/firebase";
import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ShoppingBasketOutlined } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const Home = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const productRef = collection(db, "products");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getDocs(productRef);
      setProduct(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

const {palette} = useTheme();
  return (
    <>
      <NavBar />
      <Grid item xs={12} md={12}>
        <div
          style={{
            backgroundImage:
              "url(https://t4.ftcdn.net/jpg/02/70/23/75/360_F_270237541_1hPJQvxemM7NkWBHVYqmVyFc8I74tw1k.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            width: "100%",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            // darken is used to darken the background image
            backgroundColor: palette.type === "dark" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.5)",
          }}
        >
          <h2 style={{
            color: palette.primary.main,
            fontSize: "2rem",
            fontWeight: "bold",
            zIndex: "1",
          }}>Welcome to Cakerize ecommerce app</h2>
        </div>
      </Grid>
      <Box
        sx={{
          mt: 10,
          px: 3,
        }}
      >
        <Grid container spacing={3}>
          {loading && (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}

          <Grid item xs={12} md={12}>
            <Typography
              variant="h4"
              sx={{ textAlign: "center" }}
              component="h2"
            >
              Latest Products
            </Typography>
          </Grid>

          {products.map((product) => (
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  maxWidth: "300px",
                  mb: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={product.image}
                  alt="green iguana"
                  placeholder="loading..."
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Kes {product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingBasketOutlined />}
                    onClick={() => addToCart(product)}
                  >
                    Add To Card
                  </Button>
                  <Button
                    onClick={() => navigate(`/products/${product.id}`)}
                    products
                    variant="contained"
                  >
                    Buy now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
