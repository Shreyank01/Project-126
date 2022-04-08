
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

function modelLoaded() {
    console.log("poseNet is initialized");
}


left_wristX = 0;
left_wristY = 0;
right_wristX = 0;
right_wristY = 0;
song1_lg = "";
song2_in = "";
live_song_name = "";
score_leftWrist = "";


function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;

        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;

        console.log(" Left wrist X = " + left_wristX + " Left wrist Y = " + left_wristY);
        console.log(" Right wrist X = " + right_wristX + " Right wrist Y = " + right_wristY);

        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log( "Score of left wrist is " + score_leftWrist);
    }
}




function draw() {
    image(video ,0 ,0 ,600 ,500);
    stroke("red");
    fill("red");

}

function draw(){
    image(video,0,0,600,530);

    fill("red");
    stroke("red");

    live_song_name = song1_lg.isPlaying();
    console.log(live_song_name);

    if(score_leftWrist > 0.2){
        circle(left_wristX,left_wristY,20);
        song2_in.stop();
        if(live_song_name == false){
            song1_lg.play();
        }
    }
}

