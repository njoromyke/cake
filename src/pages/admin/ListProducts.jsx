import * as React from "react";
import {
  Avatar,
  Backdrop,
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
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function ListProducts() {
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
        return <> {params.row.name} </>;
      },
    },
    {
      field: "price",
      width: 200,
      headerName: "Price",
      renderCell: (params) => {
        return <> {params.row.price} </>;
      },
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        return <Avatar src={params.row.image} />;
      },
    },
   

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/products/${params.row.id}`}>
              <ModeEditOutlineOutlined
                style={{
                  color: palette.primary.main,
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              />
            </Link>
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

  const roomsRef = collection(db, "products");

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
        const data = await getDocs(roomsRef);
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

  console.log(data);
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
              onClick={() => navigate("/admin/products/add")}
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
