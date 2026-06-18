/** Verified Unsplash clothing & fashion images — used across the site */

export function img(path: string, width = 800) {
  return `https://images.unsplash.com/${path}?auto=format&fit=crop&w=${width}&q=80`;
}

export const FALLBACK_IMAGE = img("photo-1521572163474-6864f9cf17ab", 800);

export const SITE_IMAGES = {
  hero: {
    modelLeft: img("photo-1617137968427-85924c800a22", 1200),
    modelRight: img("photo-1506794778202-cad84cf45f1d", 1200),
  },
  shopByAge: {
    children: "/images/children/pink-one-shoulder-dress.png",
    teenagers: img("photo-1529139574466-a303027c1d8b", 600),
    youths: img("photo-1507679799987-c73779587ccf", 600),
    adults: img("photo-1483985988355-763728f8005b", 600),
  },
  /** Hero & marketing — mixed male/female fashion */
  featured: {
    male: img("photo-1617137968427-85924c800a22", 1200),
    female: img("photo-1483985988355-763728f8005b", 1200),
  },
  about: img("photo-1441984904996-e0b6a68756d7", 1200),
};

/** Local product photos — Children (5+) collection */
export const CHILDREN_IMAGES = {
  blackWhiteButtonDress: "/images/children/black-white-button-dress.png",
  redHeartSet: "/images/children/red-heart-set.png",
  denimPinaforeDress: "/images/children/denim-pinafore-dress.png",
  pinkOneShoulderDress: "/images/children/pink-one-shoulder-dress.png",
  maroonOneShoulderDress: "/images/children/maroon-one-shoulder-dress.png",
  whiteFloralDress: "/images/children/white-floral-dress.png",
  pinkPearlSkirtSet: "/images/children/pink-pearl-skirt-set.png",
  pinkBowOutfitSet: "/images/children/pink-bow-streetwear-set.png",
  greyStarTwoPieceSet: "/images/children/grey-star-two-piece-set.png",
  butterflyPurpleDress: "/images/children/butterfly-purple-dress.png",
  pinkPantherTeeShortsSet: "/images/children/pink-panther-tee-shorts-set.png",
  geometricOrangeShirtShortsSet: "/images/children/geometric-orange-shirt-shorts-set.png",
  boston23TeeShortsSet: "/images/children/boston-23-tee-shorts-set.png",
  streetDuckGraphicTee: "/images/children/street-duck-graphic-tee.png",
  chicago26FreedomSet: "/images/children/chicago-26-freedom-set.png",
  designerMonogramKidsSet: "/images/children/designer-monogram-kids-set.png",
  chicago32SportsSet: "/images/children/chicago-32-sports-set.png",
};

export const PRODUCT_IMAGES = {
  streetPulseHoodie: [
    img("photo-1556821840-3a63f95609a7", 800),
    img("photo-1521223890338-42b314a00fed", 800),
  ],
  denimWaveJacket: [
    img("photo-1576995850633-9663eaa5131b", 800),
    img("photo-1543076447-215a9eea3647", 800),
  ],
  urbanFlowCargo: [
    img("photo-1624378515199-75dbbefe4ff3", 800),
    img("photo-1473966968600-fa801b869a78", 800),
  ],
  minimalistLinen: [
    img("photo-1602810318383-e386cc2a3f9d", 800),
    img("photo-1596755094514-f87e34085b56", 800),
  ],
  executiveBlazer: [
    img("photo-1594938298603-c8148c4dae35", 800),
    img("photo-1507679799987-c73779587ccf", 800),
  ],
  silkMidiDress: [
    img("photo-1496747611176-843222e1e57c", 800),
    img("photo-1572804013309-616fffb6a0e0", 800),
  ],
  classicLeatherBelt: [
    img("photo-1553062407-98eeb64c6a62", 800),
    img("photo-1624222247344-550fb60583fd", 800),
  ],
  weekendKnitSweater: [
    img("photo-1576566588028-4147f3842f27", 800),
    img("photo-1434389677669-e08b4cac3105", 800),
  ],
};

export const BLOG_IMAGES = {
  layeredLooks: img("photo-1489987707025-afc232f7ea0f", 1200),
  kidsFit: img("photo-1503454537845-ff7abf7a0f7", 1200),
  springCollection: img("photo-1469334031218-e5b8eb5b5033", 1200),
};

export function ensureImage(url: string | undefined | null): string {
  if (!url || url.trim() === "") return FALLBACK_IMAGE;
  return url;
}

export function ensureImages(urls: string[]): string[] {
  const valid = urls.filter((u) => u && u.trim() !== "");
  return valid.length > 0 ? valid : [FALLBACK_IMAGE];
}
