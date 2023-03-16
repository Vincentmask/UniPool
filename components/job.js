function openPostForm() {
  document.getElementById('myForm').style.display = 'block';
}

function closePostForm() {
  document.getElementById('myForm').style.display = 'none';
}

function postJob() {
  const title = document.getElementById('title').value;
  const department = document.getElementById('department').value;
  const location = document.getElementById('location').value;
  const url = document.getElementById('url').value;
  var result = '';
  result += `
    <a 
        class="job_title" 
        href="${url}" 
        target="_blank"
      >
        ${title}
      </a>
      <p class="job_info">
        ${department}
        <br />
        ${location}
      </p>
      <hr />
  `;
  document.querySelector('#output').innerHTML += result;
  event.preventDefault();
  document.getElementById('title').value = '';
  document.getElementById('department').value = '';
  document.getElementById('location').value = '';
  document.getElementById('url').value = '';
}
