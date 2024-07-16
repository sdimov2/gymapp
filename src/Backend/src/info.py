# import gspread
# from oauth2client.service_account import ServiceAccountCredentials
# import numpy as np
# from datetime import datetime
# import pandas as pd

# from dateutil import parser
# import json

#from sklearn.model_selection import train_test_split
#from sklearn.linear_model import LinearRegression
#import tabulate
#import csv

# Connect to Google
# Scope: Enable access to specific links
# scope = ['https://www.googleapis.com/auth/spreadsheets', "https://www.googleapis.com/auth/drive"]

# credentials = ServiceAccountCredentials.from_json_keyfile_name("./gscredentials.json", scope)

# client = gspread.authorize(credentials)

# # Open the Google Sheet
# sheet_id = '1GE8h-5e1UEw5bk-5aOSiyy-VdrloM7C2w6hYb6GLohc'

# sheet = client.open_by_key(sheet_id)

# worksheet = sheet.get_worksheet(0)  # Assuming you want to work with the first worksheet

# global_data = worksheet.get_all_values()


active_rooms = {}


import psycopg2

# Connection parameters
conn_params = {
    "dbname": "GymBro",
    "user": "postgres",
    "password": "rootAkhil",
}


# Connect to the database
def getConnection():
    return psycopg2.connect(**conn_params)

def execute_query(query, params, fetch):
    conn = getConnection()
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
    



columns =  """ 
            "Timestamp", "Email Address", "Workout", "Variants", "Resistance", 
            "Set #", "Weight", "Reps", "RPE", "Bodyweight", "Additional Info", "FullTimestamp" 
        """


# def getGlobalData():
#     conn = getConnection()
#     cur = conn.cursor()

#     cur.execute('SELECT * FROM public."WorkoutLogs"')
#     global_data = cur.fetchall()

#     cur.close()
#     conn.close()

#     return global_data

# global_data = getGlobalData() # FIX THIS IS JUST TEMPORARY






# import psycopg2
# import pandas as pd

# # Connection parameters
# conn_params = {
#     "dbname": "GymBro",
#     "user": "postgres",
#     "password": "rootAkhil",
# }

# # Connect to the database
# conn = psycopg2.connect(**conn_params)
# cur = conn.cursor()

# cur.execute('SELECT * FROM public."WorkoutLogs"')
# # one = cur.fetchone()
# # global_data = cur.fetchall()

# # print(one)
# # print(all)


# cur.close()
# conn.close()




# # Query the data
# query = "SELECT * FROM WorkoutLogs"
# df = pd.read_sql_query(query, conn)

# # Close the connection
# conn.close()

# # Now df contains your data
# print(df.head())


#return global_data[1:]

#names = [row[0] for row in data[1:]]  # Assuming first row contains headers
# class TreeNode:
#     def __init__(self, name):
#             self.name = name
#             self.value = None
#             self.children = []
#             self.parent = None
#     def add_child(self, child):
#         child.parent = self
#         self.children.append(child)
#     def print_tree(self):
#         prefix = '-'*self.get_level()
#         print(prefix + self.name + ", " + str(self.value))
#         if len(self.children) > 0:
#             for child in self.children:
#                 child.print_tree()
#     def get_level(self):
#         if self.parent == None:
#             return 0
#         level = self.parent.get_level() + 1
#         return level
#     def get_child(self, name):
#         for child in self.children:
#             if child.name == name:
#                 return child
            


# #takes in the database and the tree heirarchy
# def build_user_tree(data):
#     users = TreeNode("users")
#     #iterates through each row of data, skipping over the headers, using the timestamp as a marker of a data entry
#     i=1
#     while(data[i][0] != ''):
#         #compares each row of data if it matches any existing user, row  is the email
#         entry = create_data_entry(data[i])
#         if user_match(data[i],users):
#             #adds this row to the tree of data
#             user_match(data[i],users).get_child("data").add_child(entry)
#         else:
#             #create and append a user to an existing tree of users
#             user = create_new_user(users)
#             users.add_child(user)
#             user.value = data[i][1]
#             user.get_child("data").add_child(entry)
#         i+=1
#     return users


# def user_match(row,users):
#     if len(users.children) == 0:
#         return 0
#     for user in users.children:
#         if row[1] == user.value:
#             return user
#     return 0


# def create_data_entry(row):
#     #if there is no timestamp, don't do it
#     if row[0] != '':
#         entry = TreeNode("entry")
#         timestamp = TreeNode("timestamp")
#         timestamp.value = (row[0])
#         entry.add_child(timestamp)

#         #make sure "workout" or '' do not show up. You can't check for type != string since all responses are str
#         if row[2] != '' and row[2] != "workout":
#             body_weight = TreeNode("body_weight")
#             body_weight.value = (float(row[2]))
#             entry.add_child(body_weight)
#         else:
#         #make sure that this is not an entry for a weight
#         #if row[2] == "workout" and type(row[2]) != float and type(row[2]) != int:
#             activity = TreeNode("activity")
#             activity.value = row[3]
#             entry.add_child(activity)

#             # finish this later
#             variants = TreeNode("variants")
            
#             entry.add_child(variants)

#             #if row[7] != '': # this shouldn't be necessary
#             resistance_type = TreeNode("resistance_type")
#             resistance_type.value = row[5]
#             entry.add_child(resistance_type)

#             if row[6] != '': # this shouldn't be necessary
#                 set_n = TreeNode("set_n")
#                 set_n.value = int(row[6])
#                 entry.add_child(set_n)

#             if row[8] != '': # this shouldn't be necessary
#                 reps = TreeNode("reps")
#                 reps.value = int(row[8])
#                 entry.add_child(reps)

#             if row[7] != '':
#                 weight = TreeNode("weight")
#                 weight.value = float(row[7])
#                 entry.add_child(weight)

#             if row[9] != '':
#                 rpe = TreeNode("rpe")
#                 rpe.value = int(row[9])
#                 entry.add_child(rpe)
#     return entry



# def create_new_user(users):
#     user = TreeNode("user"+str(len(users.children)))
#     data = TreeNode("data")
#     name = TreeNode("name")
#     user.add_child(data)
#     user.add_child(name)
#     return user






# if __name__ == '__main__':
#     users = build_user_tree(global_data)
#     users.print_tree()
#     pass

# def get_coord_pairs_from_user(user, criteria, unix_output):
#     coord_pairs = []
#     x = []
#     currx = 0
#     y = []
#     for child in users.get_child(user).get_child("data").children:
#         if child.get_child(criteria):
#             if unix_output == True:
#                 currx = int(datetime.strptime(child.get_child("timestamp").value, '%m/%d/%Y %H:%M:%S').timestamp())
#                 x.append(currx)
#             else:
#                 currx = datetime.strptime(child.get_child("timestamp").value, '%m/%d/%Y %H:%M:%S')
#                 x.append(currx)
#             y.append(child.get_child(criteria).value)
#             coord_pairs.append([currx, child.get_child("body_weight").value])
#     return coord_pairs, x, y 
#