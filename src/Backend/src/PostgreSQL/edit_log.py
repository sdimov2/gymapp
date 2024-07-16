from postgres import sql_change

def updateLog(updatedRow, email):
    query = """
        UPDATE public."WorkoutLogs"
        SET 
            "Workout" = %s,
            "Variants" = %s,
            "Resistance" = %s,
            "Set #" = %s,
            "Weight" = %s,
            "Reps" = %s,
            "RPE" = %s
        WHERE "Timestamp" = %s AND "Email Address" = %s;
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
        email,
    )

    # print(updatedRow)

    affected_rows = sql_change(query, params)
    
    # return "Log updated successfully" if affected_rows > 0 else "No matching log found to update"
    return "WHOOP3"