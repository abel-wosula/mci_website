import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CATEGORIES_QUERY } from "graphql/Queries/categories.graphql";
import {
  CREATE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
} from "graphql/Mutations/categories.graphql";

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

const CategoriesPage = () => {
  const { data, loading, error, refetch } = useQuery(CATEGORIES_QUERY);
  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION);
  const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION);
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION);

  const [form, setForm] = useState({ id: null, name: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateCategory({ variables: { input: form } });
      } else {
        await createCategory({ variables: { input: { name: form.name } } });
      }
      setForm({ id: null, name: "" });
      setIsEditing(false);
      refetch();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error saving category");
    }
  };

  const handleEdit = (category) => {
    setForm({ id: category.id, name: category.name });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory({ variables: { input: { id } } });
      refetch();
    } catch (err) {
      console.error(err);
      alert("Error deleting category");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h5" mb={2}>Categories</Typography>
          {loading && <Typography>Loading categories...</Typography>}
          {error && <Typography color="error">{error.message}</Typography>}

          {!loading && !error && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.categories.data.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ mr: 1, backgroundColor: "#FFC107", color: "#fff", "&:hover": { backgroundColor: "#FFB300" } }}
                        onClick={() => handleEdit(c)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ backgroundColor: "#d32f2f", color: "#fff", "&:hover": { backgroundColor: "#b71c1c" } }}
                        onClick={() => handleDelete(c.id)}
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
          <Typography variant="h6" mb={2}>{isEditing ? "Edit Category" : "Add Category"}</Typography>
          <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} flexWrap="wrap">
            <TextField
              name="name"
              label="Name"
              value={form.name || ""}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
              {isEditing ? "Update Category" : "Add Category"}
            </Button>
          </Box>
        </Card>
      </Box>
      <Footer />
    </DashboardLayout>
  );
};

export default CategoriesPage;
