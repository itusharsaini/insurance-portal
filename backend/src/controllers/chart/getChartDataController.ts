import { Request, Response } from "express-serve-static-core";
import { getDataService } from "../../services/getDataService";
import { getCustomerVehiclePolicyByDate } from "../../graphql/queries/customer_vehicle_policy";
import moment from "moment";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"];

export const getChartDataController = async (request: Request, response: Response) => {
  try {
    if (request && request.query) {
      // @ts-ignore
      const {startDate, endDate}: { startDate: Date, endDate: Date } = request.query;
      if (!startDate || !endDate) {
        return response.status(400).json({message: "BAD_REQUEST", status: 400, error: "Required Params Not Missing"});
      }
      console.log({startDate, endDate});
      const {data} = await getDataService(getCustomerVehiclePolicyByDate, {_gte: startDate, _lte: endDate});
      const chartObj: any = {};

      months.forEach((mo) => {
        chartObj[mo] = {
          north: 0,
          south: 0,
          east: 0,
          west: 0
        };
      });

      if (data && data.customer_policy_vehicle && data.customer_policy_vehicle.length) {
        data.customer_policy_vehicle.forEach((item: any) => {
          if (item && item.date_of_purchase) {
            const d = moment(item.date_of_purchase, ["YYYY-MM-DD"]);
            const month = months[d.month()];
            if (month) {
              if(item.customer.region){
                chartObj[month][item.customer.region.toLowerCase()]+=1
              }
            }
          }
        });
      }
      return response.status(200).send(chartObj);
    } else {
      return response.status(400).json({message: "BAD_REQUEST", status: 400, error: "Required Params Not Found"});
    }
  } catch (e) {
    console.log(e);
    return response.status(500).json({message: "INTERNAL_SERVER_ERROR", status: 500, error: e});
  }
};
