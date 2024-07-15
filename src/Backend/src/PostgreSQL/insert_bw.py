from info import sql_change, columns

def safe_int(value, default=0):
    try:
        return int(value) if value not in (None, '') else default
    except ValueError:
        return default

def safe_float(value, default=0.0):
    try:
        return float(value) if value not in (None, '') else default
    except ValueError:
        return default


def insertBW(newRow, email):

    query = f"""
        INSERT INTO public."WorkoutLogs"(
            {columns}
        )
        VALUES (
            %s, %s, %s, %s, %s, 
            %s, %s, %s, %s, %s, %s
        );
    """

    params = (
        newRow['timestamp'],
        email,
        None,
        None,
        None,
        None,
        None,
        None,
        None,
        safe_int(newRow['bodyweight']),
        None,
    )

    sql_change(query, params)
    
    return "WHOOP"