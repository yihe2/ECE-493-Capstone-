# Import the Flask module
from flask import Flask, request, jsonify
import json
import model_interface
import requests

# Create an instance of the Flask class
app = Flask(__name__)

# Define a route and its corresponding function
@app.route('/')
def hello_world():
    return 'Hello, World!'

# FR 26 and 27
@app.route('/recieve/newuser', methods=['POST'])
def receive_health():
    data = request.json
    return_json = model_interface.JSON_inperpreter(data)
    print("THIS vv")
    print(return_json)

    return jsonify(return_json), 201

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
