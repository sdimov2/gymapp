from flask import jsonify

from Backend.filter import filter_entries
from Backend.get_data import get_data_from_entries
from info import global_data


def GetApi(email):
    data = filter_entries(global_data[1:], "users", [email])
    temp = []

    prevEntry = None
    toggle = False
    
    for entry in data:

        if (prevEntry and prevEntry[0].split(' ')[0] != entry[0].split(' ')[0]):
            toggle = not toggle

        temp.append(
            {
            "id": entry[0],
            "timestamp": entry[0], 		
            "activity": entry[3],
            "variants": entry[4],	
            "resistance_method": entry[5],
            "set_n": entry[6],
            "weight": entry[7],
            "reps": entry[8],
            "rpe": entry[9],
            "toggle": toggle,
            "isEditing": False,
            "bodyweight": entry[2],
            })
        
        prevEntry = entry
        
    return jsonify(temp)

