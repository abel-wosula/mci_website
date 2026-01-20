import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { USERS_QUERY } from "graphql/Queries/users.graphql";
import {
  CREATE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  DELETE_USER_MUTATION,
} from "graphql/Mutations/users.graphql";

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

const UsersPage = () => {
  const { data, loading, error, refetch } = useQuery(USERS_QUERY);
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isEditing) {
      const input = {
        id: form.id,
        name: form.name,
        email: form.email,
      };

      // Only send password if user typed one
      if (form.password) {
        input.password = form.password;
      }

      await updateUser({
        variables: { input },
      });
    } else {
      await createUser({
        variables: {
          input: {
            name: form.name,
            email: form.email,
            password: form.password,
          },
        },
      });
    }

    setForm({ id: null, name: "", email: "", password: "" });
    setIsEditing(false);
    refetch();
  } catch (err) {
    console.error(err);
    alert(err.message || "Error saving user");
  }
};

  const handleEdit = (user) => {
  setForm({
    id: user.id,
    name: user.name,
    email: user.email,
    password: "",
  });
  setIsEditing(true);
};


const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;
  try {
    await deleteUser({ variables: { input: { id } } });
    refetch();
  } catch (err) {
    console.error(err);
    alert(err.message || "Error deleting user");
  }
};

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Box py={3}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h5" mb={2}>
            Users
          </Typography>

          {loading && <Typography>Loading users...</Typography>}
          {error && <Typography color="error">{error.message}</Typography>}

          {!loading && !error && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              {data.users.data.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    {/* Edit button - yellow background, white text */}
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ mr: 1, backgroundColor: "#FFC107", color: "#fff", "&:hover": { backgroundColor: "#FFB300" } }}
                      onClick={() => handleEdit(u)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      sx={{ backgroundColor: "#d32f2f", color: "#fff", "&:hover": { backgroundColor: "#b71c1c" } }}
                      onClick={() => handleDelete(u.id)}
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
            {isEditing ? "Edit User" : "Add User"}
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
              name="email"
              label="Email"
              value={form.email || ""}
              onChange={handleChange}
              required
            />
            {!isEditing && (
              <TextField
                name="password"
                label="Password"
                type="password"
                value={form.password || ""}
                onChange={handleChange}
                required
              />
            )}
            <Button type="submit" variant="contained">
              {isEditing ? "Update User" : "Add User"}
            </Button>
          </Box>
        </Card>
      </Box>

      <Footer />
    </DashboardLayout>
  );
};

export default UsersPage;
