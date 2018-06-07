var imageScaleFactor = 0.5;
var outputStride = 16;
var flipHorizontal = false;

var imageElement = document.getElementById('cat');

posenet.load().then(function(net){
  return net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride)
}).then(function(pose){
const rightHand = pose["keypoints"][8];
const leftHand = pose["keypoints"][7];
const comparator = (parseFloat(pose["keypoints"][5]["position"]["y"]) + parseFloat(pose["keypoints"][6]["position"]["y"]))/2;
//console.log(rightHand);
console.log(pose);
console.log(comparator);
})
