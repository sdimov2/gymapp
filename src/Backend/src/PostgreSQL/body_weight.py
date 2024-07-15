from flask import jsonify

# from Backend.filter import filter_entries
# from Backend.get_data import get_data_from_entries
from info import sql_get


def GetBodyWeight(email, date):

    # bw = filter_entries(global_data[1:], "users", [str(email)])
    # bw = filter_entries(bw, "body_weight_ranges", [[0,999]])
    # bw = get_data_from_entries(bw, 0, 2, "string", "float")[0]

    query = """
        SELECT * FROM public."WorkoutLogs"
        WHERE "Email Address" = %s
        AND "Bodyweight" IS NOT NULL
        AND LEFT("Timestamp"::text, POSITION(' ' IN "Timestamp"::text) - 1) = %s
    """

    params = (email, date)

    filtered_data = sql_get(query, params)

    temp = []
    for entry in filtered_data:
        temp.append(
            {
            "timestamp": entry[0],
            "bodyweight": entry[9],
            })    

    return jsonify(temp)