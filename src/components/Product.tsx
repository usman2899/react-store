import { Button, Container, Paper } from "@material-ui/core";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

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
    }).then(() => console.log("New product added"));
  };

  useEffect(() => {
    fetch("http://localhost:8020/product")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);
  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={heading}>Add product</h1>
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
        {products.map((product) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={product.id}
          >
            Id:{product.id}
            <br />
            Name:{product.name}
            <br />
            Quantity:{product.quantity}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
