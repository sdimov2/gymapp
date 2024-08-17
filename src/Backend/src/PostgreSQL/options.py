from flask import jsonify

from postgres import sql_get


def GetOptions(email):  # FIX: Create an options table. Add a image to options
    workouts, variants, resistances = [], [], []


    workout_query = f"""
        SELECT * FROM "{email}"."WorkoutOptions"
        ORDER BY "Options" ASC
    """

    variant_query = f"""
        SELECT * FROM "{email}"."VariantOptions"
        ORDER BY "Options" ASC
    """

    resistance_query = f"""
        SELECT * FROM "{email}"."ResistanceOptions"
        ORDER BY "Options" ASC
    """


    try:
        workouts = [row[0] for row in sql_get(workout_query)]
    except Exception as e:
        print(f"Error fetching options: {e}")

    try:
        variants = [row[0] for row in sql_get(variant_query)]
    except Exception as e:
        print(f"Error fetching options: {e}")

    try:
        resistances = [row[0] for row in sql_get(resistance_query)]
    except Exception as e:
        print(f"Error fetching options: {e}")


    return jsonify([workouts], [variants], [resistances])