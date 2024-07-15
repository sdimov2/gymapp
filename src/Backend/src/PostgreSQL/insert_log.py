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


def insertLog(newRow, email):

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
        newRow['activity'],
        newRow['variants'],
        newRow['resistance_method'],
        safe_int(newRow['set_n']),
        safe_float(newRow['weight']),
        safe_int(newRow['reps']),
        safe_float(newRow['rpe']),
        None,
        None
    )

    sql_change(query, params)
    
    return "WHOOP"