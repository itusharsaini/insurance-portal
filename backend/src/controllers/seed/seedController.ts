import { Request, Response } from "express-serve-static-core";
import csvtojson from "csvtojson";
import * as fs from "fs";
import { updateCustomerPolicyVehicle } from "../../graphql/mutations/customer_vehicle_policy";
import { insertDataService } from "../../services/insertDataService";
import moment from "moment";
import { array_chunks } from "../../utils";

export const seedController = async (request: Request, response: Response) => {
  try {
    if (!request.file) {
      return response.status(400).json({message: "BAD_REQUEST", status: 400, error: "File Not Found"});
    }
    if (request && request.file) {
      fs.writeFileSync(request.file.originalname, request.file.buffer);
      csvtojson().fromFile(request.file.originalname).then(async (data) => {
        const newData = data.map(data => {
          return {
            date_of_purchase: moment(data["Date of Purchase"], ["M/DD/YYYY"]).format("YYYY-MM-DD"),
            customer: {
              data: {
                customer_id: data["Customer_id"],
                gender: data["Customer_Gender"],
                income_group: data["Customer_Income group"],
                region: data["Customer_Region"],
                marital_status: data["Customer_Marital_status"]
              },
              on_conflict: {
                constraint: "cutomers_customer_id_key", update_columns: ["updated_at"]
              }
            },
            policy: {
              data: {
                policy_id: data["Policy_id"],
                premium: data["Premium"],
                bodily_injury_liability: data["bodily injury liability"],
                personal_injury_protection: data["personal injury protection"],
                property_damage_liability: data["property damage liability"],
                collision: data["collision"],
                comprehensive: data["comprehensive"]
              },
              on_conflict: {constraint: "policies_policy_id_key", update_columns: ["updated_at"]}
            },
            vehicle: {
              data: {
                segment: data["VEHICLE_SEGMENT"],
                fuel: data["Fuel"]
              },
              on_conflict: {constraint: "vehicles_segment_fuel_key", update_columns: ["updated_at"]}
            },
          };
        });
        response.status(200).send("SEEDED");
        const chunks = array_chunks(newData, 300);

        const pr = chunks.map((chunk) => {
          return insertDataService(updateCustomerPolicyVehicle, {objects: chunk});
        });

        Promise.all(pr).then(result => {
          console.log(result);
        });
        // const res = await insertDataService(updateCustomerPolicyVehicle, {objects: newData});
        // console.log(res);
        if (request.file && request.file.originalname) {
          fs.unlinkSync(request.file.originalname);
        }
      });

    } else {
      return response.status(400).json({message: "BAD_REQUEST", status: 400, error: "Required Fields Not Found"});
    }
  } catch (e) {
    return response.status(500).json({message: "INTERNAL_SERVER_ERROR", status: 500, error: e});
  }
};
