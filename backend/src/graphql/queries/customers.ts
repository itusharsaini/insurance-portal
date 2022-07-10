import { gql } from 'graphql-tag';

export const getCustomers = gql`
	query getCustomers($limit: Int = 10, $offset: Int = 0) {
		customers(limit: $limit, offset: $offset, order_by: {created_at: desc}) {
			id
			updated_at
			region
			marital_status
			income_group
			gender
			created_at
			customer_id
			customer_policy_vehicles {
				policy_id
				vehicle_id
				date_of_purchase
				id
				created_at
				updated_at
			}
		}
	}
`;

export const getCustomerById = gql`
	query getCustomerById($id: uuid!) {
		customers(where:{id: {_eq: $id}}) {
			id
			updated_at
			region
			marital_status
			income_group
			gender
			created_at
			customer_id
			customer_policy_vehicles {
				policy_id
				vehicle_id
				date_of_purchase
				id
				created_at
				updated_at
			}
		}
	}
`;

export const getCustomerByCustomerId = gql`
	query getCustomers($customer_id: Int!) {
		customers(where: {customer_id : {_eq: $customer_id }}) {
			id
			updated_at
			region
			marital_status
			income_group
			gender
			created_at
			customer_id
			customer_policy_vehicles {
				policy_id
				vehicle_id
				date_of_purchase
				id
				created_at
				updated_at
			}
		}
	}
`;
