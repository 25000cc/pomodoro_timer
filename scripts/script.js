(function () {
  "use strict";
  // タイマー部分の処理に使う要素を取得
  let timer = document.getElementById('timer'),
    startStopBtn = document.getElementById('start-stop-btn'),
    setCount = document.getElementById('set-count'),
    status = document.getElementById('status'),
    tomato = document.getElementById('tomato'),
    circle2 = document.getElementById('circle2'),
    btnContainerBack = document.getElementById('button-container-back'),
    setContainer = document.getElementById('set-container'),
    leftTopTitleBack = document.getElementById('left-top-title-back'),
    timerCircleCanvas = document.getElementById('timer-circle-canvas'),
    btnText = document.getElementById('btn-text'),
    backCrossY = document.getElementById('back-cross-y'),
    hideLine = document.getElementById('hide-line');

  let startTime,
    timer25, // 25分タイマー
    timer5, // 5分タイマー
    setCountIndex = 0, // 現在何セット目かをカウント
    isRunning = false,
    witchTimer = 0,
    isItSet = false,
    timerCircleCtx = timerCircleCanvas.getContext('2d');

  startStopBtn.onclick = () => { // ボタンを押した際の処理(一つのボタンでスタートとストップを切り替える)
    if (isRunning === false) { // スタートを押したときの処理
      if (setCountIndex === 0) {
        isItSet = false;
        startTimer25();
      } else {
        setCountIndex++;
        isItSet = true;
        startTimer25();
      }
      isRunning = true;
      startStopBtn.innerHTML = "&#xf04d;"; // 四角ボタンに形を変える
      btnText.innerHTML = "STOP<span style=\"margin-left:30px;\"></span>BUTTON";
      startTime = Date.now();
    } else { // ストップを押したときの処理
      stopAllTimer();
    }
  }

  /**
   * 25分タイマーを開始、ステータスをWorking timeに更新、トマト画像を赤に差し替え、セットカウント更新、緑の部分を全て赤に変更
   */
  function startTimer25() {
    timer25 = setInterval(timeCalculation, 20, 1500000, 'timer25');
    if (isItSet === true) {
      setCountIndex--;
      if (setCountIndex === 0) {
        stopAllTimer();
        status.innerHTML = "Good Job";
        return;
      }
    } else {
      setCountIndex++;
    }
    setCount.innerHTML = ('0' + setCountIndex).slice(-2);
    status.innerHTML = "Working time";
    tomato.src = "images/tomato.png";
    tomato.alt = "赤トマト";
    ColorChange("#FF3733", "#FF6360");
  }

  /**
   * 5分タイマーを開始、ステータスをBreak timeに更新、トマト画像を緑に差し替え、赤の部分を全て緑に変更
   */
  function startTimer5() {
    timer5 = setInterval(timeCalculation, 20, 300000, 'timer5');
    status.innerHTML = "Break time";
    tomato.src = "images/green-tomato.png";
    tomato.alt = "緑トマト";
    ColorChange("#5DFF44", "#87FF74");
  }

  /**
   * 25分タイマーを停止、5分タイマーを開始、アラームを鳴らす
   */
  function stopTimer25() {
    clearInterval(timer25);
    startTimer5();
    playSound();
  }

  /**
   * 5分タイマーを停止、25分タイマーを開始、アラームを鳴らす
   */
  function stopTimer5() {
    clearInterval(timer5);
    startTimer25();
    playSound();
  }

  /**
   * 全てのタイマーを停止、ボタン、タイマー、画像、セットカウント、全て初期化
   */
  function stopAllTimer() {
    clearInterval(timer25);
    clearInterval(timer5);
    isRunning = false;
    startStopBtn.innerHTML = "&#xf04b;";
    btnText.innerHTML = "START BUTTON";
    timer.innerText = '25:00.000';
    setCountIndex = 0;
    witchTimer = 0;
    setCount.innerHTML = '00';
    status.innerHTML = "Let's start";
    tomato.src = "images/tomato.png";
    tomato.alt = "赤トマト";
    ColorChange("#FF3733", "#FF6360");
    timerCircleCtx.clearRect(0, 0, timerCircleCanvas.width, timerCircleCanvas.height);
  }

  /**
   * 残り時間を計算する
   * @param {num} timeToCountDown 設定時間
   * @param {string} timerID 円の色を決めるためのタイマーID
   */
  function timeCalculation(timeToCountDown, timerID) {
    let leftTime = timeToCountDown - (Date.now() - startTime);
    if (leftTime <= 0) { // 残り時間が0になったときの処理
      startTime = Date.now(); // スタートタイムの更新
      if (witchTimer % 2 === 0) { // どちらのタイマーを止めるか分岐
        stopTimer25();
      } else {
        stopTimer5();
      }
      witchTimer++;
      return;
    } else {
      updateParagraph(leftTime);
      updateCircle(leftTime, timeToCountDown, timerID);
    }
  }

  /**
   * 残り時間の表示を更新する
   * @param {num} leftTime 残り時間
   */
  function updateParagraph(leftTime) {
    leftTime = leftTime / 1000;
    let min = ('0' + Math.floor(leftTime / 60)).slice(-2);
    let sec = ('0' + Math.floor(leftTime % 60)).slice(-2);
    let ms = ('00' + String(leftTime * 1000)).slice(-3);
    timer.innerHTML = min + ':' + sec + '.' + ms;
  }

  /**
   * 残り時間を表す円の表示を更新する
   * @param {num} leftTime 残り時間
   * @param {num} timeToCountDown 設定時間
   * @param {string} timerID 円の色を決めるためのタイマーID
   */
  function updateCircle(leftTime, timeToCountDown, timerID) {
    timerCircleCanvas.setAttribute('width', circle2.clientWidth + 30);
    timerCircleCanvas.setAttribute('height', circle2.clientHeight + 30);
    timerCircleCtx.beginPath();
    let endAngle;
    if (timerID === 'timer25') {
      timerCircleCtx.strokeStyle = "#FF3733";
    } else {
      timerCircleCtx.strokeStyle = "#5DFF44";
    }
    endAngle = (360 - (360 * leftTime / timeToCountDown)) * Math.PI / 180;
    timerCircleCtx.lineWidth = 15;
    let x = circle2.clientWidth / 2 + 15;
    let y = circle2.clientHeight / 2 + 15;
    let radius = circle2.clientHeight / 2 + 7.5;
    timerCircleCtx.translate(x, y);
    timerCircleCtx.rotate(-90 * Math.PI / 180);
    timerCircleCtx.translate(-x, -y);
    timerCircleCtx.arc(x, y, radius, 0, endAngle, false);
    timerCircleCtx.stroke();
  }

  // アラームを鳴らす処理に使う要素を取得
  const radio1 = document.getElementById('radio1'),
    radio2 = document.getElementById('radio2'),
    radio3 = document.getElementById('radio3'),
    radio4 = document.getElementById('radio4'),
    volumeRange = document.getElementById('volume-range');

  /**
   * アラームを再生
   */
  function playSound() {
    let audioElement = new Audio();
    if (radio1.checked) {
      audioElement.src = "audio/alarm1.mp3";
    } else if (radio2.checked) {
      audioElement.src = "audio/alarm2.mp3";
    } else if (radio3.checked) {
      audioElement.src = "audio/alarm3.mp3";
    } else if (radio4.checked) {
      audioElement.src = "audio/alarm4.mp3";
    } else {
      audioElement.src = "audio/alarm5.mp3";
    }
    audioElement.volume = volumeRange.value / 100;
    audioElement.play();
  }

  /**
   * 色を変更
   * @param {string} color1 濃い方の色（lines以外）
   * @param {string} color2 薄い方の色（lines）
   */
  function ColorChange(color1, color2) {
    btnContainerBack.style.backgroundColor = color1;
    setContainer.style.backgroundColor = color1;
    leftTopTitleBack.style.backgroundColor = color1;
    hideLine.style.backgroundColor = color1;
    for (let i = 1; i < 12; i++) {  // line の色を変更
      let line = document.getElementById(`line${i}`);
      line.style.backgroundColor = color2;
    }
    backCrossY.style.backgroundColor = color2;
    for (let i = 1; i < 9; i++) {  // cross の色を変更
      let cross = document.getElementById(`cross${i}`);
      if (color1 === "#FF3733") {  // 赤にする
        cross.classList.remove(`cross-g${i}`);
        cross.classList.add(`cross${i}`);
      } else {  // 緑にする
        cross.classList.add(`cross-g${i}`);
        cross.classList.remove(`cross${i}`);
      }
    }
  }


  // メニューコンテンツに関する要素を取得
  let title = document.getElementById('title'),
    about = document.getElementById('about'),
    howToUse = document.getElementById('how-to-use'),
    setCountMenu = document.getElementById('set-count-menu'),
    alarm = document.getElementById('alarm'),
    darkTheme = document.getElementById('dark-theme'),
    bgWhite = document.getElementById('bg-white'),
    statusSubText = document.getElementById('status-sub-text'),
    leftLine = document.getElementById('left-line'),
    myNum = document.getElementById('my-num'),
    menuStatus = document.getElementById('menu-status'),
    inputSetText = document.getElementById('input-set-text'),
    inputSetDecision = document.getElementById('input-set-decision'),
    setError = document.getElementById('set-error'),
    setCountH1 = document.getElementById('set-count-h1'),
    aboutContainer = document.getElementById('about-container'),
    howToUseContainer = document.getElementById('how-to-use-container'),
    setCountContainer = document.getElementById('set-count-container'),
    alarmContainer = document.getElementById('alarm-container'),
    previewBtn = document.getElementById('preview-button'),
    closeMenuBtn = document.getElementById('close-menu-btn'),
    msAbout = document.getElementById('ms-about'),
    msHowToUse = document.getElementById('ms-how-to-use'),
    msSetCount = document.getElementById('ms-set-count'),
    msAlarm = document.getElementById('ms-alarm');

  // メニューコンテンツを非表示、タイマーに戻る
  title.onclick = () => {
    if (tomato.className === 'hide-contents') {
      closeMenuContents();
    }
  }

  // ポモドーロとはを表示
  about.onclick = () => {
    if (aboutContainer.className === 'about-container hide-contents') {
      openMenuContents("about");
    }
  }

  // 使い方を表示
  howToUse.onclick = () => {
    if (howToUseContainer.className === 'how-to-use-container hide-contents') {
      openMenuContents("how to use");
    }
  }

  // セット数を表示
  setCountMenu.onclick = () => {
    if (setCountContainer.className === 'set-count-container hide-contents') {
      openMenuContents("set count");
    }
  }

  // 決定ボタンを押したらセット数を反映
  inputSetDecision.onclick = setConfig;

  // セット数のtext欄でエンターキーを押したらセット数を反映
  inputSetText.onkeypress = (e) => {
    if (e.keyCode === 13) {
      setConfig();
    } else {
      return;
    }
  }

  /**
  * 入力されたセット数を反映
  */
  function setConfig() {
    switch (inputSetText.value) {
      case "":
        setError.innerHTML = "入力されていません";
        break;
      case "0":
        setError.innerHTML = "0以外の数字を入力してください";
        break;
      case "00":
        setError.innerHTML = "0以外の数字を入力してください";
        break;
      default:
        if (inputSetText.value.match(/[^0-9]+/)) {
          setError.innerHTML = "数字を入力してください";
        } else if (inputSetText.value.length > 2) {
          setError.innerHTML = "2桁以下の数字を入力してください";
        } else {
          stopAllTimer();
          setCountIndex = inputSetText.value;
          setCount.innerHTML = ('00' + setCountIndex).slice(-2);
          closeMenuContents();
          setError.innerHTML = "";
          setTimeout(() => {
            inputSetText.value = "";
          }, 300);
        }
    }
  }

  // アラームの設定を表示
  alarm.onclick = () => {
    if (alarmContainer.className === 'alarm-container hide-contents') {
      openMenuContents("alarm");
    }
  }

  // プレビューボタンでアラームを再生
  previewBtn.onclick = playSound;

  /**
   * メニューコンテンツを非表示
   */
  function closeMenuContents() {
    rotateCross();
    slideInLines();
    hideOutTomato();
    hideMenuStatus();
    hideOutStatus();
    hideAbout();
    hideHowToUse();
    hideSetCount();
    hideAlarm();
  }

  /**
   * メニューコンテンツを表示
   * @param {string} menu メニューコンテンツの名前
   */
  function openMenuContents(menu) {
    rotateCross();
    slideOutLines();
    hideTomato();
    hideStatus();
    hideOutMenuStatus(menu);
    switch(menu) {
      case "about":
        hideOutAbout();
        hideHowToUse();
        hideSetCount();
        hideAlarm();
        break;
      case "how to use":
        hideOutHowToUse();
        hideAbout();
        hideSetCount();
        hideAlarm();
        break;
      case "set count":
        hideOutSetCount();
        hideAbout();
        hideHowToUse();
        hideAlarm();
        break;
      case "alarm":
        hideOutAlarm();
        hideAbout();
        hideHowToUse();
        hideSetCount();
        break;
    }
  }

  /**
   * menu-status の文字を変更、スライドイン
   * @param {string} menu メニューコンテンツの名前
   */
  function hideOutMenuStatus(menu) {
    menuStatus.classList.remove('hide-menu-status');
    switch(menu) {
      case "about":
        hideOutMsAbout();
        hideMsHowToUse();
        hideMsSetCount();
        hideMsAlarm();
        break;
      case "how to use":
        hideOutMsHowToUse();
        hideMsAbout();
        hideMsSetCount();
        hideMsAlarm();
        break;
      case "set count":
        hideOutMsSetCount();
        hideMsAbout();
        hideMsHowToUse();
        hideMsAlarm();
        break;
      case "alarm":
        hideOutMsAlarm();
        hideMsAbout();
        hideMsHowToUse();
        hideMsSetCount();
        break;
    }
  }

  function hideTomato() {
    tomato.classList.add('hide-contents');
    timer.classList.add('hide-contents');
  }

  function hideOutTomato() {
    tomato.classList.remove('hide-contents');
    timer.classList.remove('hide-contents');
  }

  function hideMenuStatus() {
    menuStatus.classList.add('hide-menu-status');
  }

  function hideStatus() { status.classList.add('slide-out-status'); }
  function hideOutStatus() { status.classList.remove('slide-out-status'); }
  function hideAbout() { aboutContainer.classList.add('hide-contents'); }
  function hideOutAbout() { aboutContainer.classList.remove('hide-contents'); }
  function hideHowToUse() { howToUseContainer.classList.add('hide-contents'); };
  function hideOutHowToUse() { howToUseContainer.classList.remove('hide-contents'); };
  function hideSetCount() { setCountContainer.classList.add('hide-contents'); }
  function hideOutSetCount() { setCountContainer.classList.remove('hide-contents'); }
  function hideAlarm() { alarmContainer.classList.add('hide-contents'); }
  function hideOutAlarm() { alarmContainer.classList.remove('hide-contents'); }
  function hideMsAbout() { msAbout.classList.add('hide-contents'); }
  function hideOutMsAbout() { msAbout.classList.remove('hide-contents'); }
  function hideMsHowToUse() { msHowToUse.classList.add('hide-contents'); }
  function hideOutMsHowToUse() { msHowToUse.classList.remove('hide-contents'); }
  function hideMsSetCount() { msSetCount.classList.add('hide-contents'); }
  function hideOutMsSetCount() { msSetCount.classList.remove('hide-contents'); }
  function hideMsAlarm() { msAlarm.classList.add('hide-contents'); }
  function hideOutMsAlarm() { msAlarm.classList.remove('hide-contents'); }

  /**
  * 前面の線がメニューコンテンツに被るのでどかせる
  */
  function slideOutLines() {
    line3.classList.add('slide-in-3');
    line5.classList.add('slide-in-5');
    line7.classList.add('slide-in-7');
  }

  /**
  * 線を元に戻す
  */
  function slideInLines() {
    line3.classList.remove('slide-in-3');
    line5.classList.remove('slide-in-5');
    line7.classList.remove('slide-in-7');
  }

  /**
   * cross を一定方向に回転
   */
  function rotateCross(menuIs) {
    new Promise((resolve, reject) => {  // duration を5s に変更し、回転させる
      for (let i = 1; i < 9; i++) {
        let cross = document.getElementById(`cross${i}`);        
        cross.classList.add('d-5');
        cross.classList.add("rotate");
      }
      setTimeout(() => {
        resolve();
      }, 500);
    }).then(() => {  // duration を0 にしてアニメーションしないようにする
      return new Promise((resolve, reject) => {
        for (let i = 1; i < 9; i++) {
          let cross = document.getElementById(`cross${i}`);
          cross.classList.remove("d-5");
        }
        cross1.classList.remove("d-5");
        setTimeout(() => {
          resolve();
        }, 50);
      });
    }).then(() => {  // rotate クラスを削除
      return new Promise((resolve, reject) => {
        for (let i = 1; i < 9; i++) {
          let cross = document.getElementById(`cross${i}`);
          cross.classList.remove("rotate");
        }
        setTimeout(() => {
          resolve();
        }, 50);
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  darkTheme.onclick = () => {
    if (darkTheme.innerHTML === "dark theme") {  // ダークテーマに変更
      darkTheme.innerHTML = "light theme";
      bgWhite.style.backgroundColor = "#191919";
      circle3.style.backgroundColor = "#191919";
      status.style.color = "white";
      statusSubText.style.color = "white";
      msAbout.style.color = "white";
      msHowToUse.style.color = "white";
      msSetCount.style.color = "white";
      msAlarm.style.color = "white";
      circle1.style.borderColor = "white";
      circle2.style.borderColor = "#A7A7A7";
      about.classList.add('about-dark');
      howToUse.classList.add('how-to-use-dark');
      setCountMenu.classList.add('set-count-menu-dark');
      alarm.classList.add('alarm-dark');
      darkTheme.classList.add('light-theme');
      leftLine.style.backgroundColor = "white";
      myNum.style.color = "white";
      setCount.style.color = "white";
      for (let i = 1; i < 12; i++) {
        let line = document.getElementById(`line${i}`);
        line.style.opacity = 0.4;
      }
      backCrossY.style.opacity = 0.4;
      aboutContainer.style.color = "white";
      howToUseContainer.style.color = "white";
      setCountH1.style.color = "white";
      alarmContainer.style.color = "white";
      for (let i = 1; i < 6; i++) {
        let radio = document.getElementById(`radio${i}`);
        radio.classList.remove('alarm-radio');
        radio.classList.add('alarm-radio-d');
      }
    } else {  // ライトテーマに変更
      darkTheme.innerHTML = "dark theme";
      bgWhite.style.backgroundColor = "#F5F5F5";
      circle3.style.backgroundColor = "#F5F5F5";
      status.style.color = "black";
      statusSubText.style.color = "black";
      msAbout.style.color = "black";
      msHowToUse.style.color = "black";
      msSetCount.style.color = "black";
      msAlarm.style.color = "black";
      circle1.style.borderColor = "black";
      circle2.style.borderColor = "white";
      about.classList.remove('about-dark');
      howToUse.classList.remove('how-to-use-dark');
      setCountMenu.classList.remove('set-count-menu-dark');
      alarm.classList.remove('alarm-dark');
      darkTheme.classList.remove('light-theme');
      leftLine.style.backgroundColor = "black";
      myNum.style.color = "black";
      setCount.style.color = "black";
      for (let i = 1; i < 12; i++) {
        let line = document.getElementById(`line${i}`);
        line.style.opacity = 1;
      }
      backCrossY.style.opacity = 1;
      aboutContainer.style.color = "black";
      howToUseContainer.style.color = "black";
      setCountH1.style.color = "black";
      alarmContainer.style.color = "black";
      for (let i = 1; i < 6; i++) {
        let radio = document.getElementById(`radio${i}`);
        radio.classList.remove('alarm-radio-d');
        radio.classList.add('alarm-radio');
      }
    }
  }
})();