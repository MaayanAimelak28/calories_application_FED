/*  
    Maayan Aimelak ID: 205646722
    Yasmin Solomon ID: 315601005    
*/
const idb = {};
// this method asynchronously opens the IndexedDB database.
idb.openCaloriesDB = async function (dbName, version) {
    return new Promise((resolve, reject) => {

        // checking if IndexedDB support the web browser.
        const indexedDB = window.indexedDB || window.mozIndexedDB ||
            window.webkitIndexedDB || window.msIndexedDB;

        // Checking whether the web browser supports the IndexedDB database
        // if it doesn't then showing a message saying so
        if (!indexedDB) {
            console.log("The web browser doesn't support IndexedDB");
        }
        // open a request to the IndexedDB database with the specified name and version.
        const request = window.indexedDB.open(dbName, version);
        // reject the promise with an error if there is an error opening the database.
        request.onerror = (event) => {
            reject('Error with opening DB: ' + event.target.error);
        };
        // set the database instance and resolve the promise when the database is successfully opened.
        request.onsuccess = (event) => {
            this.db = event.target.result;
            resolve(idb);
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore('caloriesDB', { autoIncrement: true });
        };
    });
}
// this method asynchronously adds calorie data to the IndexedDB database.
idb.addCalories = async function (calorie) {
    return new Promise((resolve, reject) => {
        // check if the database is initialized.
        if (!this.db) {
            reject('Database not initialized');
            return;
        }
        // read-write transaction on the 'caloriesDB' object store.
        const transaction = this.db.transaction(['caloriesDB'], 'readwrite');
        // make a request to add our new item object to the object store
        const objectStore = transaction.objectStore('caloriesDB');
        //console.log(calorie);
        const request = objectStore.add(calorie);
        // success in the add request.
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        // error in the add request.
        request.onerror = (event) => {
            reject('Error with adding item: ' + event.target.error);
        };
    });
}
// this method asynchronously retrieves all items from the IndexedDB database.
idb.getAllItems = async function () {
    return new Promise((resolve, reject) => {
        // check if the database is initialized.
        if (!this.db) {
            reject('Database not initialized');
            console.log('Database not initialized');
            return;
        }
        // read-only transaction on the 'caloriesDB' object store.
        const transaction = this.db.transaction(['caloriesDB'], 'readonly');
        const objectStore = transaction.objectStore('caloriesDB');
        // retrieve all the items from the object store.
        const request = objectStore.getAll();
        //console.log('request : ' + request);
        // if there is an error getting the items, reject the promise.
        request.onerror = (event) => {
            reject('Error with getting the items: ' + event.target.error);
            console.log('Error with getting the items');
        };
        // resolve the promise with the retrieved items.
        request.onsuccess = (event) => {
            const meals = event.target.result;
            console.log('Meals:' + meals);
            resolve(meals);
        };
    });
}

window.idb = idb;

