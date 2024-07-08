from flask import jsonify

from Backend.filter import filter_entries
from Backend.get_data import get_data_from_entries
from info import global_data


def GetBodyWeight(email, date):

    # bw = filter_entries(global_data[1:], "users", [str(email)])
    # bw = filter_entries(bw, "body_weight_ranges", [[0,999]])
    # bw = get_data_from_entries(bw, 0, 2, "string", "float")[0]

    filtered_data = [row for row in global_data if row[1] in [email] and row[9] and date == row[0].split(' ')[0]]

    print(filtered_data)

    temp = []
    for entry in filtered_data:
        temp.append(
            {
            "date": entry[0],
            "weight": entry[9],
            })    

    return jsonify(temp)