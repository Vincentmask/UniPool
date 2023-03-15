function getScholarShip() {
  const DB_NAME = 'mySSDatabase';
  const DB_VERSION = 2;
  const JSON_URL = '/UniPool/data/scholarship.json';
  const request = indexedDB.open(DB_NAME, DB_VERSION);
  request.onerror = function (event) {
    console.error('Error opening database:', event.target.errorCode);
  };
  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('ScholarShip', {
      keyPath: 'id',
    });
  };
  request.onsuccess = function (event) {
    const db = event.target.result;
    // Check if the JSON data already exists in IndexedDB
    const transaction = db.transaction(['ScholarShip'], 'readonly');
    const objectStore = transaction.objectStore('ScholarShip');
    var request = 0;

    var request = objectStore.get(1);
    request.onerror = function (event) {
      console.error('Error getting JSON data:', event.target.errorCode);
    };
    request.onsuccess = function (event) {
      const jsonData = event.target.result;
      if (jsonData) {
        // JSON data already exists in IndexedDB, use it
        console.log('JSON data already exists:', jsonData);
      } else {
        // JSON data does not exist in IndexedDB, fetch it from the server
        fetch(JSON_URL)
          .then((response) => response.json())
          .then((data) => {
            // Store the JSON data in IndexedDB
            const putTransaction = db.transaction('ScholarShip', 'readwrite');
            const putObjectStore = putTransaction.objectStore('ScholarShip');
            data.forEach(function (item) {
              putObjectStore.add(item);
            });
          })
          .catch((error) => {
            console.error('Error fetching JSON data:', error);
          });
      }
    };
  };
  putScholarShip();
}

function putScholarShip() {
  const DB_NAME = 'mySSDatabase';
  const DB_VERSION = 2;
  var request = indexedDB.open(DB_NAME, DB_VERSION);
  request.onerror = function (event) {
    console.error('Error opening database:', event.target.errorCode);
  };
  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(['ScholarShip'], 'readonly');
    const objectStore = transaction.objectStore('ScholarShip');
    var result = '';
    request = objectStore.getAll();
    request.onsuccess = function (event) {
      const data = event.target.result;
      data.forEach(function (item) {
        result += `
      <a
        class="job_title"
        href="${item.link}"
        target="_blank"
        >${item.title}
      </a>
      <p class="job_info">
        Information: ${item.info}
        <br />Time: ${item.time}
        <br />Amount: ${item.amount}
        <br />Organization: ${item.org}
      </p>
      <hr />`;
      });
      document.querySelector('#SSOut').innerHTML = result;
    };

    request.onblocked = function (event) {
      console.warn('Database blocked:', event.target.errorCode);
    };
    request.onversionchange = function (event) {
      console.warn('Database version changed:', event.target.errorCode);
    };
  };
}
