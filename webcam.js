$(function () {
    var video = document.getElementById('webcam');
    var capture = document.getElementById('capture');
    var canvas = document.getElementById('canvas');
    var vendorURL = window.URL || window.webkitURL;
    var photo = document.getElementById('photo');
    var pin = document.getElementById('pin');
    navigator.getmedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
    navigator.getmedia(
        {
            video: true,
            audio: false
        },
        function (stream) {
            video.src = vendorURL.createObjectURL(stream);
        },
        function (error) {
        });
    capture.addEventListener('click', function () {
        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, 400, 300);
        photo.src = canvas.toDataURL("image/png");
        console.log(pin.value);
        saveImg(photo.src, pin);
    });
});
function saveImg(dataUrl, pin) {
    // AJAX Code To Submit Form.
    //var fileName = new Date.now();
    var fileName = new Date().getTime();
    var dataString = 'dataUrl=' + dataUrl + '&fileName=' + fileName;
    $.ajax({
        type: "POST",
        url: "saveimage.php",
        data: dataString,
        cache: false,
        success: function (result) {
            var fileLoc = 'https://face-verification.azurewebsites.net/temp/' + fileName + '.png';
            console.log(fileLoc);
            detect(fileLoc);
        }
    });
}
function detect(fileLoc) {
    var params = {
        // Request parameters
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
    };
    $.ajax({
        url: "https://api.projectoxford.ai/face/v1.0/detect?" + $.param(params),
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "3ce50159bc674b818c7a47756f8f9f61");
        },
        type: "POST",
        // Request body
        data: '{"url":"' + fileLoc + '"}',
    })
        .done(function (data) {
            console.log(data);
            var text = data[0];
            var faceId1 = text.faceId;
            console.log(faceId1);
            $.ajax({
                type: "POST",
                url: "deleteall.php",
            });
            verify(faceId1);
        })
.fail(function (data) {
    alert("Your Face is Detected. Please Try Again");
    console.log(data);
});
}
function verify(faceId1) {
    var params = {
        // Request parameters
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
    };
    var fileLoc2 = 'https://face-verification.azurewebsites.net/users/' + pin.value + '.jpg';
    $.ajax({
        url: "https://api.projectoxford.ai/face/v1.0/detect?" + $.param(params),
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "3ce50159bc674b818c7a47756f8f9f61");
        },
        type: "POST",
        // Request body
        data: '{"url":"' + fileLoc2 + '"}',
    })
        .done(function (data) {
            console.log(data);
            var text = data[0];
            var faceId2 = text.faceId;
            console.log(faceId2);
            var senddata = '{"faceId1":"' + faceId1 + '","faceId2":"' + faceId2 + '"}';
            var params = {
                // Request parameters
            };
            $.ajax({
                url: "https://api.projectoxford.ai/face/v1.0/verify",
                beforeSend: function (xhrObj) {
                    // Request headers
                    xhrObj.setRequestHeader("Content-Type", "application/json");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "3ce50159bc674b818c7a47756f8f9f61");
                },
                type: "POST",
                // Request body
                data: senddata,
            })
            .done(function (data) {
                var text = data[0];
                console.log(data.isIdentical);
                if (data.isIdentical) {
                    alert("You Are Successfully Verified");
                }
                else {
                    alert("You Are not Authorised to Login with the Provided Identification Number");
                }
            })
            .fail(function (data) {
                alert("Verification Failed. Please Try Again Later");
                console.log(data);
            });
        })
.fail(function (data) {
    alert("The Provided Identification Number does Not Exist . Please Check Try Again");
    console.log(data);
});
}