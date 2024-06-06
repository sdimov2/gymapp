from flask import Flask, request, jsonify
from flask_cors import CORS
from backend import get_data_from_entries, filter_entries, global_data


app = Flask(__name__)
CORS(app, origins=['http://localhost:8081'])
CORS(app, supports_credentials=True)

@app.route("/api")
def return_global_data():
    data = filter_entries(global_data[1:], "users", ["sdimov77@gmail.com"])
    temp = []
    for entry in data:
        temp.append(
            {
            "timestamp": entry[0], 
            "user":	entry[1],		
            "lift": entry[2],	
            "activity": entry[3],
            "variants": entry[4],	
            "resistance_method": entry[5],
            "set_n": entry[6],
            "weight": entry[7],
            "reps": entry[8],
            "rpe": entry[9],
            })
    return jsonify(temp)


@app.route("/bw", methods=['POST'])
def bw():

    email = request.get_json().get('email')

    # print(email)

    # print(global_data)

    bw = filter_entries(global_data[1:], "users", [str(email)])
    bw = filter_entries(bw, "body_weight_ranges", [[0,999]])
    bw = get_data_from_entries(bw, 0, 2, "string", "float")[0]
    temp = []
    for entry in bw:
        temp.append(
            {
            "date": entry[0],
            "weight": entry[1],
            })
    
    # print("Hi")
    print(temp)

    return jsonify(temp)



@app.route("/get_pairs")
def get_pairs(criteria="Bench"):

   # 0 timestamp, 7 is weight (placeholdr)
    data = filter_entries(global_data[1:], "users", ["sdimov77@gmail.com"])
    data = filter_entries(data, "activities", [criteria])
    pairs = get_data_from_entries(data, 0, 7, "string", "float")[0]
    temp = []
    for entry in pairs:
        temp.append(
            {
            "x": entry[0],
            "y": entry[1],
            })
        

    return jsonify(temp)



@app.route("/options")
def options():
    data = global_data[1:]
    unique_values = set()
    for s in data:
        unique_values.add(s[3])
    unique_values_list = list(unique_values)
    temp = []
    for entry in unique_values_list:
        temp.append(
            {
            "label": entry, 
            "value": entry
            })

    return jsonify(temp)



    # key = "activity"
    # unique_values = set()
    # for s in data:
    #     if key in s:
    #         unique_values.add(s[key])
    # unique_values_list = list(unique_values)
    # temp = []
    # for entry in unique_values_list:
    #     temp.append(
    #         {
    #         "label": entry, 
    #         "value": entry
    #         })
   


@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.get_json().get('selected')  # Assuming data is sent as JSON
    
    print(data)
    # Process the received data here
    # return data
    return "success"


@app.route('/test-akhil', methods=['POST'])
def passData():
    data = request.get_json().get('email')  # Assuming data is sent as JSON
    
    print(data)
    # Process the received data here
    # return data
    return "success"



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)