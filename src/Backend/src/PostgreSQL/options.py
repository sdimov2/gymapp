from flask import jsonify
# from numpy import sort

# from Backend.filter import filter_entries
# from Backend.get_data import get_data_from_entries
# from info import global_data

from info import sql_get


def GetOptions():  # FIX: Create an options table. Add a image to options

    workout_query = """
    SELECT DISTINCT "Workout"
    FROM public."WorkoutLogs"
    WHERE "Workout" IS NOT NULL AND "Workout" != ''
    ORDER BY "Workout";
    """

    variant_query = """
    SELECT DISTINCT "Variants"
    FROM public."WorkoutLogs"
    WHERE "Variants" IS NOT NULL AND "Variants" != ''
    ORDER BY "Variants";
    """

    resistance_query = """
    SELECT DISTINCT "Resistance"
    FROM public."WorkoutLogs"
    WHERE "Resistance" IS NOT NULL AND "Resistance" != ''
    ORDER BY "Resistance";
    """

    try:
        workouts = [row[0] for row in sql_get(workout_query)]
        variants = [row[0] for row in sql_get(variant_query)]
        resistances = [row[0] for row in sql_get(resistance_query)]

        # workouts = sorted(set(workouts), key=str.lower)
        # variants = sorted(set(variants), key=str.lower)
        # resistances = sorted(set(resistances), key=str.lower)
    except Exception as e:
        print(f"Error fetching options: {e}")
        # return jsonify([[], [], []])

    return jsonify([workouts], [variants], [resistances])