import { apolloClient } from "../apolloClient";

export const insertDataService = async (mutation: any, variables: any) => {
  console.log(variables)
 return  await apolloClient.mutate({
    mutation,
    variables
  });
}
