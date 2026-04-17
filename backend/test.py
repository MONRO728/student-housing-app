import urllib.request, urllib.error

try:
    urllib.request.urlopen('http://127.0.0.1:8000/api/listings/properties/')
except urllib.error.HTTPError as e:
    with open('error.html', 'wb') as f:
        f.write(e.read())
