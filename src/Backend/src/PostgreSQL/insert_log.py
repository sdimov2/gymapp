from postgres import sql_change, columns


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

def insertLog(newRow, email, new):

    query = f"""
        INSERT INTO "{email}"."Exercises"(
            {columns}
        )
        VALUES (
            %s, %s, %s, %s, 
            %s, %s, %s, %s, 
            %s, NOW()
        );
    """

    params = (
        newRow['timestamp'],
        newRow['activity'],
        newRow['variants'],
        newRow['resistance_method'],
        safe_int(newRow['set_n']),
        safe_float(newRow['weight']),
        safe_int(newRow['reps']),
        safe_float(newRow['rpe']),
        None,
    )

    sql_change(query, params)

    if new:
        query1 = f"""
                INSERT INTO "{email}"."WorkoutOptions"("Options")
                VALUES ('{newRow['activity'].replace("'", "''")}')
                """
        
        query2 = f"""
                INSERT INTO "{email}"."VariantOptions" ("Options")
                VALUES ('{newRow['variants'].replace("'", "''")}')
                """

        query3 = f"""
                INSERT INTO "{email}"."ResistanceOptions" ("Options")
                VALUES ('{newRow['resistance_method'].replace("'", "''")}')
                """
        
        try: sql_change(query1)
        except: print("Query1 Failed")

        try: sql_change(query2)
        except: print("Query2 Failed")

        try: sql_change(query3)
        except: print("Query3 Failed")

    return "WHOOP"