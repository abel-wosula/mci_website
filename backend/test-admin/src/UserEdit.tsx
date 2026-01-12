import { Edit, SimpleForm, TextInput, required } from "react-admin";
export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            {/* ID is provided by React Admin, no input needed */}
            <TextInput source="name" validate={required()} />
            <TextInput source="email" type="email" validate={required()} />

            {/* Include only fields allowed by UpdateUserInput */}
            {/* Example: optional password update */}
            <TextInput source="password" type="password" />
        </SimpleForm>
    </Edit>
);
