import { apolloClient } from "../apolloClient";

/**
 * Service to mutate data into database
 * @param mutation
 * @param variables
 */
export const insertDataService = async (mutation: any, variables: any) => {
  console.log(variables)
 return  await apolloClient.mutate({
    mutation,
    variables
  });
}
