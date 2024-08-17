import psycopg2

# Connection parameters
# conn_params = {
#     "dbname": "Akhil",
#     "user": "user1",
#     "password": "user1",
#     "host": "73.111.169.78",
# }

conn_params = {
    "dbname": "GymBro",
    "user": "postgres",
    "password": "rootAkhil",
}


def execute_query(query, params, fetch):
    conn = psycopg2.connect(**conn_params)
    cur = conn.cursor()

    cur.execute(query, params)

    if fetch:
        returnVal = cur.fetchall()
    else:
        conn.commit()
        returnVal = cur.rowcount

    cur.close()
    conn.close()

    return returnVal


def sql_get(query, params=None):
    return execute_query(query, params, fetch=True)


def sql_change(query, params=None):
    return execute_query(query, params, fetch=False)



# Column Headers
columns = """ 
            "Timestamp", "Workout", "Variants", "Resistance", 
            "Set#", "Weight", "Reps", "RPE", "AdditionalInfo", "FullTimestamp"
          """

columnsBW = """ 
              "Timestamp", "Bodyweight", "FullTimestamp"
            """