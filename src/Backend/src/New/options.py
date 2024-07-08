from flask import jsonify
from numpy import sort

from Backend.filter import filter_entries
from Backend.get_data import get_data_from_entries
from info import global_data


def GetOptions():  # Add a image to options
    workoutData = set()
    variantData = set()
    resistanceData = set()
    
    for s in global_data[1:]:
        if (s[2]): workoutData.add(s[2])
        if (s[3]): variantData.add(s[3])
        if (s[4]): resistanceData.add(s[4])

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