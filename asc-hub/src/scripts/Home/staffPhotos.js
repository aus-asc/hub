// Bundled staff headshots, keyed by the staff member's normalized name
// (same slug rule the app uses for Type: trim → lowercase → spaces/hyphens → _).
// Drop a photo in src/assets/staff/<name_slug>.jpg and it is picked up
// automatically; staff without a photo fall back to the initials avatar.
const files = import.meta.glob("../../assets/staff/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
});

const bySlug = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [
    path
      .split("/")
      .pop()
      .replace(/\.(jpg|jpeg|png)$/i, ""),
    url,
  ]),
);

// Known alternate spellings seen across the roster sources
const ALIASES = {
  hafsah_taimoor: "hafsa_taimoor",
};

export function getStaffPhoto(name) {
  if (!name) return null;
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  return bySlug[slug] || bySlug[ALIASES[slug]] || null;
}
