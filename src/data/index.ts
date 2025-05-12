import { v4 as uuid } from "uuid";
import { IForm, IProduct } from "../interface";

// export const ProductList: IProduct[] = [
//   {
//     id: uuid(),
//     title: "201 ford :mustang",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis repudiandae a, qui dicta tempora ea autem expedita aperiam voluptas ratione voluptatem odio voluptates architecto error amet maiores, perferendis odit! Quibusdam, dolore harum laudantium hic nostrum nulla reiciendis eos. Ipsam possimus ad id itaque quis tempore dicta culpa consequuntur officia, asperiores sed aspernatur odio nesciunt vel praesentium laudantium, nulla adipisci cupiditate. Cumque exercitationem veritatis adipisci ab maxime consectetur, atque voluptates voluptatem in laborum iusto aspernatur nobis fugiat officia magni dolore provident consequuntur inventore et sunt! Molestias laboriosam deleniti commodi repudiandae. Animi cumque unde dolorum harum vero neque temporibus, cum dicta explicabo.",
//     imageURL: "https://images5.alphacoders.com/113/thumb-1920-1137518.jpg",
//     price: "50,000$",
//     colors: ["#ff002", "#2563eb", "#ff6E31"],
//     category: {
//       name: "cars",
//       imageURL: "https://images5.alphacoders.com/113/thumb-1920-1137518.jpg",
//     },
//   },
//   {
//     id: uuid(),
//     title: "202 ford :mustang",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis repudiandae a, qui dicta tempora ea autem expedita aperiam voluptas ratione voluptatem odio voluptates architecto error amet maiores, perferendis odit! Quibusdam, dolore harum laudantium hic nostrum nulla reiciendis eos. Ipsam possimus ad id itaque quis tempore dicta culpa consequuntur officia, asperiores sed aspernatur odio nesciunt vel praesentium laudantium, nulla adipisci cupiditate. Cumque exercitationem veritatis adipisci ab maxime consectetur, atque voluptates voluptatem in laborum iusto aspernatur nobis fugiat officia magni dolore provident consequuntur inventore et sunt! Molestias laboriosam deleniti commodi repudiandae. Animi cumque unde dolorum harum vero neque temporibus, cum dicta explicabo.",
//     imageURL: "https://wallpapercave.com/wp/wp3616708.jpg",
//     price: "50,000$",
//     colors: ["#ff002", "#2563eb", "#ff6E31"],
//     category: {
//       name: "cars",
//       imageURL: "https://wallpapercave.com/wp/wp3616708.jpg",
//     },
//   },
//   {
//     id: uuid(),
//     title: "203 ford :mustang",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis repudiandae a, qui dicta tempora ea autem expedita aperiam voluptas ratione voluptatem odio voluptates architecto error amet maiores, perferendis odit! Quibusdam, dolore harum laudantium hic nostrum nulla reiciendis eos. Ipsam possimus ad id itaque quis tempore dicta culpa consequuntur officia, asperiores sed aspernatur odio nesciunt vel praesentium laudantium, nulla adipisci cupiditate. Cumque exercitationem veritatis adipisci ab maxime consectetur, atque voluptates voluptatem in laborum iusto aspernatur nobis fugiat officia magni dolore provident consequuntur inventore et sunt! Molestias laboriosam deleniti commodi repudiandae. Animi cumque unde dolorum harum vero neque temporibus, cum dicta explicabo.",
//     imageURL:
//       "https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/f30-bmw-chromebook-wallpaper.jpg",
//     price: "50,000$",
//     colors: ["#ff002", "#2563eb", "#ff6E31"],
//     category: {
//       name: "cars",
//       imageURL:
//         "https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/f30-bmw-chromebook-wallpaper.jpg",
//     },
//   },

//   {
//     id: uuid(),
//     title: "204 ford :mustang",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis repudiandae a, qui dicta tempora ea autem expedita aperiam voluptas ratione voluptatem odio voluptates architecto error amet maiores, perferendis odit! Quibusdam, dolore harum laudantium hic nostrum nulla reiciendis eos. Ipsam possimus ad id itaque quis tempore dicta culpa consequuntur officia, asperiores sed aspernatur odio nesciunt vel praesentium laudantium, nulla adipisci cupiditate. Cumque exercitationem veritatis adipisci ab maxime consectetur, atque voluptates voluptatem in laborum iusto aspernatur nobis fugiat officia magni dolore provident consequuntur inventore et sunt! Molestias laboriosam deleniti commodi repudiandae. Animi cumque unde dolorum harum vero neque temporibus, cum dicta explicabo.",
//     imageURL: "https://images.hdqwalls.com/wallpapers/bmw-m3-4k-r2.jpg",
//     price: "50,000$",
//     colors: ["#ff002", "#2563eb", "#ff6E31"],
//     category: {
//       name: "cars",
//       imageURL: "https://images.hdqwalls.com/wallpapers/bmw-m3-4k-r2.jpg",
//     },
//   },
//   {
//     id: uuid(),
//     title: "205 ford :mustang",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis repudiandae a, qui dicta tempora ea autem expedita aperiam voluptas ratione voluptatem odio voluptates architecto error amet maiores, perferendis odit! Quibusdam, dolore harum laudantium hic nostrum nulla reiciendis eos. Ipsam possimus ad id itaque quis tempore dicta culpa consequuntur officia, asperiores sed aspernatur odio nesciunt vel praesentium laudantium, nulla adipisci cupiditate. Cumque exercitationem veritatis adipisci ab maxime consectetur, atque voluptates voluptatem in laborum iusto aspernatur nobis fugiat officia magni dolore provident consequuntur inventore et sunt! Molestias laboriosam deleniti commodi repudiandae. Animi cumque unde dolorum harum vero neque temporibus, cum dicta explicabo.",
//     imageURL:
//       "https://images.hdqwalls.com/download/bmw-g82-m4-wr-2560x1440.jpg",
//     price: "50,000$",
//     colors: ["#ff002", "#2563eb", "#ff6E31"],
//     category: {
//       name: "cars",
//       imageURL:
//         "https://images.hdqwalls.com/download/bmw-g82-m4-wr-2560x1440.jpg",
//     },
//   },
//   {
//     id: uuid(),
//     title: "206 ford :mustang",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis repudiandae a, qui dicta tempora ea autem expedita aperiam voluptas ratione voluptatem odio voluptates architecto error amet maiores, perferendis odit! Quibusdam, dolore harum laudantium hic nostrum nulla reiciendis eos. Ipsam possimus ad id itaque quis tempore dicta culpa consequuntur officia, asperiores sed aspernatur odio nesciunt vel praesentium laudantium, nulla adipisci cupiditate. Cumque exercitationem veritatis adipisci ab maxime consectetur, atque voluptates voluptatem in laborum iusto aspernatur nobis fugiat officia magni dolore provident consequuntur inventore et sunt! Molestias laboriosam deleniti commodi repudiandae. Animi cumque unde dolorum harum vero neque temporibus, cum dicta explicabo.",
//     imageURL:
//       "https://wallpapers.com/images/featured/bmw-m8-4k-n2rsab26x20p40f4.jpg",
//     price: "50,000$",
//     colors: ["#ff002", "#2563eb", "#ff6E31"],
//     category: {
//       name: "cars",
//       imageURL:
//         "https://wallpapers.com/images/featured/bmw-m8-4k-n2rsab26x20p40f4.jpg",
//     },
//   },
//   {
//     id: uuid(),
//     title: "207 ford :mustang",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis repudiandae a, qui dicta tempora ea autem expedita aperiam voluptas ratione voluptatem odio voluptates architecto error amet maiores, perferendis odit! Quibusdam, dolore harum laudantium hic nostrum nulla reiciendis eos. Ipsam possimus ad id itaque quis tempore dicta culpa consequuntur officia, asperiores sed aspernatur odio nesciunt vel praesentium laudantium, nulla adipisci cupiditate. Cumque exercitationem veritatis adipisci ab maxime consectetur, atque voluptates voluptatem in laborum iusto aspernatur nobis fugiat officia magni dolore provident consequuntur inventore et sunt! Molestias laboriosam deleniti commodi repudiandae. Animi cumque unde dolorum harum vero neque temporibus, cum dicta explicabo.",
//     imageURL: "https://wallpaperaccess.com/full/10520380.jpg",
//     price: "50,000$",
//     colors: ["#ff002", "#2563eb", "#ff6E31"],
//     category: {
//       name: "cars",
//       imageURL: "https://wallpaperaccess.com/full/10520380.jpg",
//     },
//   },
//   {
//     id: uuid(),
//     title: "208 ford :mustang",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis repudiandae a, qui dicta tempora ea autem expedita aperiam voluptas ratione voluptatem odio voluptates architecto error amet maiores, perferendis odit! Quibusdam, dolore harum laudantium hic nostrum nulla reiciendis eos. Ipsam possimus ad id itaque quis tempore dicta culpa consequuntur officia, asperiores sed aspernatur odio nesciunt vel praesentium laudantium, nulla adipisci cupiditate. Cumque exercitationem veritatis adipisci ab maxime consectetur, atque voluptates voluptatem in laborum iusto aspernatur nobis fugiat officia magni dolore provident consequuntur inventore et sunt! Molestias laboriosam deleniti commodi repudiandae. Animi cumque unde dolorum harum vero neque temporibus, cum dicta explicabo.",
//     imageURL:
//       "http://www.hdcarwallpapers.com/download/bmw_m8_gte_hd-1600x900.jpg",
//     price: "50,000$",
//     colors: ["#ff002", "#2563eb", "#ff6E31"],
//     category: {
//       name: "cars",
//       imageURL:
//         "http://www.hdcarwallpapers.com/download/bmw_m8_gte_hd-1600x900.jpg",
//     },
//   },
//   {
//     id: uuid(),
//     title: "209 ford :mustang",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis repudiandae a, qui dicta tempora ea autem expedita aperiam voluptas ratione voluptatem odio voluptates architecto error amet maiores, perferendis odit! Quibusdam, dolore harum laudantium hic nostrum nulla reiciendis eos. Ipsam possimus ad id itaque quis tempore dicta culpa consequuntur officia, asperiores sed aspernatur odio nesciunt vel praesentium laudantium, nulla adipisci cupiditate. Cumque exercitationem veritatis adipisci ab maxime consectetur, atque voluptates voluptatem in laborum iusto aspernatur nobis fugiat officia magni dolore provident consequuntur inventore et sunt! Molestias laboriosam deleniti commodi repudiandae. Animi cumque unde dolorum harum vero neque temporibus, cum dicta explicabo.",
//     imageURL: "https://wallpapercave.com/wp/wp10602329.jpg",
//     price: "50,000$",
//     colors: ["#ff002", "#2563eb", "#ff6E31"],
//     category: {
//       name: "cars",
//       imageURL: "https://wallpapercave.com/wp/wp10602329.jpg",
//     },
//   },
//   {
//     id: uuid(),
//     title: "2010 ford :mustang",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis repudiandae a, qui dicta tempora ea autem expedita aperiam voluptas ratione voluptatem odio voluptates architecto error amet maiores, perferendis odit! Quibusdam, dolore harum laudantium hic nostrum nulla reiciendis eos. Ipsam possimus ad id itaque quis tempore dicta culpa consequuntur officia, asperiores sed aspernatur odio nesciunt vel praesentium laudantium, nulla adipisci cupiditate. Cumque exercitationem veritatis adipisci ab maxime consectetur, atque voluptates voluptatem in laborum iusto aspernatur nobis fugiat officia magni dolore provident consequuntur inventore et sunt! Molestias laboriosam deleniti commodi repudiandae. Animi cumque unde dolorum harum vero neque temporibus, cum dicta explicabo.",
//     imageURL:
//       "https://images.hdqwalls.com/download/bmw-gt-in-rain-4k-k6-1920x1080.jpg",
//     price: "50,000$",
//     colors: ["#ff002", "#2563eb", "#ff6E31"],
//     category: {
//       name: "cars",
//       imageURL:
//         "https://images.hdqwalls.com/download/bmw-gt-in-rain-4k-k6-1920x1080.jpg",
//     },
//   },
//   {
//     id: uuid(),
//     title: "2011 ford :mustang",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis repudiandae a, qui dicta tempora ea autem expedita aperiam voluptas ratione voluptatem odio voluptates architecto error amet maiores, perferendis odit! Quibusdam, dolore harum laudantium hic nostrum nulla reiciendis eos. Ipsam possimus ad id itaque quis tempore dicta culpa consequuntur officia, asperiores sed aspernatur odio nesciunt vel praesentium laudantium, nulla adipisci cupiditate. Cumque exercitationem veritatis adipisci ab maxime consectetur, atque voluptates voluptatem in laborum iusto aspernatur nobis fugiat officia magni dolore provident consequuntur inventore et sunt! Molestias laboriosam deleniti commodi repudiandae. Animi cumque unde dolorum harum vero neque temporibus, cum dicta explicabo.",
//     imageURL: "https://wallpaperaccess.com/full/1600757.jpg",
//     price: "50,000$",
//     colors: ["#ff002", "#2563eb", "#ff6E31"],
//     category: {
//       name: "cars",
//       imageURL: "https://wallpaperaccess.com/full/1600757.jpg",
//     },
//   },
//   {
//     id: uuid(),
//     title: "2012 ford :mustang",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis repudiandae a, qui dicta tempora ea autem expedita aperiam voluptas ratione voluptatem odio voluptates architecto error amet maiores, perferendis odit! Quibusdam, dolore harum laudantium hic nostrum nulla reiciendis eos. Ipsam possimus ad id itaque quis tempore dicta culpa consequuntur officia, asperiores sed aspernatur odio nesciunt vel praesentium laudantium, nulla adipisci cupiditate. Cumque exercitationem veritatis adipisci ab maxime consectetur, atque voluptates voluptatem in laborum iusto aspernatur nobis fugiat officia magni dolore provident consequuntur inventore et sunt! Molestias laboriosam deleniti commodi repudiandae. Animi cumque unde dolorum harum vero neque temporibus, cum dicta explicabo.",
//     imageURL:
//       "https://www.hdcarwallpapers.com/download/2018_bmw_m8_gte_4k_2-1920x1080.jpg",
//     price: "50,000$",
//     colors: ["#ff002", "#2563eb", "#ff6E31"],
//     category: {
//       name: "cars",
//       imageURL:
//         "https://www.hdcarwallpapers.com/download/2018_bmw_m8_gte_4k_2-1920x1080.jpg",
//     },
//   },
//   {
//     id: uuid(),
//     title: "2013 ford :mustang",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis repudiandae a, qui dicta tempora ea autem expedita aperiam voluptas ratione voluptatem odio voluptates architecto error amet maiores, perferendis odit! Quibusdam, dolore harum laudantium hic nostrum nulla reiciendis eos. Ipsam possimus ad id itaque quis tempore dicta culpa consequuntur officia, asperiores sed aspernatur odio nesciunt vel praesentium laudantium, nulla adipisci cupiditate. Cumque exercitationem veritatis adipisci ab maxime consectetur, atque voluptates voluptatem in laborum iusto aspernatur nobis fugiat officia magni dolore provident consequuntur inventore et sunt! Molestias laboriosam deleniti commodi repudiandae. Animi cumque unde dolorum harum vero neque temporibus, cum dicta explicabo.",
//     imageURL:
//       "https://i.pinimg.com/originals/f5/37/7b/f5377b27147b743d715db0234520b8ff.jpg",
//     price: "50,000$",
//     colors: ["#ff002", "#2563eb", "#ff6E31"],
//     category: {
//       name: "cars",
//       imageURL:
//         "https://i.pinimg.com/originals/f5/37/7b/f5377b27147b743d715db0234520b8ff.jpg",
//     },
//   },
// ];

// export const FormList: IForm[] = [
//   {
//     id: "title",
//     name: "title",
//     label: "Product Title",
//     type: "text",
//   },
//   {
//     id: "description",
//     name: "description",
//     label: "Product Description",
//     type: "text",
//   },
//   {
//     id: "image",
//     name: "imageURL",
//     label: "Product Image URL",
//     type: "text",
//   },
//   {
//     id: "price",
//     name: "price",
//     label: "Product Price",
//     type: "text",
//   },
// ];

// export const Colors: string[] = [
//   "#FF0000", // Red
//   "#00FF00", // Green
//   "#0000FF", // Blue
//   "#FFFF00", // Yellow
//   "#FF00FF", // Magenta
//   "#00FFFF", // Cyan
//   "#000000", // Black
//   "#FFA500", // Orange
//   "#800080", // Purple
//   "#008000", // Dark Green
//   "#FFC0CB", // Pink
//   "#A52A2A", // Brown
//   "#808080", // Gray
//   "#FFD700", // Gold
//   "#C0C0C0", // Silver
// ];

// import { v4 as uuid } from "uuid";
// import { IForm, IProduct } from "../interface";

// export const ProductList: IProduct[] = [
//   {
//     id: uuid(),
//     title: "Nike Air Force 1",
//     description:
//       "Classic black Nike sneakers with premium leather.",
//     imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/nike-air-force-1-black.png",
//     price: "120$",
//     colors: ["#000000"],
//     category: {
//       name: "shoes",
//       imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/nike-air-force-1-black.png",
//     },
//   },
//   {
//     id: uuid(),
//     title: "Adidas Ultraboost White",
//     description:
//       "Comfortable white Adidas Ultraboost running shoes.",
//     imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/adidas-ultraboost-white.png",
//     price: "140$",
//     colors: ["#ffffff"],
//     category: {
//       name: "shoes",
//       imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/adidas-ultraboost-white.png",
//     },
//   },
//   {
//     id: uuid(),
//     title: "Puma RS-X Red",
//     description:
//       "Bold red Puma RS-X with a modern design.",
//     imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/puma-rsx-red.png",
//     price: "100$",
//     colors: ["#f9423a"],
//     category: {
//       name: "shoes",
//       imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/puma-rsx-red.png",
//     },
//   },
//   {
//     id: uuid(),
//     title: "Nike Air Max Gold",
//     description:
//       "Stylish gold Nike Air Max for standout fashion.",
//     imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/nike-air-max-gold.png",
//     price: "160$",
//     colors: ["#ffd700"],
//     category: {
//       name: "shoes",
//       imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/nike-air-max-gold.png",
//     },
//   },
//   {
//     id: uuid(),
//     title: "Adidas Originals Navy",
//     description:
//       "Iconic Adidas sneakers in navy blue.",
//     imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/adidas-originals-navy.png",
//     price: "110$",
//     colors: ["#0c1466"],
//     category: {
//       name: "shoes",
//       imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/adidas-originals-navy.png",
//     },
//   },
//   {
//     id: uuid(),
//     title: "Puma Suede Orange",
//     description:
//       "Classic Puma suede sneakers in vibrant orange.",
//     imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/puma-suede-orange.png",
//     price: "95$",
//     colors: ["#ff6600"],
//     category: {
//       name: "shoes",
//       imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/puma-suede-orange.png",
//     },
//   },
//   {
//     id: uuid(),
//     title: "Nike Revolution Green",
//     description:
//       "Eco-friendly green Nike Revolution sneakers.",
//     imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/nike-revolution-green.png",
//     price: "90$",
//     colors: ["#00cc00"],
//     category: {
//       name: "shoes",
//       imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/nike-revolution-green.png",
//     },
//   },
//   {
//     id: uuid(),
//     title: "Adidas ZX Bright Red",
//     description:
//       "Energetic bright red Adidas ZX for runners.",
//     imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/adidas-zx-red.png",
//     price: "130$",
//     colors: ["#ff0000"],
//     category: {
//       name: "shoes",
//       imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/adidas-zx-red.png",
//     },
//   },
//   {
//     id: uuid(),
//     title: "Puma Future Rider Grey",
//     description:
//       "Sporty grey Puma Future Rider for daily wear.",
//     imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/puma-future-rider-grey.png",
//     price: "85$",
//     colors: ["#a1a1a1"],
//     category: {
//       name: "shoes",
//       imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/puma-future-rider-grey.png",
//     },
//   },
//   {
//     id: uuid(),
//     title: "Nike Dunk Low Dark Grey",
//     description:
//       "Chic and minimal dark grey Nike Dunks.",
//     imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/nike-dunk-low-dark-grey.png",
//     price: "125$",
//     colors: ["#333333"],
//     category: {
//       name: "shoes",
//       imageURL: "https://raw.githubusercontent.com/abohashish/sneaker-images/main/nike-dunk-low-dark-grey.png",
//     },
//   },
  
// ];



export const ProductList: IProduct[] = [
  {
    id: uuid(),
    title: "Nike Air Max 270",
    description: "Ultra-comfortable lifestyle sneakers with Max Air cushioning for all-day comfort. Breathable mesh upper with synthetic overlays for support.",
    imageURL: "https://www.streetshoesaddict.com/5051/nike-air-max-270-blanc.jpg",
    price: "150$",
    colors: ["#FF0000", "#000000", "#FFFFFF"],
    category: {
      name: "Running",
      imageURL: "https://www.streetshoesaddict.com/5051/nike-air-max-270-blanc.jpg",
    },
  },
  {
    id: uuid(),
    title: "Adidas Ultraboost 22",
    description: "Responsive running shoes with energy-returning cushioning. Primeknit+ adaptive fit hugs your foot for superior comfort during long runs.",
    imageURL: "https://i.ebayimg.com/images/g/g5YAAOSwTxJj6jYS/s-l1200.jpg",
    price: "180$",
    colors: ["#0000FF", "#00FF00", "#F0F0F0"],
    category: {
      name: "Running",
      imageURL: "https://i.ebayimg.com/images/g/g5YAAOSwTxJj6jYS/s-l1200.jpg",
    },
  },
  {
    id: uuid(),
    title: "Puma RS-X Bold",
    description: "Chunky sneakers with retro-inspired design. Features RS (Running System) cushioning technology for superior comfort and shock absorption.",
    imageURL: "https://smoothitalia.com/wp-content/uploads/2019/08/puma-rs-x-bold-sneakers-white-high-rise-royal-lilac.jpg",
    price: "110$",
    colors: ["#FFA500", "#800080", "#FFFF00"],
    category: {
      name: "Casual",
      imageURL: "https://smoothitalia.com/wp-content/uploads/2019/08/puma-rs-x-bold-sneakers-white-high-rise-royal-lilac.jpg",
    },
  },
  {
    id: uuid(),
    title: "Vans Old Skool",
    description: "Classic skate shoes with durable canvas upper and signature side stripe. Reinforced toe caps and vulcanized soles for board feel.",
    imageURL: "https://cdn.salla.sa/jqbAy/nF1gObXYtOdX3HyN52jXMY4KFXEbPgpjdBQJu6s0.png",
    price: "65$",
    colors: ["#000000", "#FF0000", "#964B00"],
    category: {
      name: "Skate",
      imageURL: "https://cdn.salla.sa/jqbAy/nF1gObXYtOdX3HyN52jXMY4KFXEbPgpjdBQJu6s0.png",
    },
  },
  {
    id: uuid(),
    title: "Converse Chuck Taylor All Star",
    description: "Iconic high-top sneakers with canvas upper and rubber toe cap. Ortholite insole for added comfort and moisture management.",
    imageURL: "https://i.ebayimg.com/images/g/0-cAAOSw3BtlHx1B/s-l1200.jpg",
    price: "55$",
    colors: ["#FFFFFF", "#000000", "#FF0000"],
    category: {
      name: "Casual",
      imageURL: "https://i.ebayimg.com/images/g/0-cAAOSw3BtlHx1B/s-l1200.jpg",
    },
  },
  {
    id: uuid(),
    title: "New Balance 574",
    description: "Classic heritage running shoes with ENCAP midsole technology. Durable suede and mesh upper with breathable perforations.",
    imageURL: "https://cdn.shopify.com/s/files/1/2358/2817/files/new-balance-574-grey-white-20224.png?v=1698241059",
    price: "85$",
    colors: ["#A0522D", "#808080", "#000000"],
    category: {
      name: "Lifestyle",
      imageURL: "https://cdn.shopify.com/s/files/1/2358/2817/files/new-balance-574-grey-white-20224.png?v=1698241059",
    },
  },
  {
    id: uuid(),
    title: "Reebok Club C 85",
    description: "Vintage tennis shoes with clean leather upper and cushioned footbed. Classic design with modern comfort technology.",
    imageURL: "https://www.story.capetown/cdn/shop/files/ReebokxJJJJoundClubC851.png?v=1728654818",
    price: "75$",
    colors: ["#FFFFFF", "#008000", "#0000FF"],
    category: {
      name: "Tennis",
      imageURL: "https://www.story.capetown/cdn/shop/files/ReebokxJJJJoundClubC851.png?v=1728654818",
    },
  },
  {
    id: uuid(),
    title: "Jordan 1 Retro High",
    description: "Legendary basketball shoes with premium leather construction. Air-Sole unit in heel for lightweight cushioning and impact protection.",
    imageURL: "https://cdn.shopify.com/s/files/1/2358/2817/products/air-jordan-1-retro-high-85-og-black-white-1.png?v=1676450597",
    price: "170$",
    colors: ["#FF0000", "#000000", "#FFFFFF"],
    category: {
      name: "Basketball",
      imageURL: "https://cdn.shopify.com/s/files/1/2358/2817/products/air-jordan-1-retro-high-85-og-black-white-1.png?v=1676450597",
    },
  },
  {
    id: uuid(),
    title: "Asics Gel-Kayano 28",
    description: "Stability running shoes with FF BLAST™ cushioning technology. Engineered mesh upper provides breathability and support.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNFr-uYsLEMkOed5I4vL-EXDQzOd7rhhHtnQ&s",
    price: "160$",
    colors: ["#0000FF", "#FF0000", "#00FF00"],
    category: {
      name: "Running",
      imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNFr-uYsLEMkOed5I4vL-EXDQzOd7rhhHtnQ&s",
    },
  },
  {
    id: uuid(),
    title: "Under Armour HOVR Phantom",
    description: "Connected running shoes with HOVR cushioning that reduces impact. Energy web contains HOVR foam to give back the energy you put in.",
    imageURL: "https://cdn.shopify.com/s/files/1/0267/2315/6143/files/s7.3026582-003_DEFAULT_1000x1000.png.webp?width=500&width=100&crop=center",
    price: "140$",
    colors: ["#000000", "#808080", "#FFA500"],
    category: {
      name: "Running",
      imageURL: "https://cdn.shopify.com/s/files/1/0267/2315/6143/files/s7.3026582-003_DEFAULT_1000x1000.png.webp?width=500&width=100&crop=center",
    },
  },
  {
    id: uuid(),
    title: "Salomon Speedcross 5",
    description: "Trail running shoes with aggressive grip for technical terrain. Quicklace system for secure fit and SensiFit™ technology for precision.",
    imageURL: "https://laboutiquedulac.com/cdn/shop/files/L47465700_0_GHO_SPEEDCROSS6GTXW_Moonscape_Black_BirdOfParadise.png?v=1741102956",
    price: "130$",
    colors: ["#008000", "#000000", "#FF0000"],
    category: {
      name: "Trail",
      imageURL: "https://laboutiquedulac.com/cdn/shop/files/L47465700_0_GHO_SPEEDCROSS6GTXW_Moonscape_Black_BirdOfParadise.png?v=1741102956",
    },
  },
  {
    id: uuid(),
    title: "Hoka One One Bondi 7",
    description: "Maximum cushion running shoes with early-stage Meta-Rocker geometry. Full-compression EVA midsole provides plush cushioning.",
    imageURL: "https://dms.deckers.com/image/upload/q_auto:eco/wyli-bondi-7-m_2x.png",
    price: "150$",
    colors: ["#FFFFFF", "#0000FF", "#FF00FF"],
    category: {
      name: "Running",
      imageURL: "https://dms.deckers.com/image/upload/q_auto:eco/wyli-bondi-7-m_2x.png",
    },
  },
  {
    id: uuid(),
    title: "Brooks Ghost 14",
    description: "Neutral running shoes with DNA LOFT cushioning for soft feel. Segmented crash pad for smooth heel-to-toe transitions.",
    imageURL: "https://www.brooksrunning.com/on/demandware.static/-/Sites-brooks-master-catalog/default/dwd55d30df/original/110369/110369-488-l-ghost-14-mens-neutral-cushion-running-shoe.png",
    price: "140$",
    colors: ["#000000", "#800080", "#00FFFF"],
    category: {
      name: "Running",
      imageURL: "https://www.brooksrunning.com/on/demandware.static/-/Sites-brooks-master-catalog/default/dwd55d30df/original/110369/110369-488-l-ghost-14-mens-neutral-cushion-running-shoe.png",
    },
  }
];


// FormList remains unchanged as per your request
export const FormList: IForm[] = [
  {
    id: "title",
    name: "title",
    label: "Product Title",
    type: "text",
  },
  {
    id: "description",
    name: "description",
    label: "Product Description",
    type: "text",
  },
  {
    id: "image",
    name: "imageURL",
    label: "Product Image URL",
    type: "text",
  },
  {
    id: "price",
    name: "price",
    label: "Product Price",
    type: "text",
  },
];

// Color options updated to match shoe colorways

export const Colors: string[] = [
  "#000000", // Black
  "#FF00FF", // Magenta
  "#ff0000", // Red
  "#1e3a8a", // Adidas Navy
  "#d1d5db", // Light Grey
  "#00ffff", // Cyan
  "#ff6e31", // Orange
  "#111827", // Dark Slate
  "#a52a2a", // Brown
  "#808080", // Grey
  "#c0c0c0", // Silver
  "#00FF00", // Green
  "#0000FF", // Blue
  "#800080", // Purple
  "#008000", // Dark Green
];