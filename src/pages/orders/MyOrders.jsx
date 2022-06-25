import * as React from "react";
import {
  Avatar,
  Backdrop,
  Badge,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import DataGridComponent from "../../components/DataGridComponent";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Circle,
  DeleteOutline,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";
import NavBar from "../../components/NavBar";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export default function MyOrders() {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [success, setSuccess] = React.useState(false);

  const columns = [
    {
      field: "name",
      width: 200,
      headerName: "Name",
      renderCell: (params) => {
        return (
          <>
            {params.row.orderItems.items.map((item) => (
              <div>{item.name}</div>
            ))}
          </>
        );
      },
    },
    {
      field: "price",
      width: 200,
      headerName: "Price",
      renderCell: (params) => {
        return (
          <>
            {params.row.orderItems.items.map((item) => (
              <div>{item.price}</div>
            ))}
          </>
        );
      },
    },
    {
      field: "status",
      width: 200,
      headerName: "Payment Status",
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "paid" ? (
              <Typography color="primary">Paid</Typography>
            ) : (
              <Typography color="danger">Pending</Typography>
            )}
          </>
        );
      },
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.orderItems.items.map((item) => (
              <Avatar src={item.image} />
            ))}
          </>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.orderItems.items.map((item) => (
              <div>{item.quantity}</div>
            ))}
          </>
        );
      },
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      width: 150,
      renderCell: (params) => <>{params.row.totalPrice}</>,
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="delIcon"
              sx={{
                cursor: "pointer",
                color: palette.error.main,
              }}
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  const userInfo = getAuth().currentUser;

  const ordersRef = collection(db, "orders");

  React.useEffect(() => {
    if (userInfo && !userInfo.uid) {
      navigate("/", { replace: true });
    }
    if (success) {
      toast("Product deleted successfully");
    }
    async function fetchData() {
      setLoading(true);
      try {
        const q = await query(
          ordersRef,
          where("user.email", "==", userInfo.email)
        );
        const data = await getDocs(q);
        setData(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    fetchData();
  }, [success, userInfo, navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the Product?")) {
      try {
        setLoading(true);
        const productDoc = doc(db, "products", id);
        await deleteDoc(productDoc);
        setData(data.filter((product) => product.id !== id));
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <NavBar />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          {error && (
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          )}

          {data && (
            <DataGridComponent
              buttonTitle={"Add Product"}
              title={"Product List"}
              columns={columns}
              rows={data}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
