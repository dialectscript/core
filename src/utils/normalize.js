// Normalizes Nigerian language input – removes all diacritics & accepts common substitutes
function normalizeDialect(text) {
  return text
    // Yorùbá
    .replace(/[ẹẸ]/gi, 'e')
    .replace(/[ọỌ]/gi, 'o')
    .replace(/[ṣṢ]/gi, 's')
    .replace(/gb/gi, 'gb')   // already correct
    .replace(/[áàā]/gi, 'a')
    .replace(/[éèē]/gi, 'e')
    .replace(/[íìī]/gi, 'i')
    .replace(/[óòō]/gi, 'o')
    .replace(/[úùū]/gi, 'u')
    .replace(/[ńǹṇ]/gi, 'n')

    // Igbo
    .replace(/[ịị]/gi, 'i')
    .replace(/[ụụ]/gi, 'u')
    .replace(/[ọỌ]/gi, 'o')
    .replace(/[ẹẸ]/gi, 'e')
    .replace(/[ṅṄ]/gi, 'n')
    .replace(/[ṅ́ǹ]/gi, 'n')

    // Hausa (very few – but just in case)
    .replace(/[ɓƁ]/gi, 'b')
    .replace(/[ɗƊ]/gi, 'd')
    .replace(/[ƙƘ]/gi, 'k')
    .replace(/['’]/g, '')   // remove apostrophes in ƙarya → karya
    .trim();
}