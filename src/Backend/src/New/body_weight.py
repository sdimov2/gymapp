from flask import jsonify
from backend import get_data_from_entries, filter_entries, global_data


def GetBodyWeight(email):

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
    

    return jsonify(temp)
