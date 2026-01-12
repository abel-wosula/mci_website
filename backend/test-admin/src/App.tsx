import { Admin, Resource } from "react-admin";
import type { DataProvider } from "ra-core";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import { UserList } from "./users";
import { UserCreate } from "./UserCreate";
import { UserEdit } from "./UserEdit";

export const App = () => (
    <Admin layout={Layout} dataProvider={dataProvider as DataProvider}>
        <Resource
            name="User"
            list={UserList}
            create={UserCreate}
            edit={UserEdit}
        />
    </Admin>
);
