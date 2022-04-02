song1_lg = "";
song2_in = "";

function preload() {
    song1_lg = loadSound("LetGo_lg.mp3");
    song2_in = loadSound("Infinity_in.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

left_wristX = 0;
left_wristY = 0;
right_wristX = 0;
right_wristY = 0;

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;

        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;

        console.log(" Left wrist X = " + left_wristX + " Left wrist Y = " + left_wristY);
        console.log(" Right wrist X = " + right_wristX + " Right wrist Y = " + right_wristY);


    }
}


function draw() {
    image(video ,0 ,0 ,600 ,500);
}

