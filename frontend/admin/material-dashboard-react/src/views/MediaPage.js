import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { MEDIA_QUERY } from "graphql/Queries/media.graphql";
import { CATEGORIES_QUERY } from "graphql/Queries/categories.graphql";
import {
  CREATE_MEDIA_MUTATION,
  UPDATE_MEDIA_MUTATION,
  DELETE_MEDIA_MUTATION,
} from "graphql/Mutations/media.graphql";

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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const MediaPage = () => {
  // Fetch media items
  const { data, loading, error, refetch } = useQuery(MEDIA_QUERY);

  // Fetch categories
  const {
    data: catData,
    loading: catLoading,
    error: catError,
  } = useQuery(CATEGORIES_QUERY);

  const categories = catData?.categories?.data || [];
  console.log("Categories:", categories);

  const categoryMap = React.useMemo(() => {
  const map = {};
  categories.forEach(cat => {
    map[cat.id] = cat.name;
  });
  return map;
}, [categories]);
  console.log("Category Map:", categoryMap);

  // Mutations
  const [createMedia] = useMutation(CREATE_MEDIA_MUTATION);
  const [updateMedia] = useMutation(UPDATE_MEDIA_MUTATION);
  const [deleteMedia] = useMutation(DELETE_MEDIA_MUTATION);

  // Form state
  const [form, setForm] = useState({ name: "", url: "", category_id: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateMedia({ variables: { input: form } });
      } else {
        await createMedia({ variables: { input: form } });
      }
      setForm({ name: "", url: "", category_id: "" });
      setIsEditing(false);
      refetch();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error saving media");
    }
  };

  const handleEdit = (media) => {
    setForm({
      id: media.id,
      name: media.name,
      url: media.url,
      category_id: media.category?.id || "",
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;
    try {
      await deleteMedia({ variables: { input: { id } } });
      refetch();
    } catch (err) {
      console.error(err);
      alert("Error deleting media");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Box py={3}>
        {/* Media Table */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h5" mb={2}>
            Media Gallery
          </Typography>

          {loading && <Typography>Loading media...</Typography>}
          {error && <Typography color="error">{error.message}</Typography>}

          {!loading && !error && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.medias.data.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>{m.name}</TableCell>
                    <TableCell>{m.url}</TableCell>
                    <TableCell>{m.category?.name || "-"}</TableCell>
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
                        onClick={() => handleEdit(m)}
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
                        onClick={() => handleDelete(m.id)}
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

        {/* Media Form */}
        <Card sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" mb={2}>
            {isEditing ? "Edit Media" : "Add Media"}
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
              name="url"
              label="URL"
              value={form.url || ""}
              onChange={handleChange}
              required
            />
            <Select
              name="category_id"
              value={form.category_id || ""}
              onChange={handleChange}
              displayEmpty
              required
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#1976d2", color: "#fff" }}
            >
              {isEditing ? "Update Media" : "Add Media"}
            </Button>
          </Box>
        </Card>
      </Box>

      <Footer />
    </DashboardLayout>
  );
};

export default MediaPage;
