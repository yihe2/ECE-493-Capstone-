import React from 'react';

const InformationPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Overview</h1>
      <p className="mb-8">
        In our commitment to advancing cardiovascular health, we have developed an innovative Artificial Intelligence (AI) model designed to predict the likelihood of cardiovascular issues based on individual health data. This model represents a significant step forward in personalized healthcare, offering insights that can guide both patients and healthcare providers towards more informed decisions about treatment and preventive care.
      </p>
      
      <h2 className="text-2xl font-bold mb-4">Data Collection and Preparation</h2>
      <p className="mb-8">
        Our model is powered by a comprehensive dataset, compiled from publicly available health records focused on cardiovascular conditions. Recognizing the critical importance of data integrity and representativeness, we have undertaken rigorous steps to ensure the dataset was balanced. Initially, the data exhibited imbalances that could potentially skew predictions. Through meticulous preprocessing, we corrected these imbalances, establishing a solid foundation for accurate, unbiased AI training.
      </p>
      
      <h2 className="text-2xl font-bold mb-4">AI Model Training</h2>
      <p className="mb-8">
        The heart of our predictive system is a Random Forest algorithm, chosen for its robustness and ability to handle complex, nonlinear data relationships. Random Forest, a type of ensemble learning method, constructs multiple decision trees during training and outputs the mode of the classes (classification) of the individual trees for prediction. This approach enhances the model's generalizability and resilience against overfitting, making it exceptionally well-suited for the nuanced task of predicting cardiovascular health outcomes.
      </p>
      <br/>
      <p className="mb-8">
        Our AI model was trained with a dual focus on precision and reliability, employing a structured methodology to learn from the balanced dataset. It discerns patterns and correlations among various input variables—which can be found on the input pages for registered users, and more—each of which contributes to the comprehensive risk assessment it provides.
      </p>
      
      <h2 className="text-2xl font-bold mb-4">Prediction and Treatment Implications</h2>
      <p>
        Upon receiving an individual's health data inputs, our model calculates the likelihood of developing cardiovascular issues by the specified date. This likelihood is expressed as a percentage, offering a clear and understandable metric for evaluating risk.
      </p>
    </div>
  );
}

export default InformationPage;
