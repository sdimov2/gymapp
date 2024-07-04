from flask import jsonify

from Backend.filter import filter_entries
from Backend.get_data import get_data_from_entries
from info import global_data
from datetime import datetime, timedelta
#import tabulate
#import csv
from dateutil import parser
from Backend.group_data import group_data_by_date
from New.body_weight import get_bw_by_date

def get_daily_volume(email):
    # let's try to graph daily volume
    user_data = filter_entries(global_data[1:], "users", [email])
    user_bw = filter_entries(user_data, 'body_weight_ranges', [[0,999]])
    #make sure calisthenics have values for now
    last_body_weight = 0
    for entry in user_data:
        if entry[2] != 'workout' and entry[2] != '':
            last_body_weight = entry[2]
            
        if entry[5] == "calisthenic":
            entry[7] = last_body_weight

    user_data = filter_entries(user_data, "workout", ["workout",''])

    dates = []
    unix_timestamps = []
    for entry in user_data:
        dates.append(entry[0])
        unix_timestamps.append(int(datetime.strptime(entry[0], '%m/%d/%Y %H:%M:%S').timestamp()))

    data_by_date = group_data_by_date(user_data, unix_timestamps, grouping="day")
    #[[date,entries],[date2,entries]]

    daily_volume = []
    daily_volume_by_bw = []
    for time_group in data_by_date:
        volume = 0
        volume_by_bw = 0
        for entry in time_group[1]:
            #print(entry)
            # having issues with calisthenics since data doesn't have weight values for them
            
            date_format = "%m/%d/%Y %H:%M:%S"

            # Parse the date string into a datetime object
            date_obj = datetime.strptime(entry[0], date_format)
            date = date_obj.timestamp()
            print(date)

            bw = get_bw_by_date(user_bw, date)
            print(bw)
            volume += float(entry[7])*float(entry[8])
            volume_by_bw += float(entry[7])*float(entry[8])/bw/bw
            
        daily_volume.append((int(datetime.strptime(time_group[0], '%Y-%m-%d').timestamp()),(volume)))
        daily_volume_by_bw.append((time_group[0],volume_by_bw))
    return jsonify(daily_volume)




