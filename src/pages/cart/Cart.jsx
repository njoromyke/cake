import { DeleteForever } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  return (
    <>
      <NavBar />
      <Box
        xs={{
          mt: 5,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            mb: 3,
            mt: 4,
          }}
          component="div"
          variant="h6"
        >
          Cart
        </Typography>
        <Container fluid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.items.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Typography
                            sx={{
                              textAlign: "center",
                              mb: 3,
                            }}
                            component="div"
                            variant="h6"
                          >
                            Cart is empty
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                    {cart.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Link href={`/products/${item.id}`}>{item.name}</Link>
                        </TableCell>
                        <TableCell>
                          <Avatar src={item.image} />
                        </TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              removeFromCart(item);
                            }}
                          >
                            <DeleteForever />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Total: {cart.total}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Total Price: {cart.totalPrice}
                  </Typography>
                  <CardActions>
                    <Button
                      onClick={() => navigate("/checkout")}
                      variant="contained"
                      color="primary"
                      disabled={cart.items.length === 0}
                    >
                      Checkout
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Cart;
