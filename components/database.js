function getEvents() {
  /*
  fetch(`http://35.167.218.101:3000/getEvents`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('bla');
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('There was a problem fetching the data:', error);
    });
  // const dataJson = localStorage.getItem('data.json');
  // const data = JSON.parse(dataJson);
  // console.log(data);
  */

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
    /*
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
              const putRequest = putObjectStore.add({ id: `${item.id}`, item });
            });
            putRequest.onerror = function (event) {
              console.error('Error storing JSON data:', event.target.errorCode);
            };
            putRequest.onsuccess = function (event) {
              console.log('JSON data stored in IndexedDB');
            };
          })
          .catch((error) => {
            console.error('Error fetching JSON data:', error);
          });
      }
    };
*/
    var result = '';
    request = objectStore.getAll();
    request.onsuccess = function (event) {
      const data = event.target.result;
      const cardContainer = document.getElementById('out');
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
                      <a href="#" class="btn btn-primary" id="redirect" onClick = "GetURL(${item.more})">Get More</a>
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
  // const existingDataJson = localStorage.getItem('data.json');
  // const existingData = JSON.parse(existingDataJson);

  // const data = {
  //   title: `${title}`,
  //   starttime: `${starttime}`,
  //   endtime: `${endtime}`,
  //   description: `${description}`,
  //   location: `${location}`,
  //   fileUrl: `${fileUrl}`,
  // };
  // existingData.newItem = data;
  // const updatedDataJson = JSON.stringify(existingData);
  // localStorage.setItem('data.json', updatedDataJson);

  // const query = `INSERT INTO "Events" ("ID", "Title", "Start", "Description", "End", "Image", "Location", "Type") VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  // const values = [
  //   id,
  //   title,
  //   starttime,
  //   description,
  //   endtime,
  //   fileUrl,
  //   location,
  // ];

  // client.query(query, values, (err, res) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log('Data inserted successfully');
  //   client.end();
  // });
}

function s3upload() {
  var files = document.getElementById('fileupload').files;
  if (files) {
    var file = files[0];
    var fileName = file.name;
    var filePath = fileName;
    var fileUrl = 'https://' + bucketRegion + '.amazonaws.com/' + filePath;
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
  event.preventDefault();
  document.getElementById('title').value = '';
  document.getElementById('start time').value = '';
  document.getElementById('end time').value = '';
  document.getElementById('description').value = '';
  document.getElementById('location').value = '';
  document.getElementById('fileupload').value = '';
}
