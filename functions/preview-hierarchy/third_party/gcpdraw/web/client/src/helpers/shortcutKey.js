export const shortcutKeyPrefix = () => {
  const platform = window.navigator.platform;
  // based on https://stackoverflow.com/questions/38241480/detect-macos-ios-windows-android-and-linux-os-with-js
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

  const osKeyMap = {
    "mac": {
      keyEvent: "metaKey",
      keyName: "Command",
      KeyNameCodeMirror: "Cmd",
    },
    "windows": {
      keyEvent: "ctrlKey",
      keyName: "Control",
      KeyNameCodeMirror: "Ctrl",
    },
    "linux": {
      keyEvent: "ctrlKey",
      keyName: "Control",
      KeyNameCodeMirror: "Ctrl",
    },
  };

  if (macosPlatforms.indexOf(platform) !== -1) {
    return osKeyMap["mac"];
  }
  if (windowsPlatforms.indexOf(platform) !== -1) {
    return osKeyMap["windows"];
  }
  if (/Linux/.test(platform)) {
    return osKeyMap["linux"];
  }

  // use "mac" key by default
  return osKeyMap["mac"];
}
