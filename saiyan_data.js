// This is our new, image-aware database for Saiyandle.
const ALL_CHARACTERS = [
  {
    "name": "GOKU", "race": "SAIYAN", "firstSaga": "SAIYAN_SAGA", "allegiance": "Z_FIGHTER", "powerTier": 5, "hasTail": "YES",
    "image_url": "https://static.wikia.nocookie.net/dragonball/images/3/30/Goku_profil_DBZ.png"
  },
  {
    "name": "VEGETA", "race": "SAIYAN", "firstSaga": "SAIYAN_SAGA", "allegiance": "Z_FIGHTER", "powerTier": 5, "hasTail": "YES",
    "image_url": "https://static.wikia.nocookie.net/dragonball/images/8/87/Vegeta_profil_DBZ.png"
  },
  {
    "name": "GOHAN", "race": "SAIYAN_HYBRID", "firstSaga": "SAIYAN_SAGA", "allegiance": "Z_FIGHTER", "powerTier": 5, "hasTail": "YES",
    "image_url": "https://static.wikia.nocookie.net/dragonball/images/d/d4/Gohan_profil_DBZ.png"
  },
  {
    "name": "KRILLIN", "race": "HUMAN", "firstSaga": "SAIYAN_SAGA", "allegiance": "Z_FIGHTER", "powerTier": 2, "hasTail": "NO",
    "image_url": "https://static.wikia.nocookie.net/dragonball/images/2/2a/Krillin_profil_DBZ.png"
  },
  {
    "name": "PICCOLO", "race": "NAMEKIAN", "firstSaga": "SAIYAN_SAGA", "allegiance": "Z_FIGHTER", "powerTier": 4, "hasTail": "NO",
    "image_url": "https://static.wikia.nocookie.net/dragonball/images/4/45/Piccolo_profil_DBZ.png"
  },
  {
    "name": "FRIEZA", "race": "FRIEZA_RACE", "firstSaga": "FRIEZA_SAGA", "allegiance": "VILLAIN", "powerTier": 4, "hasTail": "YES",
    "image_url": "https://static.wikia.nocookie.net/dragonball/images/2/23/Frieza_profil_DBZ.png"
  },
  {
    "name": "CELL", "race": "BIO_ANDROID", "firstSaga": "CELL_SAGA", "allegiance": "VILLAIN", "powerTier": 5, "hasTail": "YES",
    "image_url": "https://static.wikia.nocookie.net/dragonball/images/e/e5/Cell_profil_DBZ.png"
  },
  {
    "name": "MAJIN_BUU", "race": "MAJIN", "firstSaga": "BUU_SAGA", "allegiance": "VILLAIN", "powerTier": 5, "hasTail": "NO",
    "image_url": "https://static.wikia.nocookie.net/dragonball/images/0/03/Majin_Buu_profil_DBZ.png"
  },
  {
    "name": "TRUNKS", "race": "SAIYAN_HYBRID", "firstSaga": "CELL_SAGA", "allegiance": "Z_FIGHTER", "powerTier": 4, "hasTail": "NO",
    "image_url": "https://static.wikia.nocookie.net/dragonball/images/b/b5/Future_Trunks_profil_DBZ.png"
  },
  {
    "name": "ANDROID_18", "race": "ANDROID", "firstSaga": "CELL_SAGA", "allegiance": "Z_FIGHTER", "powerTier": 4, "hasTail": "NO",
    "image_url": "https://static.wikia.nocookie.net/dragonball/images/3/30/Android_18_profil_DBZ.png"
  },
  {
    "name": "YAMCHA", "race": "HUMAN", "firstSaga": "SAIYAN_SAGA", "allegiance": "Z_FIGHTER", "powerTier": 2, "hasTail": "NO",
    "image_url": "https://static.wikia.nocookie.net/dragonball/images/d/d7/Yamcha_profil_DBZ.png"
  },
  {
    "name": "TIEN", "race": "HUMAN_HYBRID", "firstSaga": "SAIYAN_SAGA", "allegiance": "Z_FIGHTER", "powerTier": 3, "hasTail": "NO",
    "image_url": "https://static.wikia.nocookie.net/dragonball/images/d/d8/Tien_Shinhan_profil_DBZ.png"
  },
  {
    "name": "CAPTAIN_GINYU", "race": "UNKNOWN", "firstSaga": "FRIEZA_SAGA", "allegiance": "VILLAIN", "powerTier": 3, "hasTail": "NO",
    "image_url": "https://static.wikia.nocookie.net/dragonball/images/4/4e/Ginyu_profil_DBZ.png"
  }
];