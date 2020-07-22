npm i && \
npm run test && \
npm run build::production && \
node_modules/.bin/firebase use funk-production && \
node_modules/.bin/firebase deploy
