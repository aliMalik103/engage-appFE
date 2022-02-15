/* eslint-disable prettier/prettier */
import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';
import { ADD_REMOTE_STREAM, ADD_STREAM, MY_STREAM } from './types';

export const API_URI = 'http://192.168.18.165:8000';

export const socket = IO(`${API_URI}`, {
    forceNew: true
})
socket.on('connection', () => console.log('connected client'))

const peerServer = new Peer("123456789", {
    secure: false,
    port: 8000,
    host: "192.168.18.165",
    path: "/peerjs",

});

peerServer.on('error', console.log);
peerServer.on('connection', function(conn) {
    conn.on('data', function(data) {
        // Will print 'hi!'
        console.log(data);
    });
});


export const joinRoom = (stream) => async(dispatch) => {
    const roomID = "asdfjkllkkllklkhrbmrnbgjrm89";
    dispatch({ type: MY_STREAM, payload: stream });
    try {
        peerServer.on('open', (userId) => {
            alert("JJJJ" + userId)
            socket.emit('join-room', { userId, roomID });

        })
    } catch (e) { alert(e) }
    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream, dispatch);

    })

    peerServer.on('call', (call) => {

        call.answer(stream);
        call.on('stream', (stream) => {

            dispatch({ type: ADD_STREAM, payload: stream });
        })

    })


}

function connectToNewUser(userId, stream, dispatch) {


    const call = peerServer.call(userId, stream);
    call.on('stream', (remoteVideoStream) => {
        if (remoteVideoStream) {
            dispatch({ type: ADD_REMOTE_STREAM, payload: remoteVideoStream })
        }

    })

}