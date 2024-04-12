import unittest
from flask_testing import TestCase
from app import app
from unittest.mock import patch, MagicMock

class TestFlaskApp(TestCase):
    
    def create_app(self):
        app.config['TESTING'] = True
        return app
    
    # Test that connecting is made
    @patch.multiple(
        "model_interface",
        JSON_health_encoder=MagicMock(
            return_value=[20.0, 15.0, 10.0, 8.0, 1, 0, 1, 1, 1, 0, 1, 2, 1, 3, 1, 1, 0]
        ),
        risk_score_prediction=MagicMock(return_value=0.35),
    )
    def test_receive_data(self):

        doc = {
            "email": "email",
            "mode": 0,  # Assuming mode should be integer based on your application's handling
            "health_information": {
                "BMI": 20,  # Assuming integer or float values based on your application's expectations
                "PhysicalHealth": 15,
                "MentalHealth": 10,
                "SleepTime": 8,
                "Smoking": "Yes",
                "AlcoholDrinking": "No",
                "Stroke": "Yes",
                "DiffWalking": "Yes",
                "Sex": "Male",
                "AgeCategory": 20,
                "Race": "Asian",
                "Diabetic": "Yes",
                "PhysicalActivity": "Yes",
                "GenHealth": "Poor",
                "Asthma": "Yes",
                "KidneyDisease": "Yes",
                "SkinCancer": "No",
            },
            "financial_information": {
                "savings": 300,
                "income": 15000,
                "expense": 10000,
                "investments": 0,
                "debt": 50000,
            },
            "future_risk_level": 0.40,
        }
        response = self.client.post('/receive/newuser', json=doc)
        self.assertIsNotNone(response)        
if __name__ == '__main__':
    unittest.main()