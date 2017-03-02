// function randomBetween(min,max)
// {
//     return Math.floor(Math.random()*(max-min+1)+min);
// }
//
// var tl = new TimelineMax();
//
// for(var i = 1; i < 10; i++){
//
//   var t = TweenMax.to(document.getElementsByClassName("lava")[i], randomBetween(15, 30), {
//     y: randomBetween(10, 30),
//     repeat:-1,
//     repeatDelay:randomBetween(1, 3),
//     yoyo:true,
//     ease:Linear.ease,
//     // transform: "scale(" + randomBetween(.95, 1.05) + ")"
//   })
//
//   tl.add(t, (i+1)/0.6)
// }
//
// tl.seek(100);
