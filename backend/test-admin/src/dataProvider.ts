import { DataProvider } from "react-admin";
import { gql } from "graphql-request";
import { client } from "./graphqlclient";

const dataProvider: Partial<DataProvider> = {
    getList: async (_resource, params) => {
        const query = gql`
            query GetUsers($page: Int!, $first: Int!) {
                users(page: $page, first: $first) {
                    data {
                        id
                        name
                        email
                    }
                    paginatorInfo {
                        total
                    }
                }
            }
        `;

        const variables = {
            page: params.pagination.page,
            first: params.pagination.perPage,
        };

        const response = await client.request(query, variables);

        return {
            data: response.users.data,
            total: response.users.paginatorInfo.total,
        };
    },

    getOne: async (_resource, params) => {
        const query = gql`
            query GetUser($id: ID!) {
                user(id: $id) {
                    id
                    name
                    email
                }
            }
        `;

        const variables = {
            id: params.id,
        };

        const response = await client.request(query, variables);

        return {
            data: response.user,
        };
    },

    create: async (_resource, params) => {
        const mutation = gql`
            mutation CreateUser($input: CreateUserInput!) {
                createUser(input: $input) {
                    user {
                        id
                        name
                        email
                    }
                }
            }
        `;

        const response = await client.request(mutation, {
            input: params.data,
        });

        return {
            data: response.createUser.user,
        };
    },

    update: async (_resource, params) => {
        const mutation = gql`
            mutation UpdateUser($input: UpdateUserInput!) {
                updateUser(input: $input) {
                    user {
                        id
                        name
                        email
                    }
                }
            }
        `;

        const response = await client.request(mutation, {
            id: params.id,
            input: params.data,
        });

        return {
            data: response.updateUser.user,
        };
    },
};

export default dataProvider;
