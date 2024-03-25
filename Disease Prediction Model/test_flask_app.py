import unittest
from flask_testing import TestCase
from app import app

class TestFlaskApp(TestCase):
    
    def create_app(self):
        app.config['TESTING'] = True
        return app
    
    # Test that connecting is made
    def test_recieve_data(self):
        doc = {
            'email': 'email',
            'mode': 0,
            'health_information': {
                'BMI': 10.0,
                'PhysicalHealth': 2,
                'MentalHealth': 3,
                'SleepTime': 5,
                'Smoking': 'Yes',
                'AlcoholDrinking': 'Yes',
                'Stroke': 'Yes',
                'DiffWalking': 'Yes',
                'Sex': 'Male',
                'AgeCategory': 20,
                'Race': 'Asian',
                'Diabetic': 'Yes',
                'PhysicalActivity': 'Yes',
                'GenHealth': 'Yes',
                'Asthma': 'Yes',
                'KidneyDisease': 'No',
                'SkinCancer': 'No',
                },
            'financial_information': 'financial',
            'future_risk_level': 0.0,
            }
        response = self.client.post('/recieve/newuser', json=doc)
        self.assertEqual(response.status_code, 201)
        
if __name__ == '__main__':
    unittest.main()