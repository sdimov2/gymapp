from postgres import sql_change


def register(email):

    query1 = f"""
                CREATE SCHEMA "{email}";
            """

    query2 = f"""
                CREATE TABLE "{email}"."Exercises"
                (
                    "Timestamp" text,
                    "Workout" text,
                    "Variants" text,
                    "Resistance" text,
                    "Set#" integer,
                    "Weight" numeric,
                    "Reps" integer,
                    "RPE" integer,
                    "AdditionalInfo" text,
                    "FullTimestamp" timestamp with time zone
                );
            """

    query3 = f"""
                CREATE TABLE "{email}"."Bodyweight"
                (
                    "Timestamp" text,
                    "Bodyweight" numeric,
                    "FullTimestamp" timestamp with time zone
                );
            """
    
    query4 = f"""
                CREATE TABLE "{email}"."WorkoutOptions"
                (
                    "Options" text NOT NULL,
                    CONSTRAINT "unique_Options1" UNIQUE ("Options"),
                    CONSTRAINT "no_spaces_in_Options1" CHECK (TRIM("Options") <> '')
                )
            """
    
    query5 = f"""
                CREATE TABLE "{email}"."VariantOptions"
                (
                    "Options" text NOT NULL,
                    CONSTRAINT "unique_Options2" UNIQUE ("Options"),
                    CONSTRAINT "no_spaces_in_Options2" CHECK (TRIM("Options") <> '')
                )
            """
    
    query6 = f"""
                CREATE TABLE "{email}"."ResistanceOptions"
                (
                    "Options" text NOT NULL,
                    CONSTRAINT "unique_Options3" UNIQUE ("Options"),
                    CONSTRAINT "no_spaces_in_Options3" CHECK (TRIM("Options") <> '')
                )
            """

    sql_change(query1)
    sql_change(query2)
    sql_change(query3)
    sql_change(query4)
    sql_change(query5)
    sql_change(query6)
    
    return "WHOOP"