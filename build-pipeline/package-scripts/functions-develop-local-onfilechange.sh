PATH_TO_CACHED=".funk/.cache/functions-develop"
CACHED_PID=`cat $PATH_TO_CACHED`
echo "got a cached PID:"
echo $CACHED_PID
kill $CACHED_PID || true

npm run functions::build::local && \
node_modules/.bin/firebase emulators:start --only functions \
& echo $! > $PATH_TO_CACHED