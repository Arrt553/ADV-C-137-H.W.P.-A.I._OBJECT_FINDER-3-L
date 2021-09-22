objects = [];
var status = "";
function setup(){
    canvas = createCanvas(300,300);
    canvas.center()

    video = createCapture(VIDEO);
    video.hide();
    video.size(300,300);
}
function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object(s)";
    text_in_input = document.getElementById("input").value;
}
function modelLoaded(){
    console.log("Model is Loaded!");
    status = true;
}
function draw(){
    image(video,0,0,380,380);

    if(status != ""){
        objectDetector.detect(video,gotResults);

        for(i = 0; i < objects.length; i++){
            
            document.getElementById("num_of_objects_detected").innerHTML = "Number of object(s) detected are : " + objects.length;

            fill("#f01120");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#f01120");

            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);    
            if(objects = document.getElementById("input")){
                video.stop()
                objectDetector.detect(gotResults);
                document.getElementById("status").innerHTML = "Status : Object(s) that you have entered Detected";
                var synth = window.speechSynthesis;
                function SpeechSynthesisUtterance(){
                    var utterThis = new SpeechSynthesisUtterance("Object mentioned found");
                }
            }  
            else{
                document.getElementById("status").innerHTML = "Status : Object(s) not Detected";
            }      
        }
    }
}
function preload(){

}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

 