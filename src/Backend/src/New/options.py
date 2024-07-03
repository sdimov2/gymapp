from flask import jsonify
from numpy import sort

from Backend.filter import filter_entries
from Backend.get_data import get_data_from_entries
from info import global_data


def GetOptions():  # Add a image to options

    data = global_data[1:]
    workoutData = set()
    variantData = set()
    resistanceData = set()
    
    for s in data:
        if (s[3] != ""): workoutData.add(s[3])
        if (s[4] != ""): variantData.add(s[4])
        if (s[5] != ""): resistanceData.add(s[5])

    workoutList = list(workoutData)
    workoutList.sort()

    variantList = list(variantData)
    variantList.sort()

    resistanceList = list(resistanceData)
    resistanceList.sort()
 
    # temp = []
    
    # for entry in unique_values_list:
    #     temp.append(
    #         {
    #             "label": entry, 
    #             "value": entry
    #         })


    return jsonify([workoutList], [variantList], [resistanceList])