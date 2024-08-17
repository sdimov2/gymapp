from flask import jsonify

from postgres import sql_get


def GetBodyWeight(email, date):
    query = f"""
        SELECT * FROM "{email}"."Bodyweight"
        WHERE LEFT("Timestamp", POSITION(' ' IN "Timestamp") - 1) = '{date}'
    """

    return polishedData(sql_get(query))


def polishedData(filtered_data):

    temp = []

    for entry in filtered_data:
        temp.append(
            {
                "timestamp": entry[0],
                "bodyweight": entry[1],
            })    

    return jsonify(temp)