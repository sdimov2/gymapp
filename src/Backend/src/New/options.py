from flask import jsonify

from Backend.filter import filter_entries
from Backend.get_data import get_data_from_entries
from info import global_data


def GetOptions():

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