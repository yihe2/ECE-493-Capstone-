# Import the Flask module
from flask import Flask, request, jsonify
import json
import model_interface

# Create an instance of the Flask class
app = Flask(__name__)

# Define a route and its corresponding function
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/recieve/newuser', methods=['POST'])
def receive_health():
    data = request.json
    print(data)
    print(model_interface.JSON_inperpreter(data))
    return jsonify({'status':'success'}), 201

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
