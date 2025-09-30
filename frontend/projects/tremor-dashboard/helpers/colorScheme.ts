interface DocEvent extends Event {
  key: string;
  value: string;
}

const code = () => {
  const localStore: Storage["setItem"] = localStorage.setItem;

  localStorage.setItem = (key, value) => {
    const event = new Event("storageUpdated") as DocEvent;
    event.key = key;
    event.value = value;

    document.dispatchEvent(event);
    localStore.call(localStorage, key, value);
  };

  const localStoreHandler: EventListener = e => {
    const docEvent = e as DocEvent;

    // Can't import module from inline JS script, so please use these values here without constants
    const isDarkMode =
      docEvent && docEvent.key === "isDarkTheme" && docEvent.value === "true";
    const metaTag = document.querySelectorAll("meta[name='theme-color']")[0];
    metaTag.setAttribute("content", isDarkMode ? "#344767" : "#1a73e8");
  };

  document.addEventListener("storageUpdated", localStoreHandler, false);
};

export const getTheme = `(${code})();`;
