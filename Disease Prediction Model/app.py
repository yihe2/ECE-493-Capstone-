# Import the Flask module
from flask import Flask
import json

# Create an instance of the Flask class
app = Flask(__name__)

# Define a route and its corresponding function
@app.route('/')
def hello_world():
    return 'Hello, World!'


# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
