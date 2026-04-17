import urllib.request, re, json

def get_images():
    req = urllib.request.Request('https://unsplash.com/s/photos/house', headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'"clientId":"([^"]+)"', html)
    if not match:
        print("No match")
        return
    client_id = match.group(1)
    print("Found client ID", client_id)
    
    ids = set()
    for page in range(1, 15):
        try:
            print("fetching page", page)
            s_req = urllib.request.Request(f'https://unsplash.com/napi/search/photos?query=house&per_page=30&page={page}')
            s_req.add_header('Authorization', 'Client-ID ' + client_id)
            s_req.add_header('User-Agent', 'Mozilla/5.0')
            data = json.loads(urllib.request.urlopen(s_req).read())
            for r in data['results']:
                ids.add(r['id'])
        except Exception as e:
            print("Error on page", page, e)
    
    with open('unsplash_ids.json', 'w') as f:
        json.dump(list(ids), f)
    print("Saved", len(ids), "IDs")

if __name__ == '__main__':
    get_images()
