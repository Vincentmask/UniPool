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
    );
  }
}
