import { Request, Response } from "express-serve-static-core";
import { insertDataService } from "../../services/insertDataService";
import { updateCustomerPolicyVehicle } from "../../graphql/mutations/customer_vehicle_policy";

/**
 * To insert and updated the customer_vehicle_policy record data into the database by id
 * @description This method updates customer data, policy data and customer_vehicle_policy data with
 * single mutation onConflict of the unique or primary key
 * @param request
 * @param response
 */
export const insertPoliciesController = async (request: Request, response: Response) => {
  try {
    if (request && request.body) {
      const {object} = request.body;
      console.log(object)
      if (!object) return response.status(400)
      .json({message: "BAD_REQUEST", status: 400, error: "Required Fields Not Found"});
      const {data} = await insertDataService(updateCustomerPolicyVehicle, {objects:object});
      return response.status(200).send(data);
    } else {
      return response.status(400).json({message: "BAD_REQUEST", status: 400, error: "Required Fields Not Found"});
    }
  } catch (e) {
    return response.status(500).json({message: "INTERNAL_SERVER_ERROR", status: 500, error: e});
  }
};
