function openPostForm() {
  document.getElementById('myForm').style.display = 'block';
}

function closePostForm() {
  document.getElementById('myForm').style.display = 'none';
}

function getEvents() {
  const DB_NAME = 'myDatabase';
  const DB_VERSION = 2;
  const JSON_URL = '/data/events.json';
  const request = indexedDB.open(DB_NAME, DB_VERSION);
  request.onerror = function (event) {
    console.error('Error opening database:', event.target.errorCode);
  };
  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('Events', { keyPath: 'id' });
  };
  request.onsuccess = function (event) {
    const db = event.target.result;
    // Check if the JSON data already exists in IndexedDB
    const transaction = db.transaction(['Events'], 'readonly');
    const objectStore = transaction.objectStore('Events');
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
            const putTransaction = db.transaction('Events', 'readwrite');
            const putObjectStore = putTransaction.objectStore('Events');
            data.forEach(function (item) {
              var putRequest = putObjectStore.add(item);
            });
          })
          .catch((error) => {
            console.error('Error fetching JSON data:', error);
          });
      }
    };
  };
  putEvents();
}

function putEvents() {
  const DB_NAME = 'myDatabase';
  const DB_VERSION = 2;
  var request = indexedDB.open(DB_NAME, DB_VERSION);
  request.onerror = function (event) {
    console.error('Error opening database:', event.target.errorCode);
  };
  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(['Events'], 'readonly');
    const objectStore = transaction.objectStore('Events');
    var result = '';
    request = objectStore.getAll();
    request.onsuccess = function (event) {
      const data = event.target.result;
      data.forEach(function (item) {
        result += `
          <div id="keyBoard" class="col-md-3 mt-2" style="display: inline-block; padding:0.5rem;">
              <div class="card" style="width: auto; bg-success">
                  <img src="${item.fileUrl}" >
                  <div class="card-body" >
                      <h5 class="card-title" id="itemName">${item.title}</h5>
                      <p class="card-text"> 
                          Start Time: ${item.starttime}</p>
                      <p class="card-text"> 
                          End Time: ${item.endtime}</p>
                      <p class="card-text"">
                          Description: ${item.description}</p>
                      <p class="card-text">
                          Location: ${item.location}</p>
                      <a href="${item.more}" class="btn btn-primary" id="redirect" onClick = "window.open(${item.more})">Get More</a>
                  </div>
              </div>
          </div>`;
      });
      document.querySelector('#Out').innerHTML = result;
    };

    request.onblocked = function (event) {
      console.warn('Database blocked:', event.target.errorCode);
    };
    request.onversionchange = function (event) {
      console.warn('Database version changed:', event.target.errorCode);
    };
  };
}

function getFile() {
  const DB_NAME = 'myDatabase';
  const DB_VERSION = 2;
  const STORE_NAME = 'myObjectStore';

  const request = indexedDB.open(DB_NAME, DB_VERSION);

  request.onerror = function (event) {
    console.error('Error opening database:', event.target.errorCode);
  };

  request.onsuccess = function (event) {
    const db = event.target.result;

    // Open a transaction and access the object store
    const transaction = db.transaction(['Events'], 'readonly');
    const objectStore = transaction.objectStore('Events');

    // Retrieve all the objects from the object store
    const getAllRequest = objectStore.getAll();

    getAllRequest.onerror = function (event) {
      console.error('Error getting data:', event.target.errorCode);
    };

    getAllRequest.onsuccess = function (event) {
      const data = event.target.result;

      // Convert the retrieved data into a JSON string
      const jsonData = JSON.stringify(data, null, 2);

      // Save the JSON string to a file using FileSaver.js
      const blob = new Blob([jsonData], { type: 'application/json' });
      saveAs(blob, 'data.json');
    };
  };

  request.onblocked = function (event) {
    console.warn('Database blocked:', event.target.errorCode);
  };

  request.onversionchange = function (event) {
    console.warn('Database version changed:', event.target.errorCode);
  };
}

function postEvent() {
  const title = document.getElementById('title').value;
  const starttime = document.getElementById('start time').value;
  const endtime = document.getElementById('end time').value;
  const description = document.getElementById('description').value;
  const location = document.getElementById('location').value;
  const more = document.getElementById('more').value;
  var files = document.getElementById('fileupload').files;
  var fileUrl = null;
  const id = new Date().getTime(); // get current timestamp
  if (files) {
    s3upload();
  }

  const dbName = 'myDatabase';
  const objectStoreName = 'Events';
  const version = 2;
  const request = indexedDB.open(dbName, version);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    // Create object store
    const objectStore = db.createObjectStore(objectStoreName, {
      keyPath: 'id',
    });

    // Add indexes
    objectStore.createIndex('id', 'id', { unique: false });
  };

  request.onerror = function (event) {
    console.log('Error opening database');
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    console.log('Database opened successfully');

    const transaction = db.transaction(['Events'], 'readwrite');
    const data = {
      id: `${id}`,
      title: `${title}`,
      starttime: `${starttime}`,
      endtime: `${endtime}`,
      description: `${description}`,
      location: `${location}`,
      more: `${more}`,
      fileUrl: `${fileUrl}`,
    };
    transaction.objectStore('Events').add(data);

    request.onerror = function (event) {
      console.log('Error adding data to object store');
    };

    request.onsuccess = function (event) {
      console.log('Data added to object store');
    };
  };
  event.preventDefault();
  document.getElementById('title').value = '';
  document.getElementById('start time').value = '';
  document.getElementById('end time').value = '';
  document.getElementById('description').value = '';
  document.getElementById('location').value = '';
  document.getElementById('more').value = '';
  document.getElementById('fileupload').value = '';
}

function s3upload() {
  var bucketName = 'unipoolimage';
  var bucketRegion = 'us-west-2';
  var IdentityPoolId = 'us-west-2:ef889b65-a202-4e5e-a299-3a6108b62454';

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId,
    }),
  });
  var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: bucketName },
  });
  var file = files[0];
  var fileName = file.name;
  var filePath = id + fileName;
  fileUrl =
    'https://' +
    bucketName +
    '.s3.' +
    bucketRegion +
    '.amazonaws.com/' +
    filePath;
  s3.upload(
    {
      Key: filePath,
      Body: file,
      ACL: 'public-read',
    },
    function (err, data) {
      if (err) {
        reject('error');
      }
      alert('Successfully Uploaded!');
    }
  );
}

module.exports = { getEvents, openPostForm, closePostForm };
