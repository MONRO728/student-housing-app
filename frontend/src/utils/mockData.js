// ============================================================
// FULLY DETERMINISTIC MOCK DATA — no Math.random()
// IDs are stable across ALL page reloads / hot-reloads
// ============================================================

const CITIES_DATA = [
  {
    name: 'Toshkent', slug: 'toshkent', cityName: 'Toshkent',
    lat: 41.2995, lng: 69.2401,
    districts: ['Chilonzor', 'Yunusobod', 'Olmazor', 'Mirzo Ulugbek', 'Shayxontohur', 'Yakkasaroy'],
    universities: ['TATU', 'INHA University', 'TDYU', 'O\'zMU', 'MDIS', 'TDTU'],
    imageKeywords: ['tashkent', 'uzbekistan', 'apartment', 'room', 'interior'],
  },
  {
    name: 'Samarqand', slug: 'samarqand', cityName: 'Samarqand',
    lat: 39.6270, lng: 66.9750,
    districts: ['Siyob', 'Registon', 'Bogishamol', 'Dahbed', 'Urgut'],
    universities: ['SamDU', 'SamTEI', 'SamMI', 'SamIES'],
    imageKeywords: ['samarkand', 'silk-road', 'bedroom', 'flat', 'dorm'],
  },
  {
    name: 'Buxoro', slug: 'buxoro', cityName: 'Buxoro',
    lat: 39.7714, lng: 64.4253,
    districts: ['Markaz', 'Minor', 'Kogon', 'Romitan', 'Qorovulbozor'],
    universities: ['BuxDU', 'BuxMTI', 'BuxDTI'],
    imageKeywords: ['bukhara', 'historic', 'room', 'apartment', 'interior'],
  },
  {
    name: 'Xiva', slug: 'xiva', cityName: 'Xiva',
    lat: 41.3783, lng: 60.3639,
    districts: ['Ichan Kala', 'Dishan Kala', 'Pahlavan Mahmud', 'Yangi Xiva'],
    universities: ['XorazDU', 'UrDU'],
    imageKeywords: ['khiva', 'uzbekistan', 'room', 'flat', 'bedroom'],
  },
  {
    name: 'Andijon', slug: 'andijon', cityName: 'Andijon',
    lat: 40.7821, lng: 72.3442,
    districts: ['Eski shahar', 'Yangi Andijon', 'Oltinko\'l', 'Asaka', 'Baliqchi'],
    universities: ['AndMI', 'AndDU', 'AndQXI'],
    imageKeywords: ['andijan', 'ferghana', 'apartment', 'bedroom', 'interior'],
  },
  {
    name: 'Namangan', slug: 'namangan', cityName: 'Namangan',
    lat: 41.0011, lng: 71.6676,
    districts: ['Davlatobod', 'Markaz', 'Chortoq', 'Yangi Namangan', 'Pop'],
    universities: ['NamDU', 'NamMTI', 'NamDTI'],
    imageKeywords: ['namangan', 'uzbekistan', 'room', 'apartment', 'flat'],
  },
  {
    name: "Farg'ona", slug: 'fargona', cityName: "Farg'ona",
    lat: 40.3842, lng: 71.7843,
    districts: ['Margilon', 'Markaz', 'Quva', 'Rishton', 'Bag\'dod'],
    universities: ['FarDU', 'FarPI', 'FarDTI'],
    imageKeywords: ['fergana', 'uzbekistan', 'dormitory', 'bedroom', 'interior'],
  },
  {
    name: 'Nukus', slug: 'nukus', cityName: 'Nukus',
    lat: 42.4531, lng: 59.6103,
    districts: ['Amudaryo', 'Markaz', 'Ellikqal\'a', 'Qo\'ng\'irot', 'Chimboy'],
    universities: ['QorQDU', 'UrDU'],
    imageKeywords: ['nukus', 'karakalpakstan', 'room', 'apartment', 'flat'],
  },
  {
    name: 'Qarshi', slug: 'qarshi', cityName: 'Qarshi',
    lat: 38.8612, lng: 65.7951,
    districts: ['Nasaf', 'Markaz', 'G\'uzor', 'Shahrisabz', 'Kitob'],
    universities: ['QarDU', 'QarMII'],
    imageKeywords: ['karshi', 'kashkadarya', 'apartment', 'room', 'interior'],
  },
  {
    name: 'Termiz', slug: 'termiz', cityName: 'Termiz',
    lat: 37.2286, lng: 67.2751,
    districts: ['Al-Hakim', 'Markaz', 'Sho\'rchi', 'Jarqo\'rg\'on', 'Denov'],
    universities: ['SurDU', 'TerDTI'],
    imageKeywords: ['termez', 'surkhandarya', 'flat', 'room', 'bedroom'],
  },
  {
    name: 'Guliston', slug: 'guliston', cityName: 'Guliston',
    lat: 40.4897, lng: 68.7842,
    districts: ['Sirdaryo', 'Markaz', 'Shirin', 'Boyovut', 'Sardoba'],
    universities: ['SirDU', 'SirQXI'],
    imageKeywords: ['gulistan', 'sirdarya', 'apartment', 'dorm', 'room'],
  },
  {
    name: 'Jizzax', slug: 'jizzax', cityName: 'Jizzax',
    lat: 40.1158, lng: 67.8422,
    districts: ['Zomin', 'Markaz', 'Dustlik', 'G\'allaorol', 'Zafarobod'],
    universities: ['JizDU', 'JizPI'],
    imageKeywords: ['jizzakh', 'uzbekistan', 'bedroom', 'flat', 'interior'],
  },
  {
    name: 'Urganch', slug: 'urganch', cityName: 'Urganch',
    lat: 41.5500, lng: 60.6333,
    districts: ['Xorazm', 'Markaz', 'Hazorasp', 'Gurlan', 'Pitnak'],
    universities: ['UrDU', 'XorazDU'],
    imageKeywords: ['urgench', 'khorezm', 'room', 'apartment', 'dorm'],
  },
  {
    name: 'Navoiy', slug: 'navoiy', cityName: 'Navoiy',
    lat: 40.0844, lng: 65.3792,
    districts: ['Zarafshon', 'Markaz', 'Karmana', 'Nurota', 'Konimex'],
    universities: ['NavDU', 'NavMII'],
    imageKeywords: ['navoi', 'uzbekistan', 'bedroom', 'flat', 'interior'],
  },
  {
    name: "Qo'qon", slug: 'qoqon', cityName: "Qo'qon",
    lat: 40.5286, lng: 70.9425,
    districts: ['Markaz', "Dang'ara", 'Beshariq', 'Bag\'dod', 'Oltiariq'],
    universities: ['QoqDTI', 'FarDU'],
    imageKeywords: ['kokand', 'fergana', 'room', 'apartment', 'dorm'],
  },
  {
    name: 'Denov', slug: 'denov', cityName: 'Denov',
    lat: 38.2667, lng: 67.8986,
    districts: ['Markaz', 'Surxon', 'Sho\'rchi', 'Oltinsoy', 'Muzrabot'],
    universities: ['SurDU', 'TerDTI'],
    imageKeywords: ['denov', 'surkhandarya', 'flat', 'bedroom', 'room'],
  },
];

const TITLES = [
  "Talabalar uchun shinam xona",
  "Markazda arzon kvartira",
  "Universitet yaqinida hovli uy",
  "Zamonaviy yotoqxona",
  "Sokin mahallada talabalar uyi",
  "Qulay va arzon xona",
  "Tugal jihozlangan kvartira",
  "Metro yaqinida uy",
  "Ikki xonali kvartira",
  "O'quvchilar uchun maxsus ijara",
];

const TYPES = ["Kvartira", "Yotoqxona xonasi", "Hovli uy", "Talabalar турар joyi"];
const GENDERS = ["Aralash", "Faqat qizlar", "Faqat o'g'il bolalar"];

const DESCRIPTIONS = [
  "Xonadon universitetga piyoda 5 daqiqa masofada. Barcha mebel va texnikalar mavjud. Issiq suv va isitish yil davomida uzluksiz ishlaydi.",
  "Zamonaviy ta'mir qilingan, yorug' va keng xona. Atrofda supermarket, dorixona va avtobus bekatlar joylashgan.",
  "Sokin va xavfsiz mahallada joylashgan. Kuchli Wi-Fi, oshxona va kir yuvish mashinasi bilan ta'minlangan.",
  "Iqtisodiy narxda yuqori sifatli ijara. Sport maydoni va kitobxona yaqin. Transport qulay.",
  "Yangi ta'mirlangan, to'liq jihozlangan kvartira. Ko'chada mashina qo'yish joyi bor. Qo'shnilar juda yaxshi.",
  "Talabalar uchun maxsus ajratilgan qavat. Xavfsizlik 24 soat. Barcha qulayliklar o'z joyida.",
  "Uydan universitetgacha 10 daqiqalik velosiped yo'li. Balkon va yaxshi manzara mavjud.",
];

const AMENITY_POOLS = [
  [
    { id: 1, name: "Yuqori tezlikdagi Wi-Fi" },
    { id: 2, name: "Kir yuvish mashinasi" },
    { id: 3, name: "Isitish tizimi" },
    { id: 4, name: "Konditsioner" },
  ],
  [
    { id: 1, name: "Wi-Fi (100 Mbps)" },
    { id: 2, name: "Oshxona anjomlari" },
    { id: 3, name: "Xavfsizlik 24/7" },
    { id: 4, name: "Liftli bino" },
  ],
  [
    { id: 1, name: "Yuqori tezlikdagi internet" },
    { id: 2, name: "Muzlatgich" },
    { id: 3, name: "Issiq suv (uzluksiz)" },
    { id: 4, name: "Kir yuvish mashinasi" },
    { id: 5, name: "Sport maydoni" },
  ],
  [
    { id: 1, name: "Wi-Fi" },
    { id: 2, name: "Konditsioner" },
    { id: 3, name: "Oshxona" },
    { id: 4, name: "Balkon" },
    { id: 5, name: "Xavfsizlik kamera" },
    { id: 6, name: "Avtoulov joyi" },
  ],
];

// Build image arrays using picsum.photos CDN (deterministic — seed = listing id * 10 + index)
const buildImages = (listingId) => [
  `https://picsum.photos/seed/${listingId * 10 + 1}/800/600`,
  `https://picsum.photos/seed/${listingId * 10 + 2}/800/600`,
  `https://picsum.photos/seed/${listingId * 10 + 3}/800/600`,
  `https://picsum.photos/seed/${listingId * 10 + 4}/800/600`,
];

// Export IMAGES array for backwards compat references
export const IMAGES = [
  `https://picsum.photos/seed/10/800/600`,
  `https://picsum.photos/seed/20/800/600`,
  `https://picsum.photos/seed/30/800/600`,
  `https://picsum.photos/seed/40/800/600`,
  `https://picsum.photos/seed/50/800/600`,
  `https://picsum.photos/seed/60/800/600`,
  `https://picsum.photos/seed/70/800/600`,
];

export const MOCK_LISTINGS = [];

let idCounter = 1;

CITIES_DATA.forEach((city) => {
  for (let i = 0; i < 20; i++) {
    const id = idCounter++;
    // Deterministic coordinate offset using city hash + index
    const cityHash = city.slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const latOffset = ((cityHash * (i + 1)) % 800 - 400) / 10000;
    const lngOffset = ((cityHash * (i + 7)) % 800 - 400) / 10000;

    const district = city.districts[i % city.districts.length];
    const university = city.universities[i % city.universities.length];
    const title = TITLES[i % TITLES.length];
    const type = TYPES[i % TYPES.length];
    const gender = GENDERS[i % GENDERS.length];
    const price = (800 + ((cityHash + i * 37) % 2200)) * 1000;
    const rooms = (i % 3) + 1;
    const distToUni = 400 + ((cityHash * i) % 2800);
    const description = DESCRIPTIONS[(cityHash + i) % DESCRIPTIONS.length];
    const amenities = AMENITY_POOLS[(cityHash + i) % AMENITY_POOLS.length];

    MOCK_LISTINGS.push({
      id,
      name: `${title} — ${district}`,
      city: city.slug,
      city_name: city.cityName,
      address: `${city.cityName}, ${district} tumani`,
      district,
      university,
      min_price: price,
      rooms,
      type,
      gender,
      description,
      amenities,
      main_image: `https://picsum.photos/seed/${id * 10}/800/600`,
      images: buildImages(id).map((img, idx) => ({ id: idx, image: img })),
      latitude: parseFloat((city.lat + latOffset).toFixed(6)),
      longitude: parseFloat((city.lng + lngOffset).toFixed(6)),
      distance_to_uni: distToUni,
    });
  }
});
