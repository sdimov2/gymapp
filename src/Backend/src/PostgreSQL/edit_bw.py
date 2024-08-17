from postgres import sql_change


def updateBW(updatedRow, email):
    query = f"""
        UPDATE "{email}"."Bodyweight"
        SET 
            "Bodyweight" = %s
        WHERE "Timestamp" = %s;
    """

    params = (
        updatedRow['bodyweight'],
        updatedRow['timestamp'],
    )


    sql_change(query, params)

    return "WHOOP3"