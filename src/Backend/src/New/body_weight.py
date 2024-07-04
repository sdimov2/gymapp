from flask import jsonify

from Backend.filter import filter_entries
from Backend.get_data import get_data_from_entries
from info import global_data
from Backend.line_graph import fit_curve


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

def get_bw_by_date(user_bw_data, date):
    # #data = filter_entries(global_data[1:], "users", [user])
    # #data = filter_entries(data, "", [user])
    # coords = get_data_from_entries(user, "body_weight", True)[0]
    coords = get_data_from_entries(user_bw_data, 0, 2, "unix_timestamp", "int")[0]

    fit = fit_curve(coords, 2, linspace="default")[0]
    
    closest_pair = []

    for pair in fit:
        if len(closest_pair) != 0:
            if abs(date-pair[0]) < abs(date-closest_pair[0]):
                closest_pair[0] = pair[0]
                closest_pair[1] = pair[1]
        else:
            # initial pair
            closest_pair.append(pair[0])
            closest_pair.append(pair[1])
            #closest_pair[0] = pair[0]
            #closest_pair[1] = pair[1]
    return closest_pair[1]