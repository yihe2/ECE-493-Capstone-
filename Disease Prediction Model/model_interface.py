from joblib import load
import pandas as pd
import json
import requests


url = "http://127.0.0.1:3001/user/info"
# Provided mappings
mappings = {
    "Smoking": {"No": 0, "Yes": 1},
    "AlcoholDrinking": {"No": 0, "Yes": 1},
    "Stroke": {"No": 0, "Yes": 1},
    "DiffWalking": {"No": 0, "Yes": 1},
    "Sex": {"Female": 0, "Male": 1},
    "AgeCategory": {
        "18-24": 0,
        "25-29": 1,
        "30-34": 2,
        "35-39": 3,
        "40-44": 4,
        "45-49": 5,
        "50-54": 6,
        "55-59": 7,
        "60-64": 8,
        "65-69": 9,
        "70-74": 10,
        "75-79": 11,
        "80 or older": 12,
    },
    "Race": {
        "American Indian/Alaskan Native": 0,
        "Asian": 1,
        "Black": 2,
        "Hispanic": 3,
        "Other": 4,
        "White": 5,
    },
    "Diabetic": {
        "No": 0,
        "No, borderline diabetes": 1,
        "Yes": 2,
        "Yes (during pregnancy)": 3,
    },
    "PhysicalActivity": {"No": 0, "Yes": 1},
    "GenHealth": {"Excellent": 0, "Fair": 1, "Good": 2, "Poor": 3, "Very good": 4},
    "Asthma": {"No": 0, "Yes": 1},
    "KidneyDisease": {"No": 0, "Yes": 1},
    "SkinCancer": {"No": 0, "Yes": 1},
}


risk_level_mapping = {
    (0, 20): {
        "cost_bounds": (0, 500),
        "suggested_actions": "Focus on lifestyle modifications and regular monitoring.",
    },
    (20, 40): {
        "cost_bounds": (500, 2000),
        "suggested_actions": "Initiate or adjust medications, with continued lifestyle modifications and monitoring.",
    },
    (40, 60): {
        "cost_bounds": (2000, 5000),
        "suggested_actions": "Consider referral to a specialist, more intensive medication regimen, and possible non-invasive tests.",
    },
    (60, 80): {
        "cost_bounds": (5000, 20000),
        "suggested_actions": "Frequent follow-ups, advanced diagnostic assessments, and potentially non-invasive procedures.",
    },
    (80, 100): {
        "cost_bounds": (20000, 100000),
        "suggested_actions": "Possible invasive procedures such as angioplasty or bypass surgery, along with comprehensive rehabilitation.",
    },
}


# Function to encode the health information from a JSON
def JSON_health_encoder(json_data):
    health_info = json_data["health_information"]
    encoded_array = []

    for key, value in health_info.items():
        if key in mappings:
            if key == "AgeCategory":  # Special handling for AgeCategory
                # Assuming AgeCategory comes as an integer in JSON data
                # Convert age into corresponding category code
                for range_key, code in mappings[key].items():
                    if range_key == "80 or older":
                        if int(value) >= 80:
                            encoded_array.append(code)
                            break
                    else:
                        age_range = range_key.split("-")
                        if int(age_range[0]) <= int(value) <= int(age_range[1]):
                            encoded_array.append(code)
                            break
            else:
                encoded_array.append(mappings[key].get(value, "Unknown"))
        else:
            encoded_array.append(float(value))

    return encoded_array


def JSON_inperpreter(data):
    # file_path = 'saved_data.json'
    # with open(file_path, 'w') as file:
    #     json.dump(data, file)
    # Extracting mode
    mode = int(data["mode"])
    email = data["email"]

    health_info_values = JSON_health_encoder(data)
    print(health_info_values)
    score = risk_score_prediction(health_info_values)

    senddata = {"email": email}
    if mode == 0:
        senddata["score"] = score
    elif mode == 1:
        age = health_info_values[9]
        if age >= 12:
            senddata["monthly_installment"] = -1
        else:
            new_risk_level = data["future_risk_level"]
            if new_risk_level <= score:
                senddata["monthly_installment"] = -3
            else:
                senddata["monthly_installment"] = -1
                while health_info_values[9] <= 12:
                    health_info_values[9] += 1
                    score = risk_score_prediction(health_info_values)
                    if score >= new_risk_level:
                        print(score)
                        print(health_info_values[9])

                        for bounds, info in risk_level_mapping.items():
                            if bounds[0] <= score * 100 <= bounds[1]:
                                lower_bound, upper_bound = info["cost_bounds"]
                                suggested_actions = info["suggested_actions"]
                                break

                        asset = float(data["financial_information"]["savings"])
                        income = float(data["financial_information"]["income"])
                        expense = float(data["financial_information"]["expense"])
                        stock = float(data["financial_information"]["investments"])
                        debt = float(data["financial_information"]["debt"])

                        years = (health_info_values[9] - age) * 4
                        senddata["years"] = years
                        lower_monthly_installment = calculate_monthly_contribution(
                            years, lower_bound, asset, income, expense, stock, debt
                        )
                        upper_monthly_installment = calculate_monthly_contribution(
                            years, upper_bound, asset, income, expense, stock, debt
                        )

                        senddata["monthly_installment"] = (
                            f"{lower_monthly_installment}-{upper_monthly_installment}"
                        )
                        senddata["suggested_actions"] = suggested_actions
                        # senddata["monthly_installment"] = (
                        #     calculate_monthly_contribution(
                        #         (health_info_values[9] - age) * 4,
                        #         100000,
                        #         asset,
                        #         income,
                        #         expense,
                        #         stock,
                        #         debt,
                        #     )
                        # )
                        break
    return senddata
    # response = requests.post(url, json=senddata)


def risk_score_prediction(user_input):

    rf_classifier_loaded = load("rf_classifier.joblib")

    feature_names = [
        "BMI",
        "PhysicalHealth",
        "MentalHealth",
        "SleepTime",
        "Smoking_encoded",
        "AlcoholDrinking_encoded",
        "Stroke_encoded",
        "DiffWalking_encoded",
        "Sex_encoded",
        "AgeCategory_encoded",
        "Race_encoded",
        "Diabetic_encoded",
        "PhysicalActivity_encoded",
        "GenHealth_encoded",
        "Asthma_encoded",
        "KidneyDisease_encoded",
        "SkinCancer_encoded",
    ]

    # user_input = [BMI, PhysicalHealth, MentalHealth, SleepTime,
    #                        Smoking_encoded, AlcoholDrinking_encoded, Stroke_encoded,
    #                        DiffWalking_encoded, Sex_encoded, AgeCategory_encoded,
    #                        Race_encoded, Diabetic_encoded, PhysicalActivity_encoded,
    #                        GenHealth_encoded, Asthma_encoded, KidneyDisease_encoded,
    #                        SkinCancer_encoded]
    user_input_df = pd.DataFrame([user_input], columns=feature_names)

    probability = rf_classifier_loaded.predict_proba(user_input_df)
    return probability[0][1]


def calculate_monthly_contribution(
    years,
    saving_goal,
    total_asset,
    annual_income,
    annual_expense,
    stock_value,
    debt,
    inflation_rate=0.03,
    interest_rate=0.02,
    stock_rate=0.05,
):
    months = years * 12
    monthly_rate = (1 + inflation_rate) ** (1 / 12) - 1

    # Inflate debt annually by the inflation rate
    inflated_debt = debt * ((1 + inflation_rate) ** years)

    # Calculate net annual savings
    net_annual_savings = annual_income - annual_expense

    # Adjust total_asset and inflated_debt for each year with net annual savings, interest, and attempt to pay off the debt
    for year in range(1, years + 1):
        # Try to pay off the debt with this year's savings first
        if net_annual_savings >= inflated_debt:
            net_annual_savings -= inflated_debt  # Deduct the debt from savings
            inflated_debt = 0  # Debt is paid off
        else:
            inflated_debt -= (
                net_annual_savings  # Reduce the debt by the amount of savings
            )
            net_annual_savings = 0  # All savings go towards debt repayment

        total_asset += (
            net_annual_savings  # Add remaining net savings (if any) to total assets
        )
        total_asset *= 1 + interest_rate  # Apply interest for the year
        inflated_debt *= 1 + inflation_rate  # Inflate the remaining debt

    # If there's still debt left after all years, add it to the saving goal
    future_value_goal = (saving_goal + inflated_debt) * ((1 + inflation_rate) ** years)
    future_value_stock = stock_value * ((1 + stock_rate) ** years)

    future_value_asset = total_asset + future_value_stock

    if future_value_asset >= future_value_goal:
        return (
            -2
        )  # Indicating that the saving goal is already met or exceeded with the current assets and savings plan
    else:
        deficit = future_value_goal - future_value_asset
        if monthly_rate != 0:
            monthly_contribution = (
                deficit * monthly_rate / ((1 + monthly_rate) ** months - 1)
            )
        else:
            monthly_contribution = deficit / months

        return monthly_contribution
