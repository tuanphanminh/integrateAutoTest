function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const publicVapidKey = 'BDgTwdmYbBKg3hNg4LwH10ASHVlIOu65I2ef2oLW68DP0yCnF6Ug0K6cZkLkwIQBqn6SykK39IjbacOVNdcradI';
const btnAutoLoadDs01 = document.querySelector('.btnAutoLoadDs01');
const btnAutoLoadDs02 = document.querySelector('.btnAutoLoadDs02');
const btnAutoLoadDs03 = document.querySelector('.btnAutoLoadDs03');
const btnAutoLoadDs04 = document.querySelector('.btnAutoLoadDs04');
const btnTitle = 'Testcase ';
const passedValue = ' is passed!' ;
const failedValue = ' is failed!' ;


const sendData = JSON.stringify({
    title: 'Sent Data',
    btnIndex: -1,
    btnValue: -1
});

function getPassFailValue(btnValue) {
    var obj = failedValue ;
    if (btnValue == 1) {
        obj = passedValue ;
    }
    return obj ;
}

function fillInReturnedInfo(btnIndex , btnValue) {
    var obj = btnTitle  + btnIndex + getPassFailValue(btnValue);
    return obj ;
}

async function fncHandlingEvent(data) {
    var obj = JSON.parse(data) ;
    if (obj) {
        if (obj.btnIndex == 1) {
            btnAutoLoadDs01.innerText = fillInReturnedInfo(obj.btnIndex, obj.btnValue) ;
        } else if (obj.btnIndex == 2) {
            btnAutoLoadDs02.innerText = fillInReturnedInfo(obj.btnIndex, obj.btnValue) ;
        } else if (obj.btnIndex == 3) {
            btnAutoLoadDs03.innerText = fillInReturnedInfo(obj.btnIndex, obj.btnValue) ;
        } else if (obj.btnIndex == 4) {
            btnAutoLoadDs04.innerText = fillInReturnedInfo(obj.btnIndex, obj.btnValue) ;
        }
    }
}

async function triggerPushNotification() {
  if ('serviceWorker' in navigator) {
    const register = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });

    console.log('waiting for acceptance');
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log('acceptance complete');

    navigator.serviceWorker.addEventListener('message', function(event) {
        fncHandlingEvent(event.data);
    });

    const response = await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
        'Content-Type': 'application/json',
        },
    });
  } else {
    console.error('Service workers are not supported in this browser');
  }
}

function click(btnIndex) {
    var obj = JSON.parse(sendData) ;
    obj.btnIndex = btnIndex ;

    fetch('/cmd', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

btnAutoLoadDs01.addEventListener('click', () => {
    btnAutoLoadDs01.disabled = true ;
    btnAutoLoadDs01.innerText = btnTitle + '1' + ' is running';
    click(1) ;
});

btnAutoLoadDs02.addEventListener('click', () => {
    btnAutoLoadDs02.disabled = true ;
    btnAutoLoadDs02.innerText = btnTitle + '2' + ' is running';
    click(2) ;
});

btnAutoLoadDs03.addEventListener('click', () => {
    btnAutoLoadDs03.disabled = true ;
    btnAutoLoadDs03.innerText = btnTitle + '3' + ' is running';
    click(3) ;
});

btnAutoLoadDs04.addEventListener('click', () => {
    btnAutoLoadDs04.disabled = true ;
    btnAutoLoadDs04.innerText = btnTitle + '4' + ' is running';
    click(4) ;
});
