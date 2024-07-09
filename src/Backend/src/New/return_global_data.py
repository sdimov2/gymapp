from flask import jsonify

from Backend.filter import filter_entries
from Backend.get_data import get_data_from_entries
from info import global_data


def GetFull(email):
    filtered_data = [row for row in global_data if row[1] in [email] and row[2]] # FIX: FILTER USING SQL

    return filteredData(filtered_data)


def GetHome(email, date):
    filtered_data = [row for row in global_data if row[1] in [email] and row[2] and row[0].split(' ')[0] == date] # FIX: FILTER USING SQL
    
    return filteredData(filtered_data)



def filteredData(filtered_data):
    temp = []

    prevEntry = None
    toggle = False
    
    for entry in filtered_data:

        if (prevEntry and prevEntry[0].split(' ')[0] != entry[0].split(' ')[0]):
            toggle = not toggle

        temp.append(
            {
                "timestamp": entry[0], 		
                "activity": entry[2],
                "variants": entry[3],	
                "resistance_method": entry[4],
                "set_n": entry[5],
                "weight": entry[6],
                "reps": entry[7],
                "rpe": entry[8],
                "toggle": toggle,
                "isEditing": False,
            })
        
        prevEntry = entry
        
    return jsonify(temp)