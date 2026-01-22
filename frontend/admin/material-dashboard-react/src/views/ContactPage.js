import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CONTACTS_QUERY } from "graphql/Queries/contacts.graphql";
import {
    CREATE_CONTACT_MUTATION,
  DELETE_CONTACT_MUTATION,
} from "graphql/Mutations/contacts.graphql";

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

const ContactPage = () => {
  const { data, loading, error, refetch } = useQuery(CONTACTS_QUERY);
    const [createContact] = useMutation(CREATE_CONTACT_MUTATION);
    const [deleteContact] = useMutation(DELETE_CONTACT_MUTATION);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContact({
        variables: {
          input: {
            name: form.name,
            email: form.email,
            message: form.message,
          },
        },
      });

      setForm({
        name: "",
        email: "",
        message: "",
      });

      refetch();
      alert("Message sent successfully");
    } catch (err) {
      console.error(err);
      alert(err.message || "Error sending message");
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await deleteContact({ variables: { input: { id } } });
      refetch();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error deleting contact");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Box py={3}>
        {/* Contacts Table */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h5" mb={2}>
            Contacts Messages
          </Typography>

          {loading && <Typography>Loading contacts...</Typography>}
          {error && <Typography color="error">{error.message}</Typography>}
          {!loading && !error && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.contacts.data.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>
                      {c.message.length > 50
                        ? c.message.substring(0, 50) + "..."
                        : c.message}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          backgroundColor: "#d32f2f",
                          color: "#fff",
                          "&:hover": { backgroundColor: "#b71c1c" },
                        }}
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

      </Box>

      <Footer />
    </DashboardLayout>
  );
};

export default ContactPage;
