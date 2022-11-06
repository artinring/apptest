const video = document.getElementById("js-video")

navigator.mediaDevices
    .getUserMedia({
        audio: false,
        video: true,
    })
    .then(function(stream){
        video.srcObject = stream
        video.onloadedmetadata = function(e) {
            video.play()
        }
    })
    .catch(function(err) {
        alert('Error')
    })