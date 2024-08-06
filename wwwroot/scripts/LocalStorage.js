

window.localStorageAccess = {
    clear: function () {
        localStorage.clear();
    },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    exists: function (key) {
        return (localStorage.getItem(key) !== null);
    },
    read: function (key) {
        const item = localStorage.getItem(key);
        return item ? item : "";
    },
    write: function (key, value) {
        localStorage.setItem(key, value);
    }
};





