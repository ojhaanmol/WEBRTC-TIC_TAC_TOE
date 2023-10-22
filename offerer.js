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


class Offerer {
    constructor(){
        this.lc = new RTCPeerConnection(configuration);
        this.dc = this.lc.createDataChannel('channel');

        this.dc.onmessage = event => console.log('incomming Message: ',event.data);
        this.dc.onopen = event => console.log('connection Open');

        this.lc.onicecandidate = event => console.log('new Ice Candidate', JSON.stringify(this.lc.localDescription, null,4));

        this.lc.createOffer()
        .then( rtcSessionDescription => this.lc.setLocalDescription( rtcSessionDescription ))
        .then( offer => console.log('offer Created:',offer) );
    }
    storeAnswer(answer){
        this.lc.setRemoteDescription(answer)
        .then( answer => console.log('offer Accepted') );
    }
    sendMessage(message='hii'){
        this.dc.send(message);
    }
}