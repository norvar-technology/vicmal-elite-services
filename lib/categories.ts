import { Category } from "./types";
import { MEDIA_BASE_URL } from "./constants";

export const categories: Category[] = [
  {
    slug: "earbuds",
    name: "Earbuds",
    tagline: "True wireless, ANC & gaming buds",
    image: `${MEDIA_BASE_URL}/vicmal/earbuds-category.jpg`,
  },
  {
    slug: "chargers",
    name: "Chargers",
    tagline: "Fast chargers for phone & laptop",
    image: `${MEDIA_BASE_URL}/vicmal/charger-category.jpg`,
  },
  {
    slug: "powerbanks",
    name: "Powerbanks",
    tagline: "All-day and heavy-duty capacities",
    image: `${MEDIA_BASE_URL}/vicmal/powerbank-category.jpg`,
  },
  {
    slug: "cords",
    name: "Cords",
    tagline: "Braided, reinforced charge & data cables",
    image: `${MEDIA_BASE_URL}/vicmal/cord-category.jpg`,
  },
  {
    slug: "batteries",
    name: "Batteries",
    tagline: "Replacement cells & battery packs",
    image: `${MEDIA_BASE_URL}/vicmal/battery-category.jpg`,
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
