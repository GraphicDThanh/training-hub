echo 'Minify middleware';
npx terser .next/server/middleware.js -o .next/server/middleware.js

echo 'Minify Static';
npx terser .next/static/chunks/pages/*.js -o .next/static/chunks/pages/*.js
npx terser .next/static/chunks/app/*.js -o .next/static/chunks/app/*.js
npx terser .next/static/chunks/pages/*.js -o .next/static/chunks/pages/*.js
npx terser .next/static/chunks/app/*.js -o .next/static/chunks/app/*.js
find ".next/static/chunks/app/(dashboard)/projects" -type f -name "*page*" -exec npx terser "{}" -o "{}" \;
find ".next/static/chunks" -type f -name "*webpack*" -exec npx terser "{}" -o "{}" \;
find ".next/static/chunks" -type f -name "*main-app*" -exec npx terser "{}" -o "{}" \;
find ".next/static/chunks" -type f -name "*e0c.js*" -exec npx terser "{}" -o "{}" \;
find ".next/static/chunks" -type f -name "*7c0.js*" -exec npx terser "{}" -o "{}" \;

echo 'Minify Server';
npx terser .next/server/app/**/*.js -o .next/server/app/**/*.js
npx terser .next/server/pages/*.js -o .next/server/pages/*.js
find ".next/server/chunks" -type f \( -iname \*.js \) -not -name "*80.js*" -exec npx terser "{}" -o "{}" \;
