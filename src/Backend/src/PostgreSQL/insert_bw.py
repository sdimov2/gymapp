from postgres import sql_change, columnsBW


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
        INSERT INTO "{email}"."Bodyweight"(
            {columnsBW}
        )
        VALUES (
            %s, %s, NOW()
        );
    """

    params = (
        newRow['timestamp'],
        safe_int(newRow['bodyweight']),
    )


    sql_change(query, params)
    
    return "WHOOP"