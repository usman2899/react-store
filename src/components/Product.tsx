import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Alert from "../test/Alert";
import DeleteButton from "./DeleteButton";

interface Product {
  id: number;
  name: string;
  quantity: number;
}

export default function Product() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [alertMessage, setAlertMessage] = useState("");

  const heading: React.CSSProperties = {
    textAlign: "center",
    color: "blue",
  };
  const button: React.CSSProperties = {
    textAlign: "center",
    color: "secondary",
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    const product = { name, quantity };
    console.log(product);
    fetch("http://0.0.0.0:8020/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          setAlertMessage("Product added successfully");
          fetchProducts();
        } else {
          setAlertMessage("Failed to add product");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setAlertMessage("An error occurred");
      });
  };
  const fetchProducts = () => {
    fetch("http://localhost:8020/product")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  };

  const handleDelete = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={heading}>Add product</h1>
        {alertMessage && <Alert>{alertMessage}</Alert>}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Product name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Product quantity"
            variant="outlined"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Button color="primary" variant="contained" onClick={handleClick}>
            Add product
          </Button>
        </Box>
      </Paper>
      <h1 style={heading}>Products</h1>
      <Paper elevation={3} style={paperStyle}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    <DeleteButton
                      productId={product.id}
                      onDelete={handleDelete}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
