node_modules/.bin/concurrently \
  "npm run test::external::start-remote-store-server" \
  "node_modules/.bin/wait-on http://localhost:8101 && node_modules/.bin/cypress run --headless --spec \"$@\"" \
  --success first \
  --kill-others
