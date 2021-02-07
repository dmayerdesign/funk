PATH_TO_CACHED=".funk/.cache/internal-develop-local"
CACHED_PID=`cat $PATH_TO_CACHED`
echo "got a cached PID:"
echo $CACHED_PID
kill $CACHED_PID || true

npm run internal::build::local
if [ $? -eq 0 ]; then
  firebase emulators:start --only functions,firestore \
  & echo $! > $PATH_TO_CACHED
else (exit 1); fi
