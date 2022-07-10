import { gql } from 'graphql-tag';

export const updateCustomerPolicyVehicle = gql`
	mutation updateCustomerPolicyVehicle($objects: [customer_policy_vehicle_insert_input!]!) {
		insert_customer_policy_vehicle(
			objects: $objects,
			on_conflict: {
				constraint: customer_policy_relation_pkey,
				update_columns: [updated_at]
			}
		) {
			affected_rows
			returning {
				date_of_purchase
				id
			}
		}
	}
`;
