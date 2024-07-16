import psycopg2


# Column Headers
columns = """ 
            "Timestamp", "Email Address", "Workout", "Variants", "Resistance", 
            "Set #", "Weight", "Reps", "RPE", "Bodyweight", "Additional Info", "FullTimestamp" 
          """

# Connection parameters
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