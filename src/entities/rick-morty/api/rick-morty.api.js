import { resolveApiResource } from '../model/categories';
import { fetchJson } from '@shared/api';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export function fetchCategoryPage(category, page, { signal } = {}) {
  const apiResource = resolveApiResource(category);
  const url = `${API_BASE_URL}/${apiResource}?page=${page}`;
  return fetchJson(url, { signal });
}

export function fetchItemById(category, id, { signal } = {}) {
  const apiResource = resolveApiResource(category);
  const url = `${API_BASE_URL}/${apiResource}/${id}`;
  return fetchJson(url, { signal });
}
