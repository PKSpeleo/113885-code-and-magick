'use strict';
// Переменные для облака
var cloudInitialX = 100;
var cloudInitialY = 10;
var cloudWidth = 420;
var cloudHeight = 270;
var cloudColour = 'rgba(255, 255, 255, 1.0)';
// Переменные для тени
var cloudShadowOffsetX = 10;
var cloudShadowOffsetY = 10;
var cloudShadowColour = 'rgba(0, 0, 0, 0.7)';
// Переменные текста облака
var cloudText = 'Ура вы победили!\nСписок результатов:';
var cloudTextSepator = '\n';
var cloudTextColour = '#000';
var cloudTextStyle = '16px PT Mono';
var cloudTextInitialX = 120;
var cloudTextInitialY = 40;
var cloudTextHeightInPX = 20;
// Переменные для гистораммы
var histogramHeight = 150;
var histogramColumnWidth = 40;
var histogramColumnSpace = 50;
var histogramInitialX = 120;
var histogramInitialY = 100;
var histogramMyColumnName = 'Вы';
var histogramMyColumnColour = 'rgba(255, 0, 0, 1.0)';
var histogramTetxUpOffset = 10;
/**
 * Функция рисования окна статистики
 * @param {number} x - координата Х
 * @param {number} y - координата У
 * @param {number} width - ширина
 * @param {number} height - высота
 * @param {string} colour - цвет с прозрачностью
 * @param {object} ctx - канвас на котором рисуется игра
 */
var drawStatCloud = function (x, y, width, height, colour, ctx) {
  ctx.fillStyle = colour;
  ctx.fillRect(x, y, width, height);
};
/**
 * Функция написания текста построчно на облаке
 * @param {string} text - текст с разделителем
 * @param {number} x - координата Х где начинаем писать
 * @param {number} y - координата Y где начинаем писать
 * @param {string} colour - цвет текста
 * @param {string} font - шрифт текста
 * @param {object} ctx - канвас на котором рисуется игра
 */
var writeOnStatCloud = function (text, x, y, colour, font, ctx) {
  ctx.fillStyle = colour;
  ctx.font = font;
  text.split(cloudTextSepator).forEach(function (textLine, index) {
    ctx.fillText(textLine, x, y + cloudTextHeightInPX * index);
  });
};
/**
 * Функция рисования гистограмм с текстом
 * @param {array} namesArr - массив имен
 * @param {array} timesArr - массив времен
 * @param {number} xStartDraw - координата Х откуда начинаем рисовать гистограмму
 * @param {number} yStartDraw - координата Y откуда начинаем рисовать гистограмму
 * @param {number} step -
 * @param {number} columnWidth - ширина столбца
 * @param {number} columnSpace - расстояние между столбцами
 * @param {object} ctx - канвас на котором рисуется игра
 */
var drawStatColumnWithText = function (namesArr, timesArr, xStartDraw, yStartDraw, step, columnWidth, columnSpace, ctx) {
  for (var i = 0; i < timesArr.length; i++) {
    var x = xStartDraw + (columnWidth + columnSpace) * i;
    var y = yStartDraw - timesArr[i] * step;
    var height = timesArr[i] * step;
    var width = columnWidth;
    var randomDigitFrom1to02 = (Math.random() * (1 - 0.2) + 0.2);
    var histogramColumnColour = 'rgba(0, 0, 255, ' + randomDigitFrom1to02 + ')';
    ctx.fillStyle = (namesArr[i] === histogramMyColumnName) ? histogramMyColumnColour : histogramColumnColour;
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = cloudTextColour;
    ctx.font = cloudTextStyle;
    ctx.fillText(namesArr[i], x, yStartDraw + cloudTextHeightInPX);
    ctx.fillText(Math.round(timesArr[i]), x, y - histogramTetxUpOffset);
  }
};
/**
 * Вызываться каждый раз когда игрок проходит уровень.
 * Чтобы успешно пройти уровень, надо выстрелить
 * фаерболом (клавиша Shift) в забор
 * @param {object} ctx - канвас на котором рисуется игра
 * @param {array} names - массив, с именами игроков прошедших уровень.
 * Имя самого игрока — Вы. Массив имён формируется случайным образом
 * @param {array} times - массив, по длине совпадающий с массивом names.
 * Массив содержит время прохождения уровня соответствующего игрока из массива names.
 * Время прохождения уровня задано в миллисекундах.
 */
window.renderStatistics = function (ctx, names, times) {
  // Рисуем тень
  drawStatCloud(cloudInitialX + cloudShadowOffsetX, cloudInitialY + cloudShadowOffsetY, cloudWidth, cloudHeight, cloudShadowColour, ctx);
  // Рисуем облако
  drawStatCloud(cloudInitialX, cloudInitialY, cloudWidth, cloudHeight, cloudColour, ctx);
  // Пишем текст на облаке
  writeOnStatCloud(cloudText, cloudTextInitialX, cloudTextInitialY, cloudTextColour, cloudTextStyle, ctx);
  // Ищем максимальное время для масштабирования
  var maxOfTimes = Math.max.apply(null, times);
  // Вычислем пропорцию для гисторгамм
  var historamStep = histogramHeight / maxOfTimes;
  // Рисуем гистограмму с подписями
  drawStatColumnWithText(names, times, histogramInitialX, histogramInitialY + histogramHeight, historamStep, histogramColumnWidth, histogramColumnSpace, ctx);
};


