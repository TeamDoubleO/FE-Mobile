// 콜백 함수 저장하는 변수
let logoutCallback = null;

export function setLogoutCallback(cb) {
  logoutCallback = cb;
}

// 설정된 콜백 함수를 실행하는 함수
export function runLogoutCallback() {
  if (logoutCallback) logoutCallback();
}
