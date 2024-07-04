from Backend.line_graph import fit_curve
from datetime import datetime, timedelta
#import tabulate
#import csv
from dateutil import parser

def match_data_type(input, data_type):
    match data_type:
        case "int":
            return int(input)
        case "float":
            return float(input)
        case "list":
            print("list type invoked! leaving data as is")
            return input
        case "timestamp":
            return datetime.strptime(input, '%m/%d/%Y %H:%M:%S')
        case "unix_timestamp":
              return int(datetime.strptime(input, '%m/%d/%Y %H:%M:%S').timestamp())
        case _:
            #leave as string
            return str(input)

def get_data_from_entries(data, criteria1, criteria2, data_type1, data_type2):
    #enumerate, for now its just indecies
    coord_pairs = []
    x = []
    y = []
    for entry in data:
        x.append(match_data_type(entry[criteria1], data_type1))
        y.append(match_data_type(entry[criteria2], data_type2))
        coord_pairs.append([match_data_type(entry[criteria1], data_type1), match_data_type(entry[criteria2], data_type2)])
              
    return coord_pairs, x, y




# def get_bw_by_date(user, date):
#     #data = filter_entries(global_data[1:], "users", [user])
#     #data = filter_entries(data, "", [user])
#     coords = get_coord_pairs_from_user(user, "body_weight", True)[0]

#     fit = fit_curve(coords, 2, linspace="default")[0]
    
#     closest_pair = []

#     for pair in fit:
#         if len(closest_pair) != 0:
#             if abs(date-pair[0]) < abs(date-closest_pair[0]):
#                 closest_pair[0] = pair[0]
#                 closest_pair[1] = pair[1]
#         else:
#             # initial pair
#             closest_pair.append(pair[0])
#             closest_pair.append(pair[1])
#             #closest_pair[0] = pair[0]
#             #closest_pair[1] = pair[1]
#     return closest_pair[1]

