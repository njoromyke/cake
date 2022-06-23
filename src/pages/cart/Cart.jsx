import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
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
import NavBar from "../../components/NavBar";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart } = useCart();
  console.log(cart);
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
          }}
          component="div"
          variant="h3"
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <Avatar src={item.image} />
                        </TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
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
                    <Button variant="contained" color="primary">
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
