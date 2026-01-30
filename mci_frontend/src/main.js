import { createApp, h, provide } from "vue";
import { ApolloClients } from "@vue/apollo-composable";
import App from "./App.vue";
import { apolloClient } from "./apollo";
import router from "./router";

createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
    });
  },
  render: () => h(App),
})
  .use(router)
  .mount("#app");
