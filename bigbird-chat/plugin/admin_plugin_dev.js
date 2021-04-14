let registerPlugin = videojs.registerPlugin || videojs.plugin;

registerPlugin('admin-setPlayer', function () {
    let myPlayer = this;
    document.querySelector('video-js').setAttribute('id', 'livePlayer');

    myPlayer.on('loadedmetadata', function () { });

    console.log(myPlayer);
    console.log('please...Test');
});
