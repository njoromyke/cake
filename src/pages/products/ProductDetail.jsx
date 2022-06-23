import { ShoppingBasketOutlined } from "@mui/icons-material";
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
import { Box, Container } from "@mui/system";
import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { db } from "../../config/firebase";
import { useCart } from "../../context/CartContext";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const navigate = useNavigate();

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const productDoc = doc(db, "products", params.id);
      const data = await getDoc(productDoc);
      setProduct(data.data());
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [params]);

  const { addToCart, cart, updateProductQty } = useCart();
  const qty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const p = cart.items.find((p) => p.id === product.id);
  console.log(p);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          mt: 5,
        }}
      >
        <Container>
          <Typography
            sx={{
              textAlign: "center",
              mb: 3,
            }}
            component="div"
            variant="h3"
          >
            View Product
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card sx={{ minWidth: 300 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt="green iguana"
                  />
                </Card>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Kes
                    {product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product?.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity{" "}
                    <select
                      style={{
                        width: "100px",
                        marginLeft: "10px",
                        marginRight: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        padding: "5px",
                      }}
                      onChange={(e) =>
                        updateProductQty(params.id, parseInt(e.target.value))
                      }
                    >
                      {qty.map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Price:{" "}
                    {cart.items.find((p) => p.id === product.id)
                      ? cart.items.find((p) => p.id === product.id).quantity *
                        product.price
                      : 0}
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
                    onClick={() => navigate(`/cart`)}
                    variant="contained"
                  >
                    View Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ProductDetail;
