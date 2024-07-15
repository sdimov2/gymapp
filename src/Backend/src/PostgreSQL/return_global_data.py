from flask import jsonify

# from Backend.filter import filter_entries
# from Backend.get_data import get_data_from_entries
from info import sql_get


def GetFull(email):
    query = """
        SELECT * FROM public."WorkoutLogs"
        WHERE "Email Address" = %s
        AND "Workout" IS NOT NULL 
    """ # FIX: SHOULD WE REMOVE BODYWEIGHT FROM MAIN CHART? IT'S NOT EVEN DISPLAYED


    params = (email,)

    return polishedData(sql_get(query, params))


def GetHome(email, date):
    query = """
        SELECT * FROM public."WorkoutLogs"
        WHERE "Email Address" = %s
        AND "Workout" IS NOT NULL
        AND LEFT("Timestamp"::text, POSITION(' ' IN "Timestamp"::text) - 1) = %s
    """

    params = (email, date)

    return polishedData(sql_get(query, params))


def polishedData(filtered_data):
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