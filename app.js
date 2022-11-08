if(!navigator.mediaDevices) {
    document.querySelector('#js-unsupported').classList.add('is-show')
}

if(window.BarcodeDetector == undefined) {
    console.log('Barcorde Detector is not supported by this browser.')
    document.querySelector('#js-unsupported').classList.add('is-show')
}

const video = document.getElementById("js-video")

const checkImage = () => {
    const barcodeDetector = new BarcodeDetector()
    barcodeDetector
     .detect(video)
     .then((barcodes) => {
        if (barcodes.length > 0) {
            for (let barcode of barcoodes) {
                openModal(barcode.rawValue)
            }
        } else {
            setTimeout(() => {
                checkImage()
            }, 200)
        }
     })
     .catch((e) => {
        console.error('Barcodde Detection failed.')
     })
}

navigator.mediaDevices
    .getUserMedia({
        audio: false,
        video: true,
    })
    .then(function(stream){
        video.srcObject = stream
        video.onloadedmetadata = function(e) {
            video.play()
            checkImage()
        }
    })
    .catch(function(err) {
        alert('Error')
    })
