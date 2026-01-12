import React from "react";
import { List, Datagrid, TextField, EmailField } from "react-admin";

export const UserList: React.FC = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
        </Datagrid>
    </List>
);
