'use strict';
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
  // Переменные для облака
  var CLOUD_INITIAL_X = 100;
  var CLOUD_INITIAL_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_COLOUR = 'rgba(255, 255, 255, 1.0)';
  // Переменные для тени
  var CLOUD_SHADOW_OFFSET_X = 10;
  var CLOUD_SHADOW_OFFSET_Y = 10;
  var CLOUD_SHADOW_COLOUR = 'rgba(0, 0, 0, 0.7)';
  // Переменные текста облака
  var CLOUD_TEXT = 'Ура вы победили!\nСписок результатов:';
  var CLOUD_TEXT_SEPARATOR = '\n';
  var CLOUD_TEXT_COLOUR = '#000';
  var CLOUD_TEXT_STYLE = '16px PT Mono';
  var CLOUD_TEXT_INITIAL_X = 120;
  var CLOUD_TEXT_INITIAL_Y = 40;
  var CLOUD_TEXT_HEIGHT_IN_PX = 20;
  // Переменные для гистораммы
  var HISTOGRAM_HEIGHT = 150;
  var HISTOGRAM_COLUMN_WIDTH = 40;
  var HISTOGRAM_COLUMN_SPACE = 50;
  var HISTOGRAM_INITIAL_X = 120;
  var HISTOGRAM_INITIAL_Y = 100;
  var HISTOGRAM_MY_COLUMN_NAME = 'Вы';
  var HISTOGRAM_MY_COLUMN_COLOUR = 'rgba(255, 0, 0, 1.0)';
  var HISTOGRAM_TEXT_UP_OFFSET = 10;
  /**
   * Функция рисования окна статистики
   * @param {number} x - координата Х
   * @param {number} y - координата У
   * @param {number} width - ширина
   * @param {number} height - высота
   * @param {string} colour - цвет с прозрачностью
   * @param {object} canvas - канвас на котором рисуется игра
   */
  var drawStatCloud = function (x, y, width, height, colour, canvas) {
    canvas.fillStyle = colour;
    canvas.fillRect(x, y, width, height);
  };
  /**
   * Функция написания текста построчно на облаке
   * @param {string} text - текст с разделителем
   * @param {number} x - координата Х где начинаем писать
   * @param {number} y - координата Y где начинаем писать
   * @param {string} colour - цвет текста
   * @param {string} font - шрифт текста
   * @param {object} canvas - канвас на котором рисуется игра
   */
  var writeOnStatCloud = function (text, x, y, colour, font, canvas) {
    canvas.fillStyle = colour;
    canvas.font = font;
    text.split(CLOUD_TEXT_SEPARATOR).forEach(function (textLine, index) {
      canvas.fillText(textLine, x, y + CLOUD_TEXT_HEIGHT_IN_PX * index);
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
   * @param {object} canvas - канвас на котором рисуется игра
   */
  var drawStatColumnWithText = function (namesArr, timesArr, xStartDraw, yStartDraw, step, columnWidth, columnSpace, canvas) {
    var x;
    var y;
    var height;
    var width;
    var randomDigitFrom1to02;
    var histogramColumnColour;
    for (var i = 0; i < timesArr.length; i++) {
      x = xStartDraw + (columnWidth + columnSpace) * i;
      y = yStartDraw - timesArr[i] * step;
      height = timesArr[i] * step;
      width = columnWidth;
      randomDigitFrom1to02 = (Math.random() * (1 - 0.2) + 0.2);
      histogramColumnColour = 'rgba(0, 0, 255, ' + randomDigitFrom1to02 + ')';
      canvas.fillStyle = (namesArr[i] === HISTOGRAM_MY_COLUMN_NAME) ? HISTOGRAM_MY_COLUMN_COLOUR : histogramColumnColour;
      canvas.fillRect(x, y, width, height);
      canvas.fillStyle = CLOUD_TEXT_COLOUR;
      canvas.font = CLOUD_TEXT_STYLE;
      canvas.fillText(namesArr[i], x, yStartDraw + CLOUD_TEXT_HEIGHT_IN_PX);
      canvas.fillText(Math.round(timesArr[i]), x, y - HISTOGRAM_TEXT_UP_OFFSET);
    }
  };
  // Рисуем тень
  drawStatCloud(CLOUD_INITIAL_X + CLOUD_SHADOW_OFFSET_X, CLOUD_INITIAL_Y + CLOUD_SHADOW_OFFSET_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SHADOW_COLOUR, ctx);
  // Рисуем облако
  drawStatCloud(CLOUD_INITIAL_X, CLOUD_INITIAL_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOUR, ctx);
  // Пишем текст на облаке
  writeOnStatCloud(CLOUD_TEXT, CLOUD_TEXT_INITIAL_X, CLOUD_TEXT_INITIAL_Y, CLOUD_TEXT_COLOUR, CLOUD_TEXT_STYLE, ctx);
  // Ищем максимальное время для масштабирования
  var maxOfTimes = Math.max.apply(null, times);
  // Вычислем пропорцию для гисторгамм
  var histogramStep = HISTOGRAM_HEIGHT / maxOfTimes;
  // Рисуем гистограмму с подписями
  drawStatColumnWithText(names, times, HISTOGRAM_INITIAL_X, HISTOGRAM_INITIAL_Y + HISTOGRAM_HEIGHT, histogramStep, HISTOGRAM_COLUMN_WIDTH, HISTOGRAM_COLUMN_SPACE, ctx);
};


