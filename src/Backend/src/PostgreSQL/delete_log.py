from info import sql_change

def deleteLog(timestamp):
    query = """
        DELETE FROM public."WorkoutLogs"
        WHERE "Timestamp" = %s
    """

    sql_change(query, (timestamp,))
    
    return "WHOOP2"
    