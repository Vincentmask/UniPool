import requests
from bs4 import BeautifulSoup

URL = "https://pdx.scholarshipuniverse.com/student/scholarship/234710"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")

results = soup.find(id="main-container")
print(results.prettify())