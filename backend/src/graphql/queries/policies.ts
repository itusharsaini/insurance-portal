import {gql} from "graphql-tag";

export const getPolicies = gql`
	query getPolicies($offset: Int = 0, $limit: Int = 10) {
		policies(limit: $limit, offset: $offset, order_by: {created_at: desc}) {
			updated_at
			property_damage_liability
			premium
			policy_id
			personal_injury_protection
			id
			created_at
			comprehensive
			collision
			bodily_injury_liability
		}
	}
`;

export const getPoliciesByID = gql`
	query getPoliciesById($id: uuid!) {
		policies(where: {id: {_eq: $id}}) {
			updated_at
			property_damage_liability
			premium
			policy_id
			personal_injury_protection
			id
			created_at
			comprehensive
			collision
			bodily_injury_liability
		}
	}
`;

export const getPoliciesByPolicyID = gql`
	query getPoliciesByPolicyID($policy_id: String!) {
		policies(where: {policy_id: {_eq: $policy_id}}) {
			updated_at
			property_damage_liability
			premium
			policy_id
			personal_injury_protection
			id
			created_at
			comprehensive
			collision
			bodily_injury_liability
		}
	}
`;


