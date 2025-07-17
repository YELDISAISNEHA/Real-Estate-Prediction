from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import util

app = Flask(__name__, static_folder='../Frontend', static_url_path='')
CORS(app)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'app.html')

@app.route('/app.css')
def css():
    return send_from_directory(app.static_folder, 'app.css')

@app.route('/app.js')
def js():
    return send_from_directory(app.static_folder, 'app.js')

@app.route('/get_location_names',  methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location,total_sqft,bhk,bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("starting python flask server for home price prediction...")
    util.load_saved_artifacts()
    app.run(host='0.0.0.0', port=8080)
