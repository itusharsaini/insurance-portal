import React, { ChangeEvent, FC, FormEvent, memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const InsuranceEditComponent: FC = memo(() => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({
    field: "",
    error: ""
  });
  const [insuranceData, setInsuranceData] = useState<any>({
    id: "",
    vid: "",
    policy_id: "",
    date_of_purchase: "",
    customer_id: "",
    fuel: "",
    vehicle_segment: "",
    premium: "",
    bodily_injury_liability: "",
    personal_injury_protection: "",
    property_damage_liability: "",
    collision: "",
    comprehensive: "",
    gender: "",
    income_group: "",
    region: "",
    marital_status: ""
  });

  useEffect(() => {
    getInsurance().catch();
  }, []);

  const getInsurance = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:3001/policies/${params.insuranceId}`);
    const data = await response.json();
    if (data && data.length) {
      setInsuranceData(data[0]);
    }
    setLoading(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, item: string) => {
    if (item === "premium" && Number(e.target.value) > 1000000) {
      setError({field: item, error: "Premium cannot be greater than 10,00,000"});
    }
    setError({field: "", error: ""});
    setInsuranceData({...insuranceData, [item]: e.target.value});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const {id, vid, premium, bodily_injury_liability, personal_injury_protection, property_damage_liability, collision, comprehensive, gender, income_group, region, marital_status, policy_id, customer_id, date_of_purchase} = insuranceData;

    // creating the data object to update the data in the DB onConflict updates the data when a unique is encountered else would insert
    const object = {
      id,
      date_of_purchase,
      policy: {
        data: {policy_id, premium, bodily_injury_liability: bodily_injury_liability.toLowerCase() === "yes", personal_injury_protection: personal_injury_protection.toLowerCase() === "yes", property_damage_liability: property_damage_liability.toLowerCase() === "yes", collision: collision.toLowerCase() === "yes", comprehensive: comprehensive.toLowerCase() === "yes"},
        on_conflict: {
          constraint: "policies_policy_id_key",
          update_columns: ["premium",
            "bodily_injury_liability",
            "personal_injury_protection",
            "property_damage_liability",
            "collision",
            "comprehensive", "updated_at"]
        }
      },
      customer: {
        data: {customer_id, gender, income_group, region, marital_status: marital_status.toLowerCase() === "married"},
        on_conflict: {
          constraint: "cutomers_customer_id_key", update_columns: ["gender",
            "income_group",
            "region",
            "marital_status", "updated_at"]
        }
      },
      vehicle_id: vid
    };
    const res = await fetch(`http://localhost:3001/policies`, {method: "POST", body: JSON.stringify({object}), headers: {"Content-Type": "application/json"}});
    const data = await res.json();
    if (data) {
      navigate("/insurances", {replace: true});
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={"mb-3"}>
          <button type="submit" disabled={loading || error.error.trim().length>0} className="btn btn-primary me-3">Save</button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/insurances", {replace: true})}>Cancel</button>
        </div>
        {Object.keys(insuranceData).filter(item => item !== "vid" && item!=="cid" && item!=="pid").map((item) => (
          <div className="mb-3" key={item}>
            <label htmlFor={item} className="form-label">
              {item.replaceAll("_", " ").toUpperCase()}
            </label>
            <input type={item === "premium" ? "number" : "text"} name={item} className="form-control"
                   id={item} onChange={(e) => onChangeHandler(e, item)}
                   value={insuranceData[item]}
                   disabled={item === "id" || item === "date_of_purchase" || item === "policy_id" || item === "customer_id" || loading}/>
            {error && error["field"] === item && error.error.trim().length && <p className={"text-danger"}>{error.error}</p>}
          </div>
        ))}
        <div>
          <button type="submit" disabled={loading || error.error.trim().length>0} className="btn btn-primary me-3">Save</button>
          <button type="button" disabled={loading} className="btn btn-outline-secondary" onClick={() => navigate("/insurances", {replace: true})}>Cancel</button>
        </div>
      </form>
    </div>
  );
});

export default InsuranceEditComponent;
