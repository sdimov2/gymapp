from postgres import sql_change

def updateBW(updatedRow, email):
    query = """
        UPDATE public."WorkoutLogs"
        SET 
            "Bodyweight" = %s
        WHERE "Timestamp" = %s AND "Email Address" = %s;
    """

    params = (
        
        updatedRow['bodyweight'],
        updatedRow['timestamp'],
        email,
    )

    sql_change(query, params)

    return "WHOOP3"