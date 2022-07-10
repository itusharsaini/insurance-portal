import { apolloClient } from "../apolloClient";

export const getDataService = async (query: any, variables: any) =>
  await apolloClient.query({
    query,
    variables,
    fetchPolicy:"network-only"
  });
