(function () {
  // イントロアニメーションに使う要素を取得
  const timer = document.getElementById('timer'),
    startStopBtn = document.getElementById('start-stop-btn'),
    setCount = document.getElementById('set-count'),
    status = document.getElementById('status'),
    statusSubText = document.getElementById('status-sub-text'),
    tomato = document.getElementById('tomato'),
    circle1 = document.getElementById('circle1'),
    circle2 = document.getElementById('circle2'),
    circle3box = document.getElementById('circle3-box'),
    btnContainerBack = document.getElementById('button-container-back'),
    setContainer = document.getElementById('set-container'),
    leftTopTitleBack = document.getElementById('left-top-title-back'),
    timerCircleCanvas = document.getElementById('timer-circle-canvas'),
    btnText = document.getElementById('btn-text'),
    introTimer = document.getElementById('intro-timer'),
    introTomato = document.getElementById('intro-tomato'),
    bgWhite = document.getElementById('bg-white'),
    title = document.getElementById('title'),
    about = document.getElementById('about'),
    howToUse = document.getElementById('how-to-use'),
    setCountMenu = document.getElementById('set-count-menu'),
    alarm = document.getElementById('alarm'),
    darkTheme = document.getElementById('dark-theme'),
    buttonContainerBack = document.getElementById('button-container-back'),
    hideLine = document.getElementById('hide-line'),
    btnTextUnderLine = document.getElementById('btn-text-under-line'),
    setContainerBack = document.getElementById('set-container-back'),
    backCrossY = document.getElementById('back-cross-y'),
    leftLine = document.getElementById('left-line'),
    myNum = document.getElementById('my-num'),
    countContainerBottomLine = document.getElementById('count-container-bottom-line'),
    countContainerLeftLine = document.getElementById('count-container-left-line'),
    leftTopTitle = document.getElementById('left-top-title');

  let introTimerIndex = 0,
    introTimerID;

  new Promise((resolve, reject) => {
    setTimeout(() => {  // @keyframe introTimerAnime 待ち
      resolve();
    }, 1800);
  }).then(() => {
    return new Promise((resolve, reject) => {
      introTimer.style.opacity = 1;
      introTimerID = setInterval(updateIntroTimer, 12); // タイマーを25:00.000まで更新
      introTomato.classList.remove('hide-contents'); // トマト画像がフェードイン、1.5s
      setTimeout(() => {
        resolve();
      }, 1500);
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      tomato.classList.remove('visibility-hidden');  // トマトとタイマーをイントロからすり替え
      timer.classList.remove('visibility-hidden');
      bgWhite.classList.remove('hide-white'); // 白背景を下からスライドイン、1s
      circle3box.classList.remove('hide-white'); // circle3-box も同じ動き
      circle3.classList.remove('circle3-non-move'); // circle3-box の動きを相殺
      circle1.classList.remove('padding-0'); // circle1を拡大登場、1s
      circle2.classList.remove('padding-0'); // circle2を拡大登場、1s
      setTimeout(() => {
        resolve();
      }, 800);
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      introTimer.style.willChange = 'auto';
      bgWhite.style.willChange = 'auto';
      circle1.style.willChange = 'auto';
      circle2.style.willChange = 'auto';
      leftTopTitleBack.classList.remove('hide-title-back'); // 左上のタイトルの赤背景を上からスライドイン、0.8s
      setTimeout(() => { title.classList.remove('hide-title'); }, 500); // タイトル文字をにゅっと登場させる、0.5s
      btnContainerBack.classList.remove('hide-btn-container'); // ボタンコンテナを左からフェードイン、0.8s
      hideLine.classList.remove('hide-line-hide'); // 線隠しも上と同様に、0.8s
      startStopBtn.classList.remove('hide-contents'); // ボタンをフェードイン、0.8s
      btnTextUnderLine.classList.remove('hide-btn-text-under-line'); // ボタンテキストの下線を右からフェードイン、0.8s
      setContainerBack.classList.remove('hide-set-container-back'); // セット数の後ろの赤四角を右からスライドイン、0.8s
      countContainerBottomLine.classList.remove('hide-cc-bottom-line'); // count-container-bottom-lineを右からスライドイン、0.8s
      for (let i = 1; i < 9; i++) {
        let cross = document.getElementById(`cross${i}`);
        cross.classList.remove('hide-cross'); // cross をスライドイン、0.8s
      }
      setTimeout(() => {
        resolve();
      }, 800);
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      for (let i = 1; i < 12; i++) {  // line をスライドイン、0.8s
        let line = document.getElementById(`line${i}`);
        line.classList.remove(`slide-in-${i}`);
      }
      backCrossY.classList.remove('slide-in-y');
      leftLine.classList.remove('hide-left-line'); // left-lineを下からスライドイン、0.8s
      myNum.classList.remove('hide-my-num'); // my-numを右からスライドイン、0.8s
      countContainerLeftLine.classList.remove('hide-cc-left-line'); // count-container-left-lineを上からスライドイン、0.8s
      status.classList.remove('hide-status'); // status を左からフェードイン、0.8s
      statusSubText.classList.remove('hide-status-sub'); // status-sub-text を左からフェードイン、0.8s
      btnText.classList.remove('hide-btn-text'); // ボタンテキストを左からフェードイン、0.8s
      setCount.classList.remove('hide-set-count'); // セットカウントを下からスライドイン、0.8s

      new Promise((resolve, reject) => {
        about.classList.remove('hide-menu'); // about を左からフェードイン、0.8s
        setTimeout(() => {
          resolve();
        }, 50); // ずららっとスライドさせるため、50ms間隔
      }).then(() => {
        return new Promise((resolve, reject) => {
          howToUse.classList.remove('hide-menu'); // how-to-use を左からフェードイン、0.8s
          setTimeout(() => {
            resolve();
          }, 50);
        })
      }).then(() => {
        return new Promise((resolve, reject) => {
          setCountMenu.classList.remove('hide-menu'); // set-count を左からフェードイン、0.8s
          setTimeout(() => {
            resolve();
          }, 50);
        })
      }).then(() => {
        return new Promise((resolve, reject) => {
          alarm.classList.remove('hide-menu'); // alarm を左からフェードイン、0.8s
          setTimeout(() => {
            resolve();
          }, 50);
        })
      }).then(() => {
        return new Promise((resolve, reject) => {
          darkTheme.classList.remove('hide-menu'); // dark-theme を左からフェードイン、0.8s
        })
      }).catch((e) => {
        console.error(e);
      });

      setTimeout(() => {
        resolve();
      }, 1000);
    })
  }).then(() => {
    container.classList.remove('pointer-event-none'); // pointer-event を元に戻す
    about.classList.remove('d-8'); // 全てのtransition-duration を初期化
    howToUse.classList.remove('d-8');
    setCountMenu.classList.remove('d-8');
    alarm.classList.remove('d-8');
    darkTheme.classList.remove('d-8');
    status.classList.remove('d-8');
    statusSubText.classList.remove('d-8');
    buttonContainerBack.classList.remove('d-8');
    btnTextUnderLine.classList.remove('d-8');
    btnText.classList.remove('d-8');
    hideLine.classList.remove('d-8');
    countContainerBottomLine.classList.remove('d-8');
    countContainerLeftLine.classList.remove('d-8');
    setCount.classList.remove('d-8');
    setContainerBack.classList.remove('d-8');
    leftTopTitle.classList.remove('d-8');
    leftTopTitleBack.classList.remove('d-8');
    leftLine.classList.remove('d-8');
    myNum.classList.remove('d-8');
    backCrossY.classList.remove('d-8');
    title.classList.add('d-0');
    circle3box.classList.add('d-0');
    title.classList.add('d-0');
    bgWhite.classList.add('d-3');
    for (let i = 1; i < 4; i++) {
      let circle = document.getElementById(`circle${i}`);
      circle.classList.add('d-3');
    }
    for (let i = 1; i < 9; i++) {
      let cross = document.getElementById(`cross${i}`);
      cross.classList.remove('d-8');
    }
    for (let i = 1; i < 12; i++) {
      let line = document.getElementById(`line${i}`);
      line.classList.remove('d-8');
      line.classList.add('d-3');
    }
    backCrossY.classList.add('d-3');
    status.classList.add('d-3');
    statusSubText.classList.add('d-3');
    setCount.classList.add('d-3');
    leftTopTitleBack.classList.add('d-3');
    setContainerBack.classList.add('d-3');
    btnContainerBack.classList.add('d-3');
    hideLine.classList.add('d-3');

  }).catch((e) => {
    console.error(e);
  });

  /**
  * 00:00.000から25:00.000までアニメーション
  */
  function updateIntroTimer() {
    if (introTimerIndex >= 1500) {
      clearInterval(introTimerID);
      introTimer.innerHTML = "25:00.000";
      return;
    }
    let min = ('0' + Math.floor(introTimerIndex / 60)).slice(-2);
    let sec = ('0' + Math.floor(introTimerIndex % 60)).slice(-2);
    let ms = ('00' + String(introTimerIndex)).slice(-3);
    introTimer.innerHTML = min + ':' + sec + '.' + ms;
    introTimerIndex = introTimerIndex + 17;
  }
})();