from flask import jsonify

from postgres import sql_get


def GetFull(email):
    query = f"""
        SELECT * FROM "{email}"."Exercises"
        WHERE "Workout" IS NOT NULL 
        ORDER BY "FullTimestamp";
    """

    return polishedData(sql_get(query))


def GetHome(email, date):
    query = f"""
        SELECT * FROM "{email}"."Exercises"
        WHERE "Workout" IS NOT NULL
        AND LEFT("Timestamp", POSITION(' ' IN "Timestamp") - 1) = '{date}'
    """

    return polishedData(sql_get(query))


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
                "activity": entry[1],
                "variants": entry[2],	
                "resistance_method": entry[3],
                "set_n": entry[4],
                "weight": entry[5],
                "reps": entry[6],
                "rpe": entry[7],
                "toggle": toggle,
                "isEditing": False,
            })
        
        prevEntry = entry
        
    return jsonify(temp)