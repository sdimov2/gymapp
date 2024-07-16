from info import sql_change

def deleteLog(timestamp, email):
    query = """
        DELETE FROM public."WorkoutLogs"
        WHERE "Timestamp" = %s AND "Email Address" = %s;
    """

    params = (timestamp, email)

    sql_change(query, params)
    
    return "WHOOP2"
    