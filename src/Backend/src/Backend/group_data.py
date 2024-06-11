from datetime import datetime, timedelta
from itertools import groupby



def group_data_by_date2(data, date, grouping="daily"):
    # Convert date strings to datetime objects
    date_objects = [datetime.strptime(d, '%m/%d/%Y %H:%M:%S') for d in date]
    print(date_objects)

    # Combine data, date, and date objects into tuples
    combined_data = list(zip(date, date_objects, data))
    
    # Sort the combined data by date object
    sorted_data = sorted(combined_data, key=lambda x: x[1])

    # Group data by date
    grouped_data = {key: [item[2] for item in group] for key, group in groupby(sorted_data, key=lambda x: x[1])}

    # Convert grouped data to list of lists
    result = [[date.strftime('%m/%d/%Y %H:%M:%S'), values] for date, values in grouped_data.items()]
    return result

def group_data_by_timestamp(data, dates, grouping='day'):
    grouped_data = {}

    for i, date in enumerate(dates):
        date_obj = datetime.strptime(date, '%m/%d/%Y %H:%M:%S')
        #print(date_obj)
        if grouping == 'day':
            group_key = int((date_obj - datetime(1970, 1, 1)) / timedelta(seconds=1))
        elif grouping == 'week':
            # Get the first day of the week
            first_day_of_week = date_obj - timedelta(days=date_obj.weekday())
            group_key = int((first_day_of_week - datetime(1970, 1, 1)) / timedelta(seconds=1))
        elif grouping == 'month':
            # Get the first day of the month
            first_day_of_month = datetime(date_obj.year, date_obj.month, 1)
            group_key = int((first_day_of_month - datetime(1970, 1, 1)) / timedelta(seconds=1))
        elif grouping == 'year':
            # Get the first day of the year
            first_day_of_year = datetime(date_obj.year, 1, 1)
            group_key = int((first_day_of_year - datetime(1970, 1, 1)) / timedelta(seconds=1))
        else:
            raise ValueError("Invalid grouping option. Use 'day', 'week', 'month', or 'year'.")

        if group_key not in grouped_data:
            grouped_data[group_key] = []

        grouped_data[group_key].append(data[i])

        result = []
        for key, value in grouped_data.items():
            result.append([key, value])

    return result

def get_first_day_of_week(year, week):
    first_day = datetime.strptime(f'{year}-{week}-1', "%Y-%U-%w")
    return first_day

def group_data_by_date(data, timestamps, grouping='day'):
    # Combine data, timestamps, and datetime objects into tuples
    combined_data = list(zip(timestamps, [datetime.fromtimestamp(ts) for ts in timestamps], data))
    
    # Sort the combined data by timestamp
    sorted_data = sorted(combined_data, key=lambda x: x[1])

    # Define a function to get the grouping key based on grouping level
    def get_grouping_key(date_obj):
        if grouping == 'day':
            return date_obj.strftime('%Y-%m-%d')
        elif grouping == 'week':
            year, week, _ = date_obj.isocalendar()
            first_day = get_first_day_of_week(year, week)
            return first_day.strftime('%Y-%m-%d')
        elif grouping == 'month':
            return date_obj.strftime('%Y-%m')  # Year-month format
        elif grouping == 'year':
            return date_obj.strftime('%Y')

    # Group data by timestamp
    grouped_data = {key: [item[2] for item in group] for key, group in groupby(sorted_data, key=lambda x: get_grouping_key(x[1]))}

    # Convert grouped data to list of lists
    result = [[timestamp, values] for timestamp, values in grouped_data.items()]

    return result