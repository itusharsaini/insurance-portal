import { apolloClient } from "../apolloClient";

/**
 * Service to fetch data from the database
 * @param query
 * @param variables
 */
export const getDataService = async (query: any, variables: any) =>
  await apolloClient.query({
    query,
    variables,
    fetchPolicy:"network-only"
  });
