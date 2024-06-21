from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, emit


from New.body_weight import GetBodyWeight
from New.get_pairs import GetPairs
from New.options import GetOptions
from New.receive_data import ProcessData
from New.return_global_data import GetApi

from info import active_rooms


app = Flask(__name__)
CORS(app, origins=['http://localhost:8081'])
CORS(app, supports_credentials=True)


socketio = SocketIO(app, cors_allowed_origins="http://localhost:8081")


@app.route("/api", methods=['POST'])
def api0():

    # email = "sdimov77@gmail.com"
    email = request.get_json().get('email') 

    print(email)

    data = GetApi(email)

    return data


@app.route("/bw", methods=['POST'])
def api1():

    email = request.get_json().get('email')

    data = GetBodyWeight(email)

    return data


@app.route("/get_pairs", methods=['POST'])
def api2():

    email = "sdimov77@gmail.com"
    # email = request.get_json().get('email') 
    criteria = "Bench"
    # criteria = request.get_json().get('criteria') 

    data = GetPairs(email, criteria)

    return data


@app.route("/options")
def api3():
    data = GetOptions()

    return data


@app.route('/receive_data', methods=['POST'])
def api4():

    selected = request.get_json().get('selected') 

    data = ProcessData(selected)

    return data


@app.route('/akhil', methods=['POST'])
def api5():

    selected = request.get_json().get('newRow') 

    print(selected)

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