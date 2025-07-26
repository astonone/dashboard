import yaml from 'js-yaml';

export async function loadYaml<T = any>(url: string): Promise<T> {
  const response = await fetch(url);
  const text = await response.text();
  return yaml.load(text) as T;
}
