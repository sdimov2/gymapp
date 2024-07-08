from flask import jsonify

from Backend.filter import filter_entries
from Backend.get_data import get_data_from_entries
from info import global_data



def GetPairs(email, criteria):

    filtered_data = [row for row in global_data if row[1] in [email] and not row[9]]

    # data = filter_entries(global_data[1:], "users", [email])
    # data = filter_entries(data, "activities", [criteria])
    # pairs = get_data_from_entries(data, 0, 7, "string", "float")[0]
    
    temp = []
    for entry in filtered_data:
        temp.append(
            {
            "x": entry[0],
            "y": entry[9],
            })
        
    print("Temp: ", temp)
        
    return jsonify(temp)



def GetAreaChart(email):

    # bw = filter_entries(global_data[1:], "users", [str(email)])
    # bw = filter_entries(bw, "body_weight_ranges", [[0,999]])
    # bw = get_data_from_entries(bw, 0, 2, "string", "float")[0]
    
    filtered_data = [row for row in global_data if row[1] in [email] and row[9]]

    temp = []
    for entry in filtered_data:
        temp.append(
            {
            "date": entry[0],
            "weight": entry[9],
            })    

    return jsonify(temp)