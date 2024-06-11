from flask import jsonify

from Backend.filter import filter_entries
from Backend.get_data import get_data_from_entries
from info import global_data


def GetApi(email):

    data = filter_entries(global_data[1:], "users", [email])
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

