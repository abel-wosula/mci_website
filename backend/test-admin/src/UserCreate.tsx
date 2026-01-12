import { Create, SimpleForm, TextInput, required } from "react-admin";

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="email" type="email" validate={required()} />
            <TextInput source="password" validate={required()} />
        </SimpleForm>
    </Create>
);
