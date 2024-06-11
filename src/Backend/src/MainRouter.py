from flask import Flask, request, jsonify
from flask_cors import CORS


from New.body_weight import GetBodyWeight
from New.get_pairs import GetPairs
from New.options import GetOptions
from New.receive_data import ProcessData
from New.return_global_data import GetApi


app = Flask(__name__)
CORS(app, origins=['http://localhost:8081'])
CORS(app, supports_credentials=True)


@app.route("/api", methods=['POST'])
def api0():

    email = "sdimov77@gmail.com"
    # email = request.get_json().get('email') 

    data = GetApi(email)

    return data


@app.route("/bw", methods=['POST'])
def api1():

    email = request.get_json().get('email')

    data = GetBodyWeight(email)

    return data


@app.route("/get_pairs", methods=['POST'])
def api2():

    email = "sdimov77@gmail.com"
    # email = request.get_json().get('email') 
    criteria = "Bench"
    # criteria = request.get_json().get('criteria') 

    data = GetPairs(email, criteria)

    return data


@app.route("/options")
def api3():
    data = GetOptions()

    return data


@app.route('/receive_data', methods=['POST'])
def api4():

    selected = request.get_json().get('selected') 

    data = ProcessData(selected)

    return data


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)