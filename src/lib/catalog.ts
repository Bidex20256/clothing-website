import { img } from "./images";

export type CatalogProduct = {
  name: string;
  slug: string;
  description: string;
  price: number;
  promoPrice?: number;
  image: string;
  sizes: string[];
  colors: string[];
  category: "tops" | "bottoms" | "dresses" | "outerwear" | "accessories";
  ageGroup: "teenagers" | "youths" | "adults";
  popularity: number;
  isNew: boolean;
  isPromo: boolean;
};

function p(item: CatalogProduct) {
  return {
    name: item.name,
    slug: item.slug,
    description: item.description,
    price: item.price,
    ...(item.promoPrice ? { promoPrice: item.promoPrice } : {}),
    images: JSON.stringify([item.image]),
    sizes: JSON.stringify(item.sizes),
    colors: JSON.stringify(item.colors),
    category: item.category,
    ageGroup: item.ageGroup,
    popularity: item.popularity,
    isNew: item.isNew,
    isPromo: item.isPromo,
  };
}

// ─── TEENAGERS ───────────────────────────────────────────────
const teenagerTops: CatalogProduct[] = [
  { name: "Oversized Graphic Hoodie", slug: "teen-oversized-hoodie-m", description: "Relaxed-fit fleece hoodie for everyday school and street style.", price: 11500, image: img("photo-1556821840-3a63f95609a7"), sizes: ["S", "M", "L", "XL"], colors: ["Charcoal", "Black"], category: "tops", ageGroup: "teenagers", popularity: 92, isNew: true, isPromo: false },
  { name: "Classic Crew Neck Tee", slug: "teen-crew-tee-m", description: "Soft cotton tee with a clean fit — a wardrobe essential for teen boys.", price: 4500, image: img("photo-1521572163474-6864f9cf17ab"), sizes: ["S", "M", "L", "XL"], colors: ["White", "Black", "Navy"], category: "tops", ageGroup: "teenagers", popularity: 88, isNew: false, isPromo: false },
  { name: "Striped Polo Shirt", slug: "teen-striped-polo-m", description: "Smart-casual striped polo perfect for school and weekends.", price: 6800, image: img("photo-1596755094514-f87e34085b56"), sizes: ["S", "M", "L"], colors: ["Navy", "White"], category: "tops", ageGroup: "teenagers", popularity: 75, isNew: false, isPromo: false },
  { name: "Cropped Rib Tank", slug: "teen-cropped-tank-f", description: "Trendy ribbed crop tank for layering or warm-weather outfits.", price: 3800, image: img("photo-1564251369721-208d14dd8055"), sizes: ["XS", "S", "M"], colors: ["White", "Blush", "Black"], category: "tops", ageGroup: "teenagers", popularity: 90, isNew: true, isPromo: false },
  { name: "Butterfly Sleeve Blouse", slug: "teen-butterfly-blouse-f", description: "Lightweight blouse with flutter sleeves — feminine and fresh.", price: 7200, image: img("photo-1434389677669-e08b4cac3105"), sizes: ["XS", "S", "M", "L"], colors: ["Cream", "Lavender"], category: "tops", ageGroup: "teenagers", popularity: 86, isNew: true, isPromo: false },
  { name: "Varsity Logo Sweatshirt", slug: "teen-varsity-sweat-m", description: "Campus-inspired sweatshirt with bold chest graphic.", price: 9800, image: img("photo-1576566588028-4147f3842f27"), sizes: ["S", "M", "L", "XL"], colors: ["Grey", "Navy"], category: "tops", ageGroup: "teenagers", popularity: 84, isNew: false, isPromo: true, promoPrice: 7900 },
];

const teenagerBottoms: CatalogProduct[] = [
  { name: "Slim Fit Denim Jeans", slug: "teen-slim-jeans-m", description: "Classic slim denim with stretch for all-day comfort.", price: 9500, image: img("photo-1542272604-787c683553e0"), sizes: ["28", "30", "32", "34"], colors: ["Indigo", "Black"], category: "bottoms", ageGroup: "teenagers", popularity: 91, isNew: false, isPromo: false },
  { name: "Cargo Jogger Pants", slug: "teen-cargo-joggers-m", description: "Utility pockets and tapered leg — streetwear ready.", price: 10200, image: img("photo-1624378515199-75dbbefe4ff3"), sizes: ["S", "M", "L", "XL"], colors: ["Khaki", "Olive", "Black"], category: "bottoms", ageGroup: "teenagers", popularity: 89, isNew: true, isPromo: false },
  { name: "Pleated Mini Skirt", slug: "teen-pleated-skirt-f", description: "Preppy pleated skirt that pairs with tees and hoodies.", price: 6500, image: img("photo-1583496669740-3485d9fbf1ae"), sizes: ["XS", "S", "M"], colors: ["Navy", "Black", "Plaid"], category: "bottoms", ageGroup: "teenagers", popularity: 93, isNew: true, isPromo: false },
  { name: "High-Waist Wide Leg Pants", slug: "teen-wide-leg-pants-f", description: "Flowy high-waist pants with a modern silhouette.", price: 8800, image: img("photo-1594633313590-b0f3eebcd3d1"), sizes: ["XS", "S", "M", "L"], colors: ["Black", "Beige"], category: "bottoms", ageGroup: "teenagers", popularity: 87, isNew: false, isPromo: false },
  { name: "Athletic Track Pants", slug: "teen-track-pants-m", description: "Lightweight track pants with side stripes for sport and lounge.", price: 7800, image: img("photo-1473966968600-fa801b869a78"), sizes: ["S", "M", "L", "XL"], colors: ["Black", "Navy"], category: "bottoms", ageGroup: "teenagers", popularity: 82, isNew: false, isPromo: false },
  { name: "Distressed Denim Shorts", slug: "teen-denim-shorts-f", description: "Summer-ready distressed shorts with a relaxed fit.", price: 5800, promoPrice: 4600, image: img("photo-1541099649105-f69ad21f3246"), sizes: ["XS", "S", "M"], colors: ["Light Wash", "Blue"], category: "bottoms", ageGroup: "teenagers", popularity: 85, isNew: false, isPromo: true },
];

const teenagerDresses: CatalogProduct[] = [
  { name: "Floral Sundress", slug: "teen-floral-sundress-f", description: "Bright floral print sundress for parties and picnics.", price: 11200, image: img("photo-1572804013309-616fffb6a0e0"), sizes: ["XS", "S", "M", "L"], colors: ["Floral"], category: "dresses", ageGroup: "teenagers", popularity: 94, isNew: true, isPromo: false },
  { name: "Satin Slip Dress", slug: "teen-satin-slip-f", description: "Elegant satin slip dress for formal events and celebrations.", price: 14500, image: img("photo-1515372039744-b8f02a3ae446"), sizes: ["XS", "S", "M"], colors: ["Champagne", "Black"], category: "dresses", ageGroup: "teenagers", popularity: 91, isNew: true, isPromo: false },
  { name: "Denim Shirt Dress", slug: "teen-denim-shirt-dress-f", description: "Casual denim shirt dress with button front and belt.", price: 10800, image: img("photo-1595777453413-ef3d6d2e0b2a"), sizes: ["XS", "S", "M", "L"], colors: ["Denim"], category: "dresses", ageGroup: "teenagers", popularity: 88, isNew: false, isPromo: false },
  { name: "Tiered Maxi Dress", slug: "teen-tiered-maxi-f", description: "Flowing tiered maxi with bohemian charm.", price: 13200, image: img("photo-1496747611176-843222e1e57c"), sizes: ["XS", "S", "M"], colors: ["White", "Sage"], category: "dresses", ageGroup: "teenagers", popularity: 90, isNew: false, isPromo: false },
  { name: "Knit Bodycon Dress", slug: "teen-knit-bodycon-f", description: "Figure-hugging knit dress for nights out and occasions.", price: 11800, promoPrice: 9900, image: img("photo-1539008835657-9e8e9680c956"), sizes: ["XS", "S", "M"], colors: ["Black", "Burgundy"], category: "dresses", ageGroup: "teenagers", popularity: 86, isNew: false, isPromo: true },
  { name: "Puff Sleeve Mini Dress", slug: "teen-puff-sleeve-mini-f", description: "Romantic puff sleeves and a playful mini length.", price: 10500, image: img("photo-1566174053879-31528523f8ae"), sizes: ["XS", "S", "M"], colors: ["Pink", "White"], category: "dresses", ageGroup: "teenagers", popularity: 92, isNew: true, isPromo: false },
];

const teenagerOuterwear: CatalogProduct[] = [
  { name: "Light Wash Denim Jacket", slug: "teen-denim-jacket-m", description: "Timeless denim jacket for layering over any outfit.", price: 14200, image: img("photo-1576995850633-9663eaa5131b"), sizes: ["S", "M", "L", "XL"], colors: ["Light Wash", "Indigo"], category: "outerwear", ageGroup: "teenagers", popularity: 93, isNew: false, isPromo: false },
  { name: "Puffer Bomber Jacket", slug: "teen-puffer-bomber-m", description: "Warm quilted bomber with ribbed cuffs and hem.", price: 16800, image: img("photo-1551028719-00167b16eac5"), sizes: ["S", "M", "L", "XL"], colors: ["Black", "Olive"], category: "outerwear", ageGroup: "teenagers", popularity: 88, isNew: true, isPromo: false },
  { name: "Oversized Fleece Zip-Up", slug: "teen-fleece-zip-m", description: "Cozy full-zip fleece for cool mornings and evenings.", price: 12500, image: img("photo-1521223890338-42b314a00fed"), sizes: ["S", "M", "L", "XL"], colors: ["Grey", "Navy"], category: "outerwear", ageGroup: "teenagers", popularity: 85, isNew: false, isPromo: false },
  { name: "Cropped Trench Coat", slug: "teen-cropped-trench-f", description: "Modern cropped trench with structured shoulders.", price: 18500, image: img("photo-1539533018447-63fcce267834"), sizes: ["XS", "S", "M"], colors: ["Beige", "Black"], category: "outerwear", ageGroup: "teenagers", popularity: 90, isNew: true, isPromo: false },
  { name: "Wool Blend Peacoat", slug: "teen-peacoat-f", description: "Double-breasted peacoat for polished winter style.", price: 19800, promoPrice: 16500, image: img("photo-1544966503-d8e8fda57722"), sizes: ["XS", "S", "M", "L"], colors: ["Charcoal", "Camel"], category: "outerwear", ageGroup: "teenagers", popularity: 87, isNew: false, isPromo: true },
  { name: "Windbreaker Anorak", slug: "teen-windbreaker-m", description: "Lightweight water-resistant anorak for outdoor adventures.", price: 11200, image: img("photo-1543076447-215a9eea3647"), sizes: ["S", "M", "L"], colors: ["Red", "Black"], category: "outerwear", ageGroup: "teenagers", popularity: 80, isNew: false, isPromo: false },
];

const teenagerAccessories: CatalogProduct[] = [
  { name: "Canvas Crossbody Bag", slug: "teen-canvas-bag", description: "Durable canvas crossbody for school essentials.", price: 5500, image: img("photo-1553062407-98eeb64c6a62"), sizes: ["One Size"], colors: ["Black", "Tan"], category: "accessories", ageGroup: "teenagers", popularity: 84, isNew: false, isPromo: false },
  { name: "Retro Round Sunglasses", slug: "teen-round-sunglasses", description: "UV-protected round frames with a vintage vibe.", price: 4200, image: img("photo-1572635196237-14b3f281503f"), sizes: ["One Size"], colors: ["Gold", "Black"], category: "accessories", ageGroup: "teenagers", popularity: 78, isNew: true, isPromo: false },
  { name: "Leather Strap Watch", slug: "teen-leather-watch", description: "Minimal analog watch with genuine leather strap.", price: 8900, image: img("photo-1523275335684-37898b6baf30"), sizes: ["One Size"], colors: ["Brown", "Black"], category: "accessories", ageGroup: "teenagers", popularity: 82, isNew: false, isPromo: false },
  { name: "Chunky Chain Necklace", slug: "teen-chain-necklace-f", description: "Gold-tone chunky chain — a bold finishing touch.", price: 3500, image: img("photo-1611591436351-75b3e8ab1a1e"), sizes: ["One Size"], colors: ["Gold", "Silver"], category: "accessories", ageGroup: "teenagers", popularity: 88, isNew: true, isPromo: false },
  { name: "Sport Cap", slug: "teen-sport-cap-m", description: "Adjustable cotton cap with embroidered logo.", price: 3200, image: img("photo-1588850561407-ed78c282e89b"), sizes: ["One Size"], colors: ["Black", "Navy", "White"], category: "accessories", ageGroup: "teenagers", popularity: 76, isNew: false, isPromo: false },
  { name: "Mini Backpack", slug: "teen-mini-backpack", description: "Compact backpack with padded straps and front pocket.", price: 7800, promoPrice: 6200, image: img("photo-1584917865442-de89d76adc7e"), sizes: ["One Size"], colors: ["Black", "Pink"], category: "accessories", ageGroup: "teenagers", popularity: 91, isNew: false, isPromo: true },
];

// ─── YOUTHS ───────────────────────────────────────────────
const youthTops: CatalogProduct[] = [
  { name: "Linen Button-Down Shirt", slug: "youth-linen-shirt-m", description: "Breathable linen shirt for smart-casual occasions.", price: 11800, image: img("photo-1602810318383-e386cc2a3f9d"), sizes: ["S", "M", "L", "XL"], colors: ["White", "Sky Blue"], category: "tops", ageGroup: "youths", popularity: 87, isNew: false, isPromo: false },
  { name: "Ribbed Knit Sweater", slug: "youth-rib-knit-m", description: "Cozy rib-knit with a relaxed fit for layering.", price: 14500, image: img("photo-1434389677669-e08b4cac3105"), sizes: ["S", "M", "L", "XL"], colors: ["Cream", "Forest", "Rust"], category: "tops", ageGroup: "youths", popularity: 90, isNew: true, isPromo: false },
  { name: "Oxford Cotton Shirt", slug: "youth-oxford-shirt-m", description: "Crisp oxford cloth shirt — office to weekend.", price: 10200, image: img("photo-1603252109305-30a0b8c9c9d0"), sizes: ["S", "M", "L", "XL"], colors: ["White", "Light Blue"], category: "tops", ageGroup: "youths", popularity: 83, isNew: false, isPromo: false },
  { name: "Silk Blend Camisole", slug: "youth-silk-camisole-f", description: "Luxurious silk-blend cami for evening or layering.", price: 8500, image: img("photo-1564251369721-208d14dd8055"), sizes: ["XS", "S", "M", "L"], colors: ["Champagne", "Black"], category: "tops", ageGroup: "youths", popularity: 88, isNew: true, isPromo: false },
  { name: "Off-Shoulder Crop Top", slug: "youth-off-shoulder-f", description: "Trendy off-shoulder crop for nights out.", price: 6800, image: img("photo-1485968579580-0396b295bd77"), sizes: ["XS", "S", "M"], colors: ["White", "Red"], category: "tops", ageGroup: "youths", popularity: 92, isNew: true, isPromo: false },
  { name: "Graphic Print Tee", slug: "youth-graphic-tee-m", description: "Statement graphic tee with premium cotton construction.", price: 5500, promoPrice: 4400, image: img("photo-1521572163474-6864f9cf17ab"), sizes: ["S", "M", "L", "XL"], colors: ["White", "Black"], category: "tops", ageGroup: "youths", popularity: 85, isNew: false, isPromo: true },
];

const youthBottoms: CatalogProduct[] = [
  { name: "Tapered Cargo Pants", slug: "youth-cargo-pants-m", description: "Multi-pocket cargo pants with a modern tapered leg.", price: 14200, image: img("photo-1624378515199-75dbbefe4ff3"), sizes: ["S", "M", "L", "XL"], colors: ["Khaki", "Black", "Olive"], category: "bottoms", ageGroup: "youths", popularity: 91, isNew: true, isPromo: false },
  { name: "Slim Chino Trousers", slug: "youth-chino-pants-m", description: "Tailored chinos for work and smart casual wear.", price: 12800, image: img("photo-1473966968600-fa801b869a78"), sizes: ["30", "32", "34", "36"], colors: ["Navy", "Tan", "Grey"], category: "bottoms", ageGroup: "youths", popularity: 86, isNew: false, isPromo: false },
  { name: "High-Rise Tailored Trousers", slug: "youth-tailored-trousers-f", description: "Structured high-rise trousers with a flattering cut.", price: 13500, image: img("photo-1594633313590-b0f3eebcd3d1"), sizes: ["XS", "S", "M", "L"], colors: ["Black", "Cream"], category: "bottoms", ageGroup: "youths", popularity: 89, isNew: true, isPromo: false },
  { name: "Relaxed Fit Jeans", slug: "youth-relaxed-jeans-m", description: "Comfortable relaxed denim with a vintage wash.", price: 11500, image: img("photo-1542272604-787c683553e0"), sizes: ["30", "32", "34", "36"], colors: ["Blue", "Black"], category: "bottoms", ageGroup: "youths", popularity: 88, isNew: false, isPromo: false },
  { name: "Satin Midi Skirt", slug: "youth-satin-skirt-f", description: "Elegant satin midi skirt that moves beautifully.", price: 9800, image: img("photo-1583496669740-3485d9fbf1ae"), sizes: ["XS", "S", "M", "L"], colors: ["Emerald", "Black"], category: "bottoms", ageGroup: "youths", popularity: 90, isNew: false, isPromo: false },
  { name: "Jogger Sweatpants", slug: "youth-jogger-pants-m", description: "Premium fleece joggers with elastic cuffs.", price: 8900, promoPrice: 7100, image: img("photo-1506629082955-511b1aa562c8"), sizes: ["S", "M", "L", "XL"], colors: ["Grey", "Black"], category: "bottoms", ageGroup: "youths", popularity: 84, isNew: false, isPromo: true },
];

const youthDresses: CatalogProduct[] = [
  { name: "Wrap Midi Dress", slug: "youth-wrap-midi-f", description: "Flattering wrap dress with a tie waist and midi length.", price: 16800, image: img("photo-1496747611176-843222e1e57c"), sizes: ["XS", "S", "M", "L"], colors: ["Floral", "Navy"], category: "dresses", ageGroup: "youths", popularity: 95, isNew: true, isPromo: false },
  { name: "Cut-Out Evening Dress", slug: "youth-cutout-dress-f", description: "Statement cut-out dress for parties and events.", price: 22500, image: img("photo-1539008835657-9e8e9680c956"), sizes: ["XS", "S", "M"], colors: ["Black", "Red"], category: "dresses", ageGroup: "youths", popularity: 93, isNew: true, isPromo: false },
  { name: "Linen Shift Dress", slug: "youth-linen-shift-f", description: "Effortless linen shift for warm days and brunches.", price: 14200, image: img("photo-1515372039744-b8f02a3ae446"), sizes: ["XS", "S", "M", "L"], colors: ["White", "Sand"], category: "dresses", ageGroup: "youths", popularity: 87, isNew: false, isPromo: false },
  { name: "Sequin Party Dress", slug: "youth-sequin-dress-f", description: "Head-turning sequin mini for celebrations.", price: 19800, promoPrice: 15900, image: img("photo-1566174053879-31528523f8ae"), sizes: ["XS", "S", "M"], colors: ["Gold", "Silver"], category: "dresses", ageGroup: "youths", popularity: 91, isNew: false, isPromo: true },
  { name: "Shirt Dress", slug: "youth-shirt-dress-f", description: "Structured shirt dress with a belted waist.", price: 15500, image: img("photo-1572804013309-616fffb6a0e0"), sizes: ["XS", "S", "M", "L"], colors: ["White", "Stripe"], category: "dresses", ageGroup: "youths", popularity: 88, isNew: false, isPromo: false },
  { name: "Asymmetric Hem Dress", slug: "youth-asymmetric-dress-f", description: "Modern asymmetric hem with a sleek silhouette.", price: 17200, image: img("photo-1595777453413-ef3d6d2e0b2a"), sizes: ["XS", "S", "M"], colors: ["Black", "Burgundy"], category: "dresses", ageGroup: "youths", popularity: 89, isNew: true, isPromo: false },
];

const youthOuterwear: CatalogProduct[] = [
  { name: "Structured Blazer", slug: "youth-blazer-m", description: "Tailored blazer for interviews, events, and date nights.", price: 28500, image: img("photo-1594938298603-c8148c4dae35"), sizes: ["S", "M", "L", "XL"], colors: ["Navy", "Charcoal"], category: "outerwear", ageGroup: "youths", popularity: 90, isNew: false, isPromo: false },
  { name: "Oversized Wool Coat", slug: "youth-wool-coat-f", description: "Long wool coat with a relaxed, fashion-forward fit.", price: 32000, image: img("photo-1539533018447-63fcce267834"), sizes: ["XS", "S", "M", "L"], colors: ["Camel", "Black"], category: "outerwear", ageGroup: "youths", popularity: 92, isNew: true, isPromo: false },
  { name: "Leather Moto Jacket", slug: "youth-leather-jacket-m", description: "Classic moto jacket with asymmetric zip and quilted shoulders.", price: 35800, image: img("photo-1551028719-00167b16eac5"), sizes: ["S", "M", "L", "XL"], colors: ["Black", "Brown"], category: "outerwear", ageGroup: "youths", popularity: 94, isNew: true, isPromo: false },
  { name: "Cropped Denim Jacket", slug: "youth-cropped-denim-f", description: "Cropped denim jacket with a feminine fit.", price: 14800, image: img("photo-1576995850633-9663eaa5131b"), sizes: ["XS", "S", "M"], colors: ["Light Wash"], category: "outerwear", ageGroup: "youths", popularity: 86, isNew: false, isPromo: false },
  { name: "Puffer Vest", slug: "youth-puffer-vest-m", description: "Lightweight insulated vest for transitional weather.", price: 12500, promoPrice: 9900, image: img("photo-1544966503-d8e8fda57722"), sizes: ["S", "M", "L", "XL"], colors: ["Black", "Navy"], category: "outerwear", ageGroup: "youths", popularity: 81, isNew: false, isPromo: true },
  { name: "Trench Coat", slug: "youth-trench-coat-f", description: "Classic double-breasted trench in water-resistant fabric.", price: 29500, image: img("photo-1543076447-215a9eea3647"), sizes: ["XS", "S", "M", "L"], colors: ["Beige", "Black"], category: "outerwear", ageGroup: "youths", popularity: 88, isNew: false, isPromo: false },
];

const youthAccessories: CatalogProduct[] = [
  { name: "Leather Tote Bag", slug: "youth-leather-tote-f", description: "Spacious leather tote for work and everyday carry.", price: 18500, image: img("photo-1584917865442-de89d76adc7e"), sizes: ["One Size"], colors: ["Tan", "Black"], category: "accessories", ageGroup: "youths", popularity: 90, isNew: true, isPromo: false },
  { name: "Aviator Sunglasses", slug: "youth-aviator-sunglasses", description: "Classic aviator frames with polarized lenses.", price: 6500, image: img("photo-1572635196237-14b3f281503f"), sizes: ["One Size"], colors: ["Gold", "Silver"], category: "accessories", ageGroup: "youths", popularity: 85, isNew: false, isPromo: false },
  { name: "Automatic Watch", slug: "youth-automatic-watch-m", description: "Sleek automatic movement watch with steel bracelet.", price: 28500, image: img("photo-1523275335684-37898b6baf30"), sizes: ["One Size"], colors: ["Silver", "Gold"], category: "accessories", ageGroup: "youths", popularity: 88, isNew: false, isPromo: false },
  { name: "Silk Scarf", slug: "youth-silk-scarf-f", description: "Printed silk scarf for hair, neck, or bag styling.", price: 7200, image: img("photo-1601924994987-69e5d25ce237"), sizes: ["One Size"], colors: ["Floral", "Abstract"], category: "accessories", ageGroup: "youths", popularity: 79, isNew: true, isPromo: false },
  { name: "Canvas Sneakers", slug: "youth-canvas-sneakers", description: "Clean canvas sneakers for everyday versatility.", price: 12500, promoPrice: 9900, image: img("photo-1542291026-7eec264c27ff"), sizes: ["40", "41", "42", "43", "44"], colors: ["White", "Black"], category: "accessories", ageGroup: "youths", popularity: 93, isNew: false, isPromo: true },
  { name: "Leather Belt", slug: "youth-leather-belt-m", description: "Full-grain leather belt with brushed buckle.", price: 7500, image: img("photo-1624222247344-550fb60583fd"), sizes: ["S", "M", "L"], colors: ["Brown", "Black"], category: "accessories", ageGroup: "youths", popularity: 82, isNew: false, isPromo: false },
];

// ─── ADULTS ───────────────────────────────────────────────
const adultTops: CatalogProduct[] = [
  { name: "Premium Dress Shirt", slug: "adult-dress-shirt-m", description: "Crisp non-iron dress shirt for boardrooms and events.", price: 14500, image: img("photo-1602810318383-e386cc2a3f9d"), sizes: ["S", "M", "L", "XL", "XXL"], colors: ["White", "Light Blue"], category: "tops", ageGroup: "adults", popularity: 88, isNew: false, isPromo: false },
  { name: "Merino Wool Sweater", slug: "adult-merino-sweater-m", description: "Fine merino crewneck — warm, soft, and refined.", price: 22500, image: img("photo-1576566588028-4147f3842f27"), sizes: ["S", "M", "L", "XL"], colors: ["Navy", "Charcoal", "Burgundy"], category: "tops", ageGroup: "adults", popularity: 91, isNew: true, isPromo: false },
  { name: "Silk Blouse", slug: "adult-silk-blouse-f", description: "Elegant silk blouse with concealed buttons.", price: 19800, image: img("photo-1564251369721-208d14dd8055"), sizes: ["XS", "S", "M", "L", "XL"], colors: ["Ivory", "Blush", "Black"], category: "tops", ageGroup: "adults", popularity: 93, isNew: true, isPromo: false },
  { name: "Cashmere Turtleneck", slug: "adult-cashmere-turtle-f", description: "Luxurious cashmere turtleneck for elevated layering.", price: 28500, image: img("photo-1434389677669-e08b4cac3105"), sizes: ["XS", "S", "M", "L"], colors: ["Camel", "Black", "Cream"], category: "tops", ageGroup: "adults", popularity: 95, isNew: true, isPromo: false },
  { name: "Polo Shirt", slug: "adult-polo-shirt-m", description: "Classic piqué polo with a tailored fit.", price: 9800, image: img("photo-1596755094514-f87e34085b56"), sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Navy", "White", "Forest"], category: "tops", ageGroup: "adults", popularity: 84, isNew: false, isPromo: false },
  { name: "Lace Trim Camisole", slug: "adult-lace-camisole-f", description: "Delicate lace-trim camisole for layering or evening.", price: 11200, promoPrice: 8900, image: img("photo-1485968579580-0396b295bd77"), sizes: ["XS", "S", "M", "L"], colors: ["Black", "White"], category: "tops", ageGroup: "adults", popularity: 87, isNew: false, isPromo: true },
];

const adultBottoms: CatalogProduct[] = [
  { name: "Tailored Dress Trousers", slug: "adult-dress-trousers-m", description: "Precision-tailored trousers with a sharp crease.", price: 18500, image: img("photo-1473966968600-fa801b869a78"), sizes: ["30", "32", "34", "36", "38"], colors: ["Charcoal", "Navy", "Black"], category: "bottoms", ageGroup: "adults", popularity: 90, isNew: false, isPromo: false },
  { name: "Premium Denim Jeans", slug: "adult-premium-jeans-m", description: "Japanese selvedge denim with a straight leg.", price: 16800, image: img("photo-1542272604-787c683553e0"), sizes: ["30", "32", "34", "36"], colors: ["Indigo", "Black"], category: "bottoms", ageGroup: "adults", popularity: 89, isNew: true, isPromo: false },
  { name: "Wide-Leg Palazzo Pants", slug: "adult-palazzo-pants-f", description: "Flowing palazzo pants with a high waist and drape.", price: 15500, image: img("photo-1594633313590-b0f3eebcd3d1"), sizes: ["XS", "S", "M", "L", "XL"], colors: ["Black", "White", "Olive"], category: "bottoms", ageGroup: "adults", popularity: 92, isNew: true, isPromo: false },
  { name: "Pencil Skirt", slug: "adult-pencil-skirt-f", description: "Structured pencil skirt for professional settings.", price: 12800, image: img("photo-1583496669740-3485d9fbf1ae"), sizes: ["XS", "S", "M", "L"], colors: ["Black", "Navy"], category: "bottoms", ageGroup: "adults", popularity: 86, isNew: false, isPromo: false },
  { name: "Chino Shorts", slug: "adult-chino-shorts-m", description: "Tailored chino shorts for smart summer style.", price: 8500, image: img("photo-1541099649105-f69ad21f3246"), sizes: ["30", "32", "34", "36"], colors: ["Khaki", "Navy"], category: "bottoms", ageGroup: "adults", popularity: 80, isNew: false, isPromo: false },
  { name: "Pleated Midi Skirt", slug: "adult-pleated-midi-f", description: "Elegant pleated midi skirt with a satin finish.", price: 14200, promoPrice: 11500, image: img("photo-1591369676355-39c9d41eafb2"), sizes: ["XS", "S", "M", "L"], colors: ["Champagne", "Black"], category: "bottoms", ageGroup: "adults", popularity: 91, isNew: false, isPromo: true },
];

const adultDresses: CatalogProduct[] = [
  { name: "Silk Midi Dress", slug: "adult-silk-midi-f", description: "Flowing silk midi with subtle sheen — event ready.", price: 28900, promoPrice: 23900, image: img("photo-1496747611176-843222e1e57c"), sizes: ["XS", "S", "M", "L"], colors: ["Blush", "Emerald", "Black"], category: "dresses", ageGroup: "adults", popularity: 97, isNew: true, isPromo: true },
  { name: "Evening Gown", slug: "adult-evening-gown-f", description: "Floor-length evening gown with elegant draping.", price: 45000, image: img("photo-1566174053879-31528523f8ae"), sizes: ["XS", "S", "M", "L"], colors: ["Navy", "Burgundy", "Black"], category: "dresses", ageGroup: "adults", popularity: 94, isNew: true, isPromo: false },
  { name: "Cocktail Dress", slug: "adult-cocktail-dress-f", description: "Classic cocktail dress with a fitted bodice.", price: 32500, image: img("photo-1539008835657-9e8e9680c956"), sizes: ["XS", "S", "M", "L"], colors: ["Red", "Black"], category: "dresses", ageGroup: "adults", popularity: 93, isNew: false, isPromo: false },
  { name: "Linen Maxi Dress", slug: "adult-linen-maxi-f", description: "Breathable linen maxi for resort and vacation wear.", price: 24800, image: img("photo-1515372039744-b8f02a3ae446"), sizes: ["XS", "S", "M", "L", "XL"], colors: ["White", "Sage"], category: "dresses", ageGroup: "adults", popularity: 88, isNew: false, isPromo: false },
  { name: "Sheath Dress", slug: "adult-sheath-dress-f", description: "Timeless sheath dress for office and occasions.", price: 26500, image: img("photo-1572804013309-616fffb6a0e0"), sizes: ["XS", "S", "M", "L"], colors: ["Black", "Navy"], category: "dresses", ageGroup: "adults", popularity: 90, isNew: false, isPromo: false },
  { name: "Wrap Maxi Dress", slug: "adult-wrap-maxi-f", description: "Flattering wrap maxi with a side slit.", price: 27800, image: img("photo-1595777453413-ef3d6d2e0b2a"), sizes: ["XS", "S", "M", "L"], colors: ["Floral", "Solid Black"], category: "dresses", ageGroup: "adults", popularity: 91, isNew: true, isPromo: false },
];

const adultOuterwear: CatalogProduct[] = [
  { name: "Executive Wool Blazer", slug: "adult-wool-blazer-m", description: "Tailored wool-blend blazer with structured shoulders.", price: 38500, image: img("photo-1594938298603-c8148c4dae35"), sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Navy", "Charcoal", "Black"], category: "outerwear", ageGroup: "adults", popularity: 92, isNew: false, isPromo: false },
  { name: "Double-Breasted Coat", slug: "adult-double-breasted-coat-f", description: "Luxurious double-breasted wool coat for winter.", price: 52000, image: img("photo-1539533018447-63fcce267834"), sizes: ["XS", "S", "M", "L", "XL"], colors: ["Camel", "Black"], category: "outerwear", ageGroup: "adults", popularity: 95, isNew: true, isPromo: false },
  { name: "Leather Bomber Jacket", slug: "adult-leather-bomber-m", description: "Premium leather bomber with ribbed trim.", price: 48500, image: img("photo-1551028719-00167b16eac5"), sizes: ["S", "M", "L", "XL"], colors: ["Black", "Brown"], category: "outerwear", ageGroup: "adults", popularity: 93, isNew: true, isPromo: false },
  { name: "Tweed Blazer", slug: "adult-tweed-blazer-f", description: "Heritage tweed blazer with a modern feminine cut.", price: 35800, image: img("photo-1591369676355-39c9d41eafb2"), sizes: ["XS", "S", "M", "L"], colors: ["Grey", "Brown"], category: "outerwear", ageGroup: "adults", popularity: 87, isNew: false, isPromo: false },
  { name: "Classic Trench Coat", slug: "adult-classic-trench-m", description: "Iconic trench coat in water-repellent cotton.", price: 42500, promoPrice: 35900, image: img("photo-1543076447-215a9eea3647"), sizes: ["S", "M", "L", "XL"], colors: ["Beige", "Black"], category: "outerwear", ageGroup: "adults", popularity: 90, isNew: false, isPromo: true },
  { name: "Down Puffer Coat", slug: "adult-down-puffer-f", description: "Long down-filled puffer for maximum warmth.", price: 39800, image: img("photo-1544966503-d8e8fda57722"), sizes: ["XS", "S", "M", "L"], colors: ["Black", "Navy"], category: "outerwear", ageGroup: "adults", popularity: 88, isNew: false, isPromo: false },
];

const adultAccessories: CatalogProduct[] = [
  { name: "Classic Leather Belt", slug: "adult-leather-belt-m", description: "Full-grain leather belt with brushed metal buckle.", price: 8500, image: img("photo-1624222247344-550fb60583fd"), sizes: ["S", "M", "L"], colors: ["Brown", "Black"], category: "accessories", ageGroup: "adults", popularity: 82, isNew: false, isPromo: false },
  { name: "Designer Handbag", slug: "adult-designer-handbag-f", description: "Structured leather handbag with gold hardware.", price: 35000, image: img("photo-1584917865442-de89d76adc7e"), sizes: ["One Size"], colors: ["Black", "Tan", "Burgundy"], category: "accessories", ageGroup: "adults", popularity: 94, isNew: true, isPromo: false },
  { name: "Luxury Chronograph Watch", slug: "adult-chronograph-watch-m", description: "Stainless steel chronograph with sapphire crystal.", price: 65000, image: img("photo-1523275335684-37898b6baf30"), sizes: ["One Size"], colors: ["Silver", "Gold"], category: "accessories", ageGroup: "adults", popularity: 91, isNew: false, isPromo: false },
  { name: "Cat-Eye Sunglasses", slug: "adult-cat-eye-sunglasses-f", description: "Sophisticated cat-eye frames with UV protection.", price: 9800, image: img("photo-1572635196237-14b3f281503f"), sizes: ["One Size"], colors: ["Tortoise", "Black"], category: "accessories", ageGroup: "adults", popularity: 86, isNew: true, isPromo: false },
  { name: "Leather Oxford Shoes", slug: "adult-oxford-shoes-m", description: "Hand-finished leather oxfords for formal occasions.", price: 28500, promoPrice: 22800, image: img("photo-1614252235356-c4f4445a5bca"), sizes: ["40", "41", "42", "43", "44"], colors: ["Black", "Brown"], category: "accessories", ageGroup: "adults", popularity: 89, isNew: false, isPromo: true },
  { name: "Pearl Drop Earrings", slug: "adult-pearl-earrings-f", description: "Elegant freshwater pearl drops with gold hooks.", price: 12500, image: img("photo-1611591436351-75b3e8ab1a1e"), sizes: ["One Size"], colors: ["Gold", "Silver"], category: "accessories", ageGroup: "adults", popularity: 88, isNew: true, isPromo: false },
];

const allCatalog: CatalogProduct[] = [
  ...teenagerTops,
  ...teenagerBottoms,
  ...teenagerDresses,
  ...teenagerOuterwear,
  ...teenagerAccessories,
  ...youthTops,
  ...youthBottoms,
  ...youthDresses,
  ...youthOuterwear,
  ...youthAccessories,
  ...adultTops,
  ...adultBottoms,
  ...adultDresses,
  ...adultOuterwear,
  ...adultAccessories,
];

export const CATALOG_PRODUCTS = allCatalog.map(p);

export const CATALOG_STATS = {
  total: allCatalog.length,
  teenagers: allCatalog.filter((x) => x.ageGroup === "teenagers").length,
  youths: allCatalog.filter((x) => x.ageGroup === "youths").length,
  adults: allCatalog.filter((x) => x.ageGroup === "adults").length,
};
