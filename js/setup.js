'use strict';
// Ищем разные места
var setupPopup = document.querySelector('.setup');
var setupSimilarFooter = document.querySelector('.setup-similar');
var similarListElement = setupPopup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
// Данные для генерации магов
var WIZARD_FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
// Сколько генерируем магов
var wizardsQuantity = 4;
// Просто создадим массив магов
var wizards = [];
/**
 * Функция, которая скрывает или показывает окно, удаляя или добавляя
 * класс 'hidden'
 * @param {object} popupWindow - окно для манипуляций
 * @param {boolean} visibilityStatus - видно или нет
 */
var showOrHidePopup = function (popupWindow, visibilityStatus) {
  if (visibilityStatus) {
    popupWindow.classList.remove('hidden');
  } else {
    popupWindow.classList.add('hidden');
  }
};
/**
 * Функция выбора случайных элеменов массива
 * @param {array} arr - массив, их которого надо выбрать случайный элемент
 * @return {string} - случайный элемен их массива
 */
var chooseRandomArrElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
/**
 * Функции генерации массива объектов магов
 * @param {array} wizardsArr - массив, куда записывать магов;)
 * @return {array} - Массив объеквток
 */
var generateWizards = function (wizardsArr) {
  for (var i = 0; i < wizardsQuantity; i++) {
    var randomFirstName = chooseRandomArrElement(WIZARD_FIRST_NAME);
    var randomSecondName = chooseRandomArrElement(WIZARD_SECOND_NAME);
    var randomCoatColor = chooseRandomArrElement(WIZARD_COAT_COLOR);
    var randomEyesColor = chooseRandomArrElement(WIZARD_EYE_COLOR);
    wizardsArr[i] = {
      name: randomFirstName + ' ' + randomSecondName,
      coatColor: randomCoatColor,
      eyesColor: randomEyesColor
    };
  }
  return wizardsArr;
};
/**
 * Функцию создания DOM-элемента на основе JS-объекта
 * @param {object} wizard - маг, одна штука, объект
 * @return {Node} - возвращаем готовую ноду для этого одного мага
 */
var renderWizard = function (wizard) {
  var wizardDom = similarWizardTemplate.cloneNode(true);
  wizardDom.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardDom.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardDom.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardDom;
};
/**
 * Функцию заполнения блока DOM-элементами на основе массива JS-объектов
 * @param {object} domBlock - блок, куда закидываем все
 * @param {array} objectArray - массив объектов, на основе которого заполняем блок
 */
var fillDomBlock = function (domBlock, objectArray) {
  for (var m = 0; m < objectArray.length; m++) {
    domBlock.appendChild(renderWizard(wizards[m]));
  }
};
// Генерируем магов;
generateWizards(wizards);
// Создаем фрагмента, в котором временно рисуем
var fragment = document.createDocumentFragment();
// Отрисовываем во фрагменте
fillDomBlock(fragment, wizards);
// Прикрепляем временный фрагмент к нашей реальности
similarListElement.appendChild(fragment);
// Показываем окно настроек
showOrHidePopup(setupPopup, true);
// Показываем футер подобных магов
showOrHidePopup(setupSimilarFooter, true);
