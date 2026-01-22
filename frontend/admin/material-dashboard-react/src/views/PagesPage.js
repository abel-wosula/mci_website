import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { PAGES_QUERY } from "graphql/Queries/pages.graphql";
import {
  CREATE_PAGE_MUTATION,
  UPDATE_PAGE_MUTATION,
  DELETE_PAGE_MUTATION,
} from "graphql/Mutations/pages.graphql";

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

const PagesPage = () => {
  const { data, loading, error, refetch } = useQuery(PAGES_QUERY);
  const [createPage] = useMutation(CREATE_PAGE_MUTATION);
  const [updatePage] = useMutation(UPDATE_PAGE_MUTATION);
  const [deletePage] = useMutation(DELETE_PAGE_MUTATION);

  const [form, setForm] = useState({
    id: null,
    title: "",
    slug: "",
    content: "",
    status_id: "",
    is_published: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updatePage({
          variables: {
            input: {
              id: Number(form.id),
              title: form.title,
              slug: form.slug,
              content: form.content,
              status_id: Number(form.status_id),
              is_published: form.is_published,
            },
          },
        });
      } else {
        await createPage({
          variables: {
            input: {
              title: form.title,
              slug: form.slug,
              content: form.content,
              status_id: Number(form.status_id),
              is_published: form.is_published,
            },
          },
        });
      }

      setForm({
        id: null,
        title: "",
        slug: "",
        content: "",
        status_id: "",
        is_published: form.is_published,
      });
      setIsEditing(false);
      refetch();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error saving page");
    }
  };

  const handleEdit = (page) => {
    setForm({
      id: page.id,
      title: page.title,
      slug: page.slug,
      content: page.content,
      status_id: page.status_id,
      is_published: page.is_published,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;
    try {
      await deletePage({
        variables: {
          input: { id: Number(id) },
        },
      });
      refetch();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error deleting page");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Box py={3}>
        {/* Pages Table */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h5" mb={2}>
            Pages
          </Typography>

          {loading && <Typography>Loading pages...</Typography>}
          {error && <Typography color="error">{error.message}</Typography>}

          {!loading && !error && (
            <Table>
             <TableHead>
  <TableRow>
    <TableCell>Title</TableCell>
    <TableCell>Slug</TableCell>
    <TableCell>Status</TableCell>
    <TableCell>Published</TableCell>
    <TableCell>Actions</TableCell>
  </TableRow>
    </TableHead>

    <TableBody>
    {data.pages.data.map((p) => (
        <TableRow key={p.id}>
        <TableCell>{p.title ?? "-"}</TableCell>
        <TableCell>{p.slug ?? "-"}</TableCell>
        <TableCell>{p.status_id ?? "-"}</TableCell>

        {/* Convert boolean to readable text */}
        <TableCell>{p.is_published ? "Yes" : "No"}</TableCell>

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

        {/* Page Form */}
        <Card sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" mb={2}>
            {isEditing ? "Edit Page" : "Add Page"}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            gap={2}
            flexWrap="wrap"
          >
            <TextField
              name="title"
              label="Title"
              value={form.title}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              name="slug"
              label="Slug"
              value={form.slug}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              name="status_id"
              label="Status ID"
              type="number"
              value={form.status_id}
              onChange={handleChange}
              required
            />

            <TextField
              name="content"
              label="Content"
              value={form.content}
              onChange={handleChange}
              multiline
              rows={5}
              fullWidth
              required
                      />
            <TextField
              name="is_published"
              label="Is Published"
              type="checkbox"
              value={form.is_published}
              onChange={handleChange}
            />

            <Button type="submit" variant="contained">
              {isEditing ? "Update Page" : "Create Page"}
            </Button>
          </Box>
        </Card>
      </Box>

      <Footer />
    </DashboardLayout>
  );
};

export default PagesPage;
