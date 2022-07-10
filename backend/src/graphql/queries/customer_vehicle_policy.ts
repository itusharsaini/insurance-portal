import { gql } from 'graphql-tag';

export const getCustomerVehiclePolicyByDate = gql`
	query getCustomerVehiclePolicyByDate($_gte: date!, $_lte: date!) {
		customer_policy_vehicle(where: {date_of_purchase: {_gte: $_gte, _lte: $_lte}}) {
			date_of_purchase
			id
			created_at
			updated_at
			policy_id
			customer_id
			vehicle_id
			customer {
				region
			}
		}
	}
`;

export const getCustomerVehiclePolicy = gql`
	query getCustomerVehiclePolicy($limit: Int! = 10, $offset: Int! = 0) {
		customer_policy_vehicle(offset: $offset, limit: $limit, order_by: {created_at: desc}) {
			date_of_purchase
			id
			created_at
			updated_at
			policy_id
			customer_id
			policy {
				id
				policy_id
				premium
				property_damage_liability
				updated_at
				personal_injury_protection
				created_at
				comprehensive
				collision
				bodily_injury_liability
			}
			customer {
				created_at
				customer_id
				gender
				income_group
				id
				marital_status
				region
				updated_at
			}
		}
		customer_policy_vehicle_aggregate {
			aggregate {
				count(distinct: true, columns: policy_id)
			}
		}
	}
`;
