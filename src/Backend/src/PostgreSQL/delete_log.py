from postgres import sql_change


def deleteLog(timestamp, email):
    query = f"""
        DELETE FROM "{email}"."Exercises"
        WHERE "Timestamp" = '{timestamp}';
    """

    sql_change(query)
    
    return "WHOOP2"


def deleteBW(timestamp, email):
    query = f"""
        DELETE FROM "{email}"."Bodyweight"
        WHERE "Timestamp" = '{timestamp}';
    """

    sql_change(query)
    
    return "WHOOP2"


def deleteOption(value, email, type):
    query = f"""
        DELETE FROM "{email}"."{type}Options"
        WHERE "Options" = '{value}';
    """

    sql_change(query)
    
    return "WHOOP2"