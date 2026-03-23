export const ALLOWED_CATEGORIES = ['characters', 'locations', 'episodes'];

const CATEGORY_TO_API_RESOURCE = {
  characters: 'character',
  locations: 'location',
  episodes: 'episode',
};

export function resolveApiResource(category) {
  return CATEGORY_TO_API_RESOURCE[category] ?? category;
}
