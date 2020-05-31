'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var MAX_BAR_HEIGHT = 150;
var topGap = GAP * 2 + FONT_GAP * 2;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText("Ура вы победили!", CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText("Список результатов:", CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);


  var maxTime = getMaxElement(times);

  var scoreGap = GAP + FONT_GAP;

  for (var i = 0; i < players.length; i++) {
    var barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;
    var barY = CLOUD_Y + topGap + scoreGap + (MAX_BAR_HEIGHT - barHeight);
    var currentX = CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i;

    ctx.fillStyle = '#000';
    ctx.fillText(
        players[i],
        currentX,
        CLOUD_Y + topGap + scoreGap + MAX_BAR_HEIGHT + GAP
    );
    ctx.fillText(
        Math.round(times[i]),
        currentX,
        barY - GAP - FONT_GAP
    );

    var randomLightness = Math.random() * 100;
    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(224, 100%, ' + randomLightness + '%)';
    ctx.fillRect(
        currentX,
        barY,
        BAR_WIDTH,
        barHeight
    );
  }
};
