from joblib import load
import pandas as pd
import json

def JSON_inperpreter():
    file_path = 'C:/Users/Yihe/Desktop/Mike/Homework/Need/ECE 493/Project #1/ECE-493-Capstone-/Disease Prediction Model/example_data.json'
    with open(file_path, 'r') as file:
        data = json.load(file)
        
    # Extracting mode
    mode = data["mode"]
    health_info_values = [value for value in data["health information"].values()]
    score = risk_score_prediction(health_info_values)
    if (mode == 0):
        return score
    elif(mode == 1):
        age = health_info_values[9]
        if (age >= 12):
            return -1
        else:
            new_risk_level = data["future risk level"]
            if (new_risk_level <= score):
                return -3
            while (health_info_values[9] <=12):
                health_info_values[9] += 1
                score = risk_score_prediction(health_info_values)
                if (score >= new_risk_level):
                    asset = data["financial information"]["saving"]
                    return calculate_monthly_contribution((health_info_values[9] - age) * 4, 100000, asset)
                
            return -1
                    
                
        print(mode)

def risk_score_prediction (user_input):

    rf_classifier_loaded = load('C:/Users/Yihe/Desktop/Mike/Homework/Need/ECE 493/Project #1/ECE-493-Capstone-/Disease Prediction Model/rf_classifier.joblib')

    feature_names = ['BMI', 'PhysicalHealth', 'MentalHealth', 'SleepTime',
        'Smoking_encoded', 'AlcoholDrinking_encoded', 'Stroke_encoded',
        'DiffWalking_encoded', 'Sex_encoded', 'AgeCategory_encoded',
        'Race_encoded', 'Diabetic_encoded', 'PhysicalActivity_encoded',
        'GenHealth_encoded', 'Asthma_encoded', 'KidneyDisease_encoded',
        'SkinCancer_encoded']

    # user_input = [BMI, PhysicalHealth, MentalHealth, SleepTime, 
    #                        Smoking_encoded, AlcoholDrinking_encoded, Stroke_encoded, 
    #                        DiffWalking_encoded, Sex_encoded, AgeCategory_encoded, 
    #                        Race_encoded, Diabetic_encoded, PhysicalActivity_encoded, 
    #                        GenHealth_encoded, Asthma_encoded, KidneyDisease_encoded, 
    #                        SkinCancer_encoded]
    user_input_df = pd.DataFrame([user_input], columns=feature_names)

    probability = rf_classifier_loaded.predict_proba(user_input_df)
    return probability[0][1]

def calculate_monthly_contribution(years, saving_goal, total_asset, inflation_rate=0.05, interest_rate = 0.02):
    months = years * 12
    monthly_rate = (1 + inflation_rate) ** (1/12) - 1
    future_value_goal = saving_goal * ((1 + inflation_rate) ** years)
    future_value_asset = total_asset * ((1 + interest_rate) ** years)
    
    if future_value_asset >= future_value_goal:
        return -2
    else:
        deficit = future_value_goal - future_value_asset
        if monthly_rate != 0:
            monthly_contribution = deficit * monthly_rate / ((1 + monthly_rate) ** months - 1)
        else:
            monthly_contribution = deficit / months

        return monthly_contribution

print(JSON_inperpreter())