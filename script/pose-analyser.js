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
  const rightHandX = parseFloat(imageData[8]["position"]["x"]);
  const leftHandX = parseFloat(imageData[7]["position"]["x"]);
  const comparatorX = (parseFloat(imageData[5]["position"]["x"]) + parseFloat(imageData[6]["position"]["x"]))/2;
  const rightHandY = parseFloat(imageData[8]["position"]["y"]);
  const leftHandY = parseFloat(imageData[7]["position"]["y"]);
  const comparatorY = (parseFloat(imageData[5]["position"]["y"]) + parseFloat(imageData[6]["position"]["y"]))/2;
  if (rightHandY < comparatorY) {
    relativeRight = true;
  }
  if (leftHandY < comparatorY) {
    relativeLeft = true;
  }
  console.log(`Current Value\nLeft Hand Raised: ${relativeLeft}\nRight Hand Raised: ${relativeRight}`);
  console.log(imageData);
  angleOf(rightHandX, rightHandY, leftHandX, leftHandY, comparatorX, comparatorY);
}
function angleOf(x1, y1, x2, y2, x3, y3){
//x1 and y1 are for right hand
//x2 and y2 are for left Hand
//x3 and y3 are for comparator
  var dx1 = Math.abs(x1 - x3);
  var dx2 = Math.abs(x2 - x3);
  var dy1 = Math.abs(y1 - y3);
  var dy2 = Math.abs(y2 - y3);
  console.log(`First Vector is: ${dx1}i and ${dy1}j and mod is ${computeMod(dx1, dy1)}\nSecond Vector is: ${dx2}i and ${dy2}j and mod is ${computeMod(dx2, dy2)}`);
  var dotProduct = (dx1*dx2) + (dy1*dy2);
  var cosOfAngle = dotProduct / ((computeMod(dx1, dy1))*(computeMod(dx2, dy2)))
  console.log(`Cosine of the angle is: ${cosOfAngle}`);
  var angle = Math.acos(cosOfAngle) * 180 / Math.PI
  console.log(`Angle between the hands is: ${angle}`);
}
function computeMod(num1, num2){
  return Math.sqrt((num1*num1)+(num2*num2))
}
