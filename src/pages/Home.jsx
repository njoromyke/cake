import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import CustomCarousel from "../components/CustomCarousel";
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

const Home = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const { addToCart, removeFromCart, cart } = useCart();

  console.log(cart);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          mt: 10,
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
          {products.map((product) => (
            <Grid item xs={12} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt="green iguana"
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
                  <Button variant="contained">Buy now</Button>
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
