import joblib
import model_interface  # The code to test
import unittest  # The test framework
from unittest.mock import patch, MagicMock
import coverage


class Model_Testing(unittest.TestCase):
    @patch.multiple(
        "model_interface",
        JSON_health_encoder=MagicMock(
            return_value=[20.0, 15.0, 10.0, 8.0, 1, 0, 1, 1, 1, 0, 1, 2, 1, 3, 1, 1, 0]
        ),
        risk_score_prediction=MagicMock(return_value=0.35),
    )
    # @patch("model_interface.risk_score_prediction")
    def test_initial_predction_full_mock_mode0(self):

        data = {
            "email": "email",
            "mode": "0",
            "health_information": {
                "BMI": "20",
                "PhysicalHealth": "15",
                "MentalHealth": "10",
                "SleepTime": "8",
                "Smoking": "Yes",
                "AlcoholDrinking": "No",
                "Stroke": "Yes",
                "DiffWalking": "Yes",
                "Sex": "Male",
                "AgeCategory": "20",
                "Race": "Asian",
                "Diabetic": "Yes",
                "PhysicalActivity": "Yes",
                "GenHealth": "Poor",
                "Asthma": "Yes",
                "KidneyDisease": "Yes",
                "SkinCancer": "No",
            },
            "financial_information": {
                "savings": "300",
                "income": "15000",
                "expense": "10000",
                "investments": "0",
                "debt": "50000",
            },
            "future_risk_level": 0.40,
        }

        self.assertEqual(
            model_interface.JSON_inperpreter(data),
            {"email": "email", "score": 0.35},
        )

    @patch.multiple(
        "model_interface",
        JSON_health_encoder=MagicMock(
            return_value=[20.0, 15.0, 10.0, 8.0, 1, 0, 1, 1, 1, 12, 1, 2, 1, 3, 1, 1, 0]
        ),
        risk_score_prediction=MagicMock(return_value=0.35),
    )
    # @patch("model_interface.risk_score_prediction")
    def test_initial_predction_full_mock_mode1_too_old(self):

        data = {
            "email": "email",
            "mode": "1",
            "health_information": {
                "BMI": "20",
                "PhysicalHealth": "15",
                "MentalHealth": "10",
                "SleepTime": "8",
                "Smoking": "Yes",
                "AlcoholDrinking": "No",
                "Stroke": "Yes",
                "DiffWalking": "Yes",
                "Sex": "Male",
                "AgeCategory": "20",
                "Race": "Asian",
                "Diabetic": "Yes",
                "PhysicalActivity": "Yes",
                "GenHealth": "Poor",
                "Asthma": "Yes",
                "KidneyDisease": "Yes",
                "SkinCancer": "No",
            },
            "financial_information": {
                "savings": "300",
                "income": "15000",
                "expense": "10000",
                "investments": "0",
                "debt": "50000",
            },
            "future_risk_level": 0.40,
        }

        self.assertEqual(
            model_interface.JSON_inperpreter(data),
            {"email": "email", "monthly_installment": -1},
        )

    @patch.multiple(
        "model_interface",
        JSON_health_encoder=MagicMock(
            return_value=[20.0, 15.0, 10.0, 8.0, 1, 0, 1, 1, 1, 0, 1, 2, 1, 3, 1, 1, 0]
        ),
        risk_score_prediction=MagicMock(return_value=0.35),
    )
    # @patch("model_interface.risk_score_prediction")
    def test_initial_predction_full_mock_mode1_smaller_than_current(self):

        data = {
            "email": "email",
            "mode": "1",
            "health_information": {
                "BMI": "20",
                "PhysicalHealth": "15",
                "MentalHealth": "10",
                "SleepTime": "8",
                "Smoking": "Yes",
                "AlcoholDrinking": "No",
                "Stroke": "Yes",
                "DiffWalking": "Yes",
                "Sex": "Male",
                "AgeCategory": "20",
                "Race": "Asian",
                "Diabetic": "Yes",
                "PhysicalActivity": "Yes",
                "GenHealth": "Poor",
                "Asthma": "Yes",
                "KidneyDisease": "Yes",
                "SkinCancer": "No",
            },
            "financial_information": {
                "savings": "300",
                "income": "15000",
                "expense": "10000",
                "investments": "0",
                "debt": "50000",
            },
            "future_risk_level": 0.25,
        }

        self.assertEqual(
            model_interface.JSON_inperpreter(data),
            {"email": "email", "monthly_installment": -3},
        )

    @patch.multiple(
        "model_interface",
        JSON_health_encoder=MagicMock(
            return_value=[20.0, 15.0, 10.0, 8.0, 1, 0, 1, 1, 1, 0, 1, 2, 1, 3, 1, 1, 0]
        ),
        # risk_score_prediction=MagicMock(return_value=0.35),
    )
    def test_initial_predction_mode1_too_much_money(self):

        data = {
            "email": "email",
            "mode": "1",
            "health_information": {
                "BMI": "20",
                "PhysicalHealth": "15",
                "MentalHealth": "10",
                "SleepTime": "8",
                "Smoking": "Yes",
                "AlcoholDrinking": "No",
                "Stroke": "Yes",
                "DiffWalking": "Yes",
                "Sex": "Male",
                "AgeCategory": "20",
                "Race": "Asian",
                "Diabetic": "Yes",
                "PhysicalActivity": "Yes",
                "GenHealth": "Poor",
                "Asthma": "Yes",
                "KidneyDisease": "Yes",
                "SkinCancer": "No",
            },
            "financial_information": {
                "savings": "300",
                "income": "150000",
                "expense": "10000",
                "investments": "0",
                "debt": "50000",
            },
            "future_risk_level": 0.40,
        }

        self.assertEqual(
            model_interface.JSON_inperpreter(data),
            {
                "email": "email",
                "monthly_installment": -2,
                "suggested_actions": "Consider referral to a specialist, more intensive medication regimen, and possible non-invasive tests.",
                "years": 16,
            },
        )

    @patch.multiple(
        "model_interface",
        JSON_health_encoder=MagicMock(
            return_value=[20.0, 15.0, 10.0, 8.0, 1, 0, 1, 1, 1, 0, 1, 2, 1, 3, 1, 1, 0]
        ),
        # risk_score_prediction=MagicMock(return_value=0.35),
    )
    def test_initial_predction_mode1_general(self):

        data = {
            "email": "email",
            "mode": "1",
            "health_information": {
                "BMI": "20",
                "PhysicalHealth": "15",
                "MentalHealth": "10",
                "SleepTime": "8",
                "Smoking": "Yes",
                "AlcoholDrinking": "No",
                "Stroke": "Yes",
                "DiffWalking": "Yes",
                "Sex": "Male",
                "AgeCategory": "20",
                "Race": "Asian",
                "Diabetic": "Yes",
                "PhysicalActivity": "Yes",
                "GenHealth": "Poor",
                "Asthma": "Yes",
                "KidneyDisease": "Yes",
                "SkinCancer": "No",
            },
            "financial_information": {
                "savings": "300",
                "income": "15000",
                "expense": "10000",
                "investments": "0",
                "debt": "50000",
            },
            "future_risk_level": 0.40,
        }

        self.assertEqual(
            model_interface.JSON_inperpreter(data),
            {
                "email": "email",
                "monthly_installment": "801.56-821.19",
                "suggested_actions": "Consider referral to a specialist, more intensive medication regimen, and possible non-invasive tests.",
                "years": 16,
            },
        )

    def test_initial_predction_wrong_mode(self):

        data = {
            "email": "email",
            "mode": "2",
            "health_information": {
                "BMI": "20",
                "PhysicalHealth": "15",
                "MentalHealth": "10",
                "SleepTime": "8",
                "Smoking": "Yes",
                "AlcoholDrinking": "No",
                "Stroke": "Yes",
                "DiffWalking": "Yes",
                "Sex": "Male",
                "AgeCategory": "20",
                "Race": "Asian",
                "Diabetic": "Yes",
                "PhysicalActivity": "Yes",
                "GenHealth": "Poor",
                "Asthma": "Yes",
                "KidneyDisease": "Yes",
                "SkinCancer": "No",
            },
            "financial_information": {
                "savings": "300",
                "income": "15000",
                "expense": "10000",
                "investments": "0",
                "debt": "50000",
            },
            "future_risk_level": 0.40,
        }

        self.assertEqual(
            model_interface.JSON_inperpreter(data),
            {
                "email": "email",
            },
        )

    def test_encoder_age_less_than_80(self):
        data = {
            "email": "email",
            "mode": "1",
            "health_information": {
                "BMI": "20",
                "PhysicalHealth": "15",
                "MentalHealth": "10",
                "SleepTime": "8",
                "Smoking": "Yes",
                "AlcoholDrinking": "No",
                "Stroke": "Yes",
                "DiffWalking": "Yes",
                "Sex": "Male",
                "AgeCategory": "20",
                "Race": "Asian",
                "Diabetic": "Yes",
                "PhysicalActivity": "Yes",
                "GenHealth": "Poor",
                "Asthma": "Yes",
                "KidneyDisease": "Yes",
                "SkinCancer": "No",
            },
            "financial_information": {
                "savings": "300",
                "income": "15000",
                "expense": "10000",
                "investments": "0",
                "debt": "50000",
            },
            "future_risk_level": 0.40,
        }
        self.assertEqual(
            model_interface.JSON_health_encoder(data),
            [20.0, 15.0, 10.0, 8.0, 1, 0, 1, 1, 1, 0, 1, 2, 1, 3, 1, 1, 0],
        )

    def test_encoder_age_greater_than_80(self):
        data = {
            "email": "email",
            "mode": "1",
            "health_information": {
                "BMI": "20",
                "PhysicalHealth": "15",
                "MentalHealth": "10",
                "SleepTime": "8",
                "Smoking": "Yes",
                "AlcoholDrinking": "No",
                "Stroke": "Yes",
                "DiffWalking": "Yes",
                "Sex": "Male",
                "AgeCategory": "90",
                "Race": "Asian",
                "Diabetic": "Yes",
                "PhysicalActivity": "Yes",
                "GenHealth": "Poor",
                "Asthma": "Yes",
                "KidneyDisease": "Yes",
                "SkinCancer": "No",
            },
            "financial_information": {
                "savings": "300",
                "income": "15000",
                "expense": "10000",
                "investments": "0",
                "debt": "50000",
            },
            "future_risk_level": 0.40,
        }
        self.assertEqual(
            model_interface.JSON_health_encoder(data),
            [20.0, 15.0, 10.0, 8.0, 1, 0, 1, 1, 1, 12, 1, 2, 1, 3, 1, 1, 0],
        )

    def test_financial_plan_too_much_money(self):
        self.assertEqual(
            model_interface.calculate_monthly_contribution(
                16, 120000, 10000, 35000, 15000, 2000, 5000
            ),
            -2,
        )

    def test_financial_plan_general(self):
        self.assertEqual(
            model_interface.calculate_monthly_contribution(
                16, 220000, 10000, 35000, 15000, 2000, 5000
            ),
            437.39,
        )

    def test_financial_plan_zero_inflation(self):
        self.assertEqual(
            model_interface.calculate_monthly_contribution(
                16, 400000, 10000, 35000, 15000, 2000, 5000, 0
            ),
            503.78,
        )

    def test_score_calculation(self):
        score = model_interface.risk_score_prediction(
            [20.0, 15.0, 10.0, 8.0, 1, 0, 1, 1, 1, 12, 1, 2, 1, 3, 1, 1, 0]
        )
        self.assertGreaterEqual(score, 0, "Score should be at least 0")
        self.assertLessEqual(score, 1, "Score should be at most 1")
