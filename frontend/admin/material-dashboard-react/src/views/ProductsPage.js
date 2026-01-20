import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { PRODUCTS_QUERY } from "graphql/Queries/products.graphql";
import {
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
} from "graphql/Mutations/products.graphql";

// Material Dashboard components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const ProductsPage = () => {
  const { data, loading, error, refetch } = useQuery(PRODUCTS_QUERY);
  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION);

  const [form, setForm] = useState({
    name: "",
    description: "",
    image_url: "",
    category_id: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateProduct({ variables: { input: form } });
      } else {
        await createProduct({ variables: { input: form } });
      }
      setForm({ name: "", description: "", image_url: "", category_id: "" });
      setIsEditing(false);
      refetch();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error saving product");
    }
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      image_url: product.image_url,
      category_id: product.category_id,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct({ variables: { input: { id } } });
      refetch();
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Box py={3}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h5" mb={2}>
            Products
          </Typography>

          {loading && <Typography>Loading products...</Typography>}
          {error && <Typography color="error">{error.message}</Typography>}

          {!loading && !error && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Category ID</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.products.data.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.description}</TableCell>
                    <TableCell>
                      {p.image_url && (
                        <img src={p.image_url} alt={p.name} width="60" />
                      )}
                    </TableCell>
                    <TableCell>{p.category_id}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          mr: 1,
                          backgroundColor: "#FFC107",
                          color: "#fff",
                          "&:hover": { backgroundColor: "#FFB300" },
                        }}
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          backgroundColor: "#d32f2f",
                          color: "#fff",
                          "&:hover": { backgroundColor: "#b71c1c" },
                        }}
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>

        <Card sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" mb={2}>
            {isEditing ? "Edit Product" : "Add Product"}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            gap={2}
            flexWrap="wrap"
          >
            <TextField
              name="name"
              label="Name"
              value={form.name || ""}
              onChange={handleChange}
              required
            />
            <TextField
              name="description"
              label="Description"
              value={form.description || ""}
              onChange={handleChange}
              required
            />
            <TextField
              name="image_url"
              label="Image URL"
              value={form.image_url || ""}
              onChange={handleChange}
            />
            <TextField
              name="category_id"
              label="Category ID"
              value={form.category_id || ""}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained">
              {isEditing ? "Update Product" : "Add Product"}
            </Button>
          </Box>
        </Card>
      </Box>

      <Footer />
    </DashboardLayout>
  );
};

export default ProductsPage;
