import { Request, Response } from "express-serve-static-core";
import { getDataService } from "../../services/getDataService";
import { getCustomerVehiclePolicy, getCustomerVehiclePolicyById } from "../../graphql/queries/customer_vehicle_policy";
import { apolloClient } from "../../apolloClient";

export const getPoliciesDataController = async (request: Request, response: Response) => {
  try {
    if (request && request.query) {
      // @ts-ignore
      const {offset, limit} = request.query;
      const{data} = await apolloClient.query({
        query:getCustomerVehiclePolicy,
        variables:{offset: Number(offset), limit: Number(limit)},
        fetchPolicy:"network-only"
      });
      // const {data} = await getDataService(getCustomerVehiclePolicy, {offset: Number(offset), limit: Number(limit)});
      const totalData = data.customer_policy_vehicle_aggregate.aggregate.count;
      const insurances = data?.customer_policy_vehicle?.map((item: any) => ({
        id: item.id,
        policy_id: item.policy.policy_id,
        date_of_purchase: item.date_of_purchase,
        customer_id: item.customer.customer_id,
        fuel: item.vehicle.fuel,
        vehicle_segment: item.vehicle.segment,
        premium: item.policy.premium,
        bodily_injury_liability: item.policy.bodily_injury_liability ? "Yes" : "No",
        personal_injury_protection: item.policy.personal_injury_protection ? "Yes" : "No",
        property_damage_liability: item.policy.property_damage_liability ? "Yes" : "No",
        collision: item.policy.collision ? "Yes" : "No",
        comprehensive: item.policy.comprehensive ? "Yes" : "No",
        gender: item.customer.gender.toUpperCase(),
        income_group: item.customer.income_group,
        region: item.customer.region.toUpperCase(),
        marital_status: item.customer.marital_status ? "Married" : "Unmarried"
      }));
      const res = {
        totalRecords: totalData,
        totalPages: totalData/Number(limit),
        data: insurances && insurances?.length ? insurances : [],
      }
      return response.status(200).send(res);
    } else {
      return response.status(400).json({message: "BAD_REQUEST", status: 400, error: "Required Params Not Found"});
    }
  } catch (e) {
    return response.status(500).json({message: "INTERNAL_SERVER_ERROR", status: 500, error: e});
  }
};

export const getPoliciesByIdController = async(request: Request, response: Response)=>{
  try{
    if(request && request.params){
      const params = request.params;
      if(params.insuranceId){
        const {data} = await getDataService(getCustomerVehiclePolicyById, {id:params.insuranceId });
        const insurance = data?.customer_policy_vehicle?.map((item: any) => ({
          id: item.id,
          cid: item.customer_id,
          pid: item.policy_id,
          vid: item.vehicle_id,
          policy_id: item.policy.policy_id,
          date_of_purchase: item.date_of_purchase,
          customer_id: item.customer.customer_id,
          fuel: item.vehicle.fuel,
          vehicle_segment: item.vehicle.segment,
          premium: item.policy.premium,
          bodily_injury_liability: item.policy.bodily_injury_liability ? "Yes" : "No",
          personal_injury_protection: item.policy.personal_injury_protection ? "Yes" : "No",
          property_damage_liability: item.policy.property_damage_liability ? "Yes" : "No",
          collision: item.policy.collision ? "Yes" : "No",
          comprehensive: item.policy.comprehensive ? "Yes" : "No",
          gender: item.customer.gender,
          income_group: item.customer.income_group,
          region: item.customer.region.toUpperCase(),
          marital_status: item.customer.marital_status ? "Married" : "Unmarried"
        }));
        response.status(200).send(insurance);
      }
    }
  }catch (e) {
    console.log(e);
    return response.status(500).json({message: "INTERNAL_SERVER_ERROR", status: 500, error: JSON.stringify(e)});
  }
}
