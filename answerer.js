const configuration = {
    iceServers : [
        {urls: 'stun:stun.l.google.com:19302'},
        {
            urls: 'turn:turn.bistri.com:80',
            username: 'webrtc',
            credential: 'webrtc'
        }
    ]
};


class Answerer{
    constructor(offer){
        this.lc = new RTCPeerConnection(configuration);

        this.lc.ondatachannel  = event => {
            this.lc.dc = event.channel;
            this.lc.dc.onmessage = event => console.log('incomming Message: ',event.data);
            this.lc.dc.onopen = event => console.log('connection Open');
        }

        this.lc.onicecandidate = event => console.log('new Ice Candidate', JSON.stringify(this.lc.localDescription, null,4));

        this.lc.setRemoteDescription(offer)
        .then( answer => console.log('offer Accepted') );

        this.lc.createAnswer()
        .then( answer => this.lc.setLocalDescription( answer ) )
        .then( answer => console.log('answer Created:',answer) );
    }
    sendMessage(message='hii'){
        this.lc.dc.send(message);
    }
}