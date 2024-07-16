from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, emit

from PostgreSQL.receive_data import ProcessData
from PostgreSQL.options import GetOptions
from PostgreSQL.insert_log import insertLog
from PostgreSQL.insert_bw import insertBW
from PostgreSQL.edit_bw import updateBW
from PostgreSQL.edit_log import updateLog
from PostgreSQL.delete_log import deleteLog
from PostgreSQL.return_body_weight import GetBodyWeight
from PostgreSQL.return_global_data import GetFull, GetHome
# from New.charts import GetPairs, GetAreaChart


app = Flask(__name__)
CORS(app, origins=['http://localhost:8081'])
CORS(app, supports_credentials=True)

socketio = SocketIO(app, cors_allowed_origins="http://localhost:8081")


active_rooms = {}


@app.route("/full_table", methods=['POST'])
def api0():

    # email = "sdimov77@gmail.com"
    email = request.get_json().get('email') 
    # print(email)

    data = GetFull(email)

    return data


@app.route("/home_table", methods=['POST'])
def api1():

    # email = "sdimov77@gmail.com"
    email = request.get_json().get('email') 
    date = request.get_json().get('date')

    # print(email)

    data = GetHome(email, date)

    return data


@app.route("/bw", methods=['POST'])
def api2():

    email = request.get_json().get('email')
    date = request.get_json().get('date')

    data = GetBodyWeight(email, date)

    return data



@app.route("/area_chart", methods=['POST'])
def api3():

    email = request.get_json().get('email')

    # data = GetAreaChart(email)

    # return data


@app.route("/volume_chart", methods=['POST'])
def api4():

    email = "sdimov77@gmail.com"
    # email = request.get_json().get('email') 
    criteria = "Bench"
    # criteria = request.get_json().get('criteria') 

    # data = GetPairs(email, criteria)

    # return data


@app.route("/options")
def api5():
    data = GetOptions()

    return data


@app.route('/receive_data', methods=['POST'])
def api6():

    selected = request.get_json().get('selected') 

    data = ProcessData(selected)

    return data


@app.route('/insert_log', methods=['POST'])
def api7():

    selected = request.get_json().get('newRow') 
    email = request.get_json().get('email') 

    insertLog(selected, email)

    return "success"


@app.route('/insert_bw', methods=['POST'])
def api8():

    selected = request.get_json().get('newRow') 
    email = request.get_json().get('email') 

    insertBW(selected, email)

    return "success"


@app.route('/delete_log', methods=['POST'])
def api9():

    id = request.get_json().get('id') 
    email = request.get_json().get('email') 

    data = deleteLog(id, email)

    return "success"


@app.route('/edit_log', methods=['POST'])
def api10():

    id = request.get_json().get('newRow') 
    email = request.get_json().get('email')

    # print(id)

    data = updateLog(id, email)

    return "success"


@app.route('/edit_bw', methods=['POST'])
def api11():

    id = request.get_json().get('newRow') 
    email = request.get_json().get('email')

    data = updateBW(id, email)

    return "success"




@socketio.on("connect")
def connected():
    # print(request.sid)
    print("client has connected")
    emit("connect1", {"data": "AKHIL SAYS HI"})
    emit('rooms', {'rooms': active_rooms})


@socketio.on("disconnect")
def disconnected():
    print("user disconnected")
    emit("disconnect1", f"user {request.sid} disconnected", broadcast=True)


# AKHIL HELPER
@socketio.on("clearRooms")
def clearRooms():
    active_rooms = {}

    emit('rooms', {'rooms': active_rooms},  broadcast=True)


@socketio.on('join_room')
def handle_join_room(data):
    room = data['room']

    join_room(room)
    active_rooms[room] = active_rooms.get(room, 0) + 1
    emit('join_room_announcement', {'data': f'User {request.sid} has joined the room {room}'}, to=room)
    emit('rooms', {'rooms': active_rooms},  broadcast=True)


@socketio.on('leave_room')
def handle_leave_room(data):
    room = data['room']

    leave_room(room)
    if room in active_rooms:
        active_rooms[room] -= 1
        if active_rooms[room] == 0:
            del active_rooms[room]

    emit('leave_room_announcement', {'data': f'User {request.sid} has left the room {room}'}, to=room)
    emit('rooms', {'rooms': active_rooms},  broadcast=True)


@socketio.on('send_message')
def handle_send_message(data):
    room = data['room']
    message = data['message']
    user_email = data.get('email')

    emit('receive_message', {'user': user_email, 'message': message}, to=room)
    


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5000, debug=True)
    socketio.run(app, debug=True, port=4000)