import io from 'socket.io-client';
import API from 'constants/urls';
const socket = io.connect(API.SOCKET_URL);

export default socket;
