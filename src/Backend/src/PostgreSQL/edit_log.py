from postgres import sql_change


def updateLog(updatedRow, email):
    query = f"""
        UPDATE "{email}"."Exercises"
        SET 
            "Workout" = %s,
            "Variants" = %s,
            "Resistance" = %s,
            "Set#" = %s,
            "Weight" = %s,
            "Reps" = %s,
            "RPE" = %s
        WHERE "Timestamp" = %s;
    """

    params = (
        updatedRow['activity'],
        updatedRow['variants'],
        updatedRow['resistance_method'],
        updatedRow['set_n'],
        updatedRow['weight'],
        updatedRow['reps'],
        updatedRow['rpe'],
        updatedRow['timestamp'],
    )


    sql_change(query, params)
    
    return "WHOOP3"