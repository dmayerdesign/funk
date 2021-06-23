echo "[meshell-sturgis] Not implemented."
exit 1

node_modules/.bin/concurrently \
  "npm run test::external::start-remote-store-server" \
  "node_modules/.bin/wait-on http://localhost:8101 && node_modules/.bin/cypress open" \
  --success first \
  --kill-others


# "node_modules/.bin/wait-on http://localhost:8101 && node_modules/.bin/cypress run --headless --spec \"$@\"" \
