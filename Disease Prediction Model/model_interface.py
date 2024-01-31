from joblib import load
import pandas as pd

# Load the model from the file
rf_classifier_loaded = load('C:/Users/Yihe/Desktop/Mike/Homework/Need/ECE 493/Project #1/ECE-493-Capstone-/Disease Prediction Model/rf_classifier.joblib')

# Assuming `user_input` is a 2D numpy array or a list of lists representing one row of input
# Example: user_input = [[feature1_value, feature2_value, ..., featureN_value]]

# BMI	
# PhysicalHealth	
# MentalHealth	
# SleepTime	
# HeartDisease_encoded	
# Smoking_encoded	
# AlcoholDrinking_encoded	
# Stroke_encoded (This is the prediction category)	
# DiffWalking_encoded	
# Sex_encoded	
# AgeCategory_encoded	
# Race_encoded	
# Diabetic_encoded	
# PhysicalActivity_encoded	
# GenHealth_encoded	
# Asthma_encoded	
# KidneyDisease_encoded	
# SkinCancer_encoded

feature_names = ['BMI', 'PhysicalHealth', 'MentalHealth', 'SleepTime',
       'HeartDisease_encoded', 'Smoking_encoded', 'AlcoholDrinking_encoded',
       'DiffWalking_encoded', 'Sex_encoded', 'AgeCategory_encoded',
       'Race_encoded', 'Diabetic_encoded', 'PhysicalActivity_encoded',
       'GenHealth_encoded', 'Asthma_encoded', 'KidneyDisease_encoded',
       'SkinCancer_encoded']

# user_input = [50.0, 30.0, 30.0, 4.0, 1, 1,	1,	1,	0,	7,	5,	2,	0,	3,	1,	1,	1]
user_input = [20.0, 0.0, 0.0, 8.0, 0, 0,	0,	0,	0,	1,	5,	0,	1,	0,	0,	0,	0]
user_input_df = pd.DataFrame([user_input], columns=feature_names)
prediction = rf_classifier_loaded.predict(user_input_df)

# For probabilistic output
# probability = rf_classifier_loaded.predict_proba(user_input_df)
# print(probability[0][1])

def calculate_monthly_contribution(years, saving_goal, inflation_rate=0.02):
    # Convert years to months
    months = years * 12
    
    # Convert annual inflation rate to monthly rate
    monthly_rate = (1 + inflation_rate) ** (1/12) - 1
    
    # Adjust saving goal for future value considering inflation
    future_value = saving_goal * ((1 + inflation_rate) ** years)
    
    # Calculate monthly contribution
    if monthly_rate != 0:
        monthly_contribution = future_value * monthly_rate / ((1 + monthly_rate) ** months - 1)
    else:
        monthly_contribution = future_value / months

    return monthly_contribution

# Example usage
years = 10  # number of years
saving_goal = 20000  # saving goal in your currency

monthly_contribution = calculate_monthly_contribution(years, saving_goal)
print(f"Monthly Contribution: {monthly_contribution:.2f}")
