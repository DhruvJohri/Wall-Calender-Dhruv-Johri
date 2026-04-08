export const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export const WEEKDAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export const MONTH_IMAGES: Record<number, { src: string; alt: string; unsplashKeyword: string }> = {
  0:  { src: '/hero/january.jpg',   alt: 'Snowy mountain peak',         unsplashKeyword: 'mountain+snow+winter' },
  1:  { src: '/hero/february.jpg',  alt: 'Snowy forest',                unsplashKeyword: 'snowy+forest+winter' },
  2:  { src: '/hero/march.jpg',     alt: 'Spring cherry blossoms',      unsplashKeyword: 'cherry+blossom+spring' },
  3:  { src: '/hero/april.jpg',     alt: 'Spring rain',                 unsplashKeyword: 'spring+rain+flowers' },
  4:  { src: '/hero/may.jpg',       alt: 'Green rolling hills',         unsplashKeyword: 'green+hills+nature' },
  5:  { src: '/hero/june.jpg',      alt: 'Ocean beach summer',          unsplashKeyword: 'beach+ocean+summer' },
  6:  { src: '/hero/july.jpg',      alt: 'Summer sunset',               unsplashKeyword: 'summer+sunset+sky' },
  7:  { src: '/hero/august.jpg',    alt: 'Sunflower field',             unsplashKeyword: 'sunflower+field+golden' },
  8:  { src: '/hero/september.jpg', alt: 'Autumn forest',               unsplashKeyword: 'autumn+forest+leaves' },
  9:  { src: '/hero/october.jpg',   alt: 'Fall foliage',                unsplashKeyword: 'fall+foliage+orange' },
  10: { src: '/hero/november.jpg',  alt: 'Misty forest',                unsplashKeyword: 'misty+forest+november' },
  11: { src: '/hero/december.jpg',  alt: 'Snow-covered village',        unsplashKeyword: 'snow+christmas+winter+village' },
};

// For image fallback in dev: `https://source.unsplash.com/1200x600/?${MONTH_IMAGES[month].unsplashKeyword}`
// In production: use local files only
