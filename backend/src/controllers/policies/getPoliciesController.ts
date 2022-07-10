import { Request, Response } from "express-serve-static-core";
import { getDataService } from "../../services/getDataService";
import { getCustomerVehiclePolicy } from "../../graphql/queries/customer_vehicle_policy";

export const getPoliciesDataController = async (request: Request, response: Response) => {
  try {
    if (request && request.query) {
      // @ts-ignore
      const {offset, limit} = request.query;
      const {data} = await getDataService(getCustomerVehiclePolicy, {offset: Number(offset), limit: Number(limit)});
      const totalData = data.customer_policy_vehicle_aggregate.aggregate.count;
      const res = {
        totalPages: totalData/Number(limit),
        data: data.customer_policy_vehicle,
      }
      return response.status(200).send(res);
    } else {
      return response.status(400).json({message: "BAD_REQUEST", status: 400, error: "Required Params Not Found"});
    }
  } catch (e) {
    return response.status(500).json({message: "INTERNAL_SERVER_ERROR", status: 500, error: e});
  }
};
