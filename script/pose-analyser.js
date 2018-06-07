var imageScaleFactor = 0.5;
var outputStride = 16;
var flipHorizontal = false;

var imageElement = document.getElementById('cat');

posenet.load().then(function(net){
  return net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride)
}).then(function(pose){
  analyse(pose["keypoints"]);
})


function analyse(imageData){
  var relativeRight = false;
  var relativeLeft = false;
  const rightHand = parseFloat(imageData[8]["position"]["y"]);
  const leftHand = parseFloat(imageData[7]["position"]["y"]);
  const comparator = (parseFloat(imageData[5]["position"]["y"]) + parseFloat(imageData[6]["position"]["y"]))/2;
  if (rightHand < comparator) {
    relativeRight = true;
  }
  if (leftHand < comparator) {
    relativeLeft = true;
  }
  console.log(`Current Value\nLeft Hand Raised: ${relativeLeft}\nRight Hand Raised: ${relativeRight}`);
  console.log(imageData);
}
