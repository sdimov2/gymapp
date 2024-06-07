from flask import jsonify
from backend import get_data_from_entries, filter_entries, global_data


def GetPairs(email, criteria):

    data = filter_entries(global_data[1:], "users", [email])
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