// var pg = require('pg');
// var connectionString =
//   'postgres://haosheng:pw3m3pb#Dp@dbase.cecs.pdx.edu/ip:5432/haosheng';
// var pgClient = new pg.Client(connectionString);
// pgClient.connect();
const { Pool, Client } = require('pg');

// // create a new client instance
// const client = new Client({
//   user: 'haosheng',
//   host: 'dbase.cecs.pdx.edu',
//   database: 'haosheng',
//   password: 'pw3m3pb#Dp',
//   port: 5432,
// });

// // connect to the client
// client.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database', err.stack);
//   } else {
//     console.log('Connected to database');
//   }
// });

// // run a query on the database
// client.query('SELECT * FROM Event', (err, res) => {
//   if (err) {
//     console.error('Error running query', err.stack);
//   } else {
//     console.log('Query results:', res.rows);
//   }

//   // close the client connection
//   client.end();
// });
function openPostForm() {
  document.getElementById('myForm').style.display = 'block';
}

function closePostForm() {
  document.getElementById('myForm').style.display = 'none';
}

//Bucket Configurations
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

function s3upload() {
  var files = document.getElementById('fileUpload').files;
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
    ).on('httpUploadProgress', function (progress) {
      var uploaded = parseInt((progress.loaded * 100) / progress.total);
      $('progress').attr('value', uploaded);
    });
  }
}
// var albumBucketName = 'unipoolimage';
// var bucketRegion = 'US West (Oregon) us-west-2';
// var IdentityPoolId = 'IDENTITY_POOL_ID';

// AWS.config.update({
//   region: bucketRegion,
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: IdentityPoolId,
//   }),
// });

// var s3 = new AWS.S3({
//   apiVersion: '2006-03-01',
//   params: { Bucket: albumBucketName },
// });

// function listAlbums() {
//   s3.listObjects({ Delimiter: '/' }, function (err, data) {
//     if (err) {
//       return alert('There was an error listing your albums: ' + err.message);
//     } else {
//       var albums = data.CommonPrefixes.map(function (commonPrefix) {
//         var prefix = commonPrefix.Prefix;
//         var albumName = decodeURIComponent(prefix.replace('/', ''));
//         return getHtml([
//           '<li>',
//           '<span onclick="deleteAlbum(\'' + albumName + '\')">X</span>',
//           '<span onclick="viewAlbum(\'' + albumName + '\')">',
//           albumName,
//           '</span>',
//           '</li>',
//         ]);
//       });
//       var message = albums.length
//         ? getHtml([
//             '<p>Click on an album name to view it.</p>',
//             '<p>Click on the X to delete the album.</p>',
//           ])
//         : '<p>You do not have any albums. Please Create album.';
//       var htmlTemplate = [
//         '<h2>Albums</h2>',
//         message,
//         '<ul>',
//         getHtml(albums),
//         '</ul>',
//         '<button onclick="createAlbum(prompt(\'Enter Album Name:\'))">',
//         'Create New Album',
//         '</button>',
//       ];
//       document.getElementById('app').innerHTML = getHtml(htmlTemplate);
//     }
//   });
// }

// function createAlbum(albumName) {
//   albumName = albumName.trim();
//   if (!albumName) {
//     return alert('Album names must contain at least one non-space character.');
//   }
//   if (albumName.indexOf('/') !== -1) {
//     return alert('Album names cannot contain slashes.');
//   }
//   var albumKey = encodeURIComponent(albumName);
//   s3.headObject({ Key: albumKey }, function (err, data) {
//     if (!err) {
//       return alert('Album already exists.');
//     }
//     if (err.code !== 'NotFound') {
//       return alert('There was an error creating your album: ' + err.message);
//     }
//     s3.putObject({ Key: albumKey }, function (err, data) {
//       if (err) {
//         return alert('There was an error creating your album: ' + err.message);
//       }
//       alert('Successfully created album.');
//       viewAlbum(albumName);
//     });
//   });
// }

// function viewAlbum(albumName) {
//   var albumPhotosKey = encodeURIComponent(albumName) + '/';
//   s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
//     if (err) {
//       return alert('There was an error viewing your album: ' + err.message);
//     }
//     // 'this' references the AWS.Response instance that represents the response
//     var href = this.request.httpRequest.endpoint.href;
//     var bucketUrl = href + albumBucketName + '/';

//     var photos = data.Contents.map(function (photo) {
//       var photoKey = photo.Key;
//       var photoUrl = bucketUrl + encodeURIComponent(photoKey);
//       return getHtml([
//         '<span>',
//         '<div>',
//         '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
//         '</div>',
//         '<div>',
//         '<span onclick="deletePhoto(\'' +
//           albumName +
//           "','" +
//           photoKey +
//           '\')">',
//         'X',
//         '</span>',
//         '<span>',
//         photoKey.replace(albumPhotosKey, ''),
//         '</span>',
//         '</div>',
//         '</span>',
//       ]);
//     });
//     var message = photos.length
//       ? '<p>Click on the X to delete the photo</p>'
//       : '<p>You do not have any photos in this album. Please add photos.</p>';
//     var htmlTemplate = [
//       '<h2>',
//       'Album: ' + albumName,
//       '</h2>',
//       message,
//       '<div>',
//       getHtml(photos),
//       '</div>',
//       '<input id="photoupload" type="file" accept="image/*">',
//       '<button id="addphoto" onclick="addPhoto(\'' + albumName + '\')">',
//       'Add Photo',
//       '</button>',
//       '<button onclick="listAlbums()">',
//       'Back To Albums',
//       '</button>',
//     ];
//     document.getElementById('app').innerHTML = getHtml(htmlTemplate);
//   });
// }

// function addPhoto(albumName) {
//   var files = document.getElementById('photoupload').files;
//   if (!files.length) {
//     return alert('Please choose a file to upload first.');
//   }
//   var file = files[0];
//   var fileName = file.name;
//   var albumPhotosKey = encodeURIComponent(albumName) + '/';

//   var photoKey = albumPhotosKey + fileName;

//   // Use S3 ManagedUpload class as it supports multipart uploads
//   var upload = new AWS.S3.ManagedUpload({
//     params: {
//       Bucket: albumBucketName,
//       Key: photoKey,
//       Body: file,
//     },
//   });

//   var promise = upload.promise();

//   promise.then(
//     function (data) {
//       alert('Successfully uploaded photo.');
//       viewAlbum(albumName);
//     },
//     function (err) {
//       return alert('There was an error uploading your photo: ', err.message);
//     }
//   );
// }

// function deletePhoto(albumName, photoKey) {
//   s3.deleteObject({ Key: photoKey }, function (err, data) {
//     if (err) {
//       return alert('There was an error deleting your photo: ', err.message);
//     }
//     alert('Successfully deleted photo.');
//     viewAlbum(albumName);
//   });
// }

// function deleteAlbum(albumName) {
//   var albumKey = encodeURIComponent(albumName) + '/';
//   s3.listObjects({ Prefix: albumKey }, function (err, data) {
//     if (err) {
//       return alert('There was an error deleting your album: ', err.message);
//     }
//     var objects = data.Contents.map(function (object) {
//       return { Key: object.Key };
//     });
//     s3.deleteObjects(
//       {
//         Delete: { Objects: objects, Quiet: true },
//       },
//       function (err, data) {
//         if (err) {
//           return alert('There was an error deleting your album: ', err.message);
//         }
//         alert('Successfully deleted album.');
//         listAlbums();
//       }
//     );
//   });
// }
