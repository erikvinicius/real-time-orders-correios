const { rastro } = require('rastrojs');
const NotifySend = require('node-notifier').NotifySend;

var notifier = new NotifySend();

async function initialize() {
    let track;
    track = await rastro.track('LB197281105HK');
    let lastTracksCount = track[0].tracks.length;
    console.log('last track:',  track[0].tracks[lastTracksCount - 1]);
    console.log('total tracks:' + lastTracksCount + '\n');

    console.log('waiting new update...');
    setInterval(async () => {
        console.log('checking for new updates... \n')
        track = await rastro.track('LB197281105HK');
        if(track[0].tracks.length > lastTracksCount){
            console.log('new update found.')
            const lastTrack = track[0].tracks[track[0].tracks.length - 1];
            console.log('new track',  lastTrack);
            console.log('total tracks:' + track[0].tracks.length + '\n');
            
            notifier.notify({
                title: 'Order Update',
                message: `New update in your track\nStatus:${lastTrack.status}`
            });
            
            lastTracksCount = track[0].tracks.length; 
            
            return;
        }
        console.log('not found updates.\n')   
    }, 300000); //5 minutes 
};

initialize();