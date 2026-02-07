// Utility functions for handling tags safely
// Tags can come from API as strings OR as objects with {_id, name, displayName, color}

export interface TagObject {
  _id?: string;
  name?: string;
  displayName?: string;
  color?: string;
}

export type TagType = string | TagObject;

/**
 * Safely extract displayable text from a tag (string or object)
 */
export const getTagText = (tag: TagType): string => {
  if (!tag) return '';
  if (typeof tag === 'string') return tag;
  if (typeof tag === 'object') {
    return tag.displayName || tag.name || String(tag._id) || '';
  }
  return String(tag);
};

/**
 * Safely extract unique key for React rendering
 */
export const getTagKey = (tag: TagType, index?: number): string => {
  if (!tag) return `tag-${index || 0}`;
  if (typeof tag === 'string') return tag;
  if (typeof tag === 'object' && tag._id) return tag._id;
  if (typeof tag === 'object' && tag.name) return tag.name;
  return `tag-${index || 0}`;
};

/**
 * Safely extract color from a tag object
 */
export const getTagColor = (tag: TagType): string | undefined => {
  if (typeof tag === 'object' && tag.color) {
    return tag.color;
  }
  return undefined;
};

/**
 * Normalize tags array - convert all to strings
 */
export const normalizeTags = (tags: TagType[]): string[] => {
  if (!Array.isArray(tags)) return [];
  return tags.map(getTagText).filter(Boolean);
};
