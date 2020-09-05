PATH_TO_CACHED=".funk/.cache/functions-develop"
CACHED_PID=`cat $PATH_TO_CACHED`
echo "got a cached PID:"
echo $CACHED_PID
kill $CACHED_PID || true

npm run functions::build::local && \
firebase emulators:start --only functions,firestore \
& echo $! > $PATH_TO_CACHED
