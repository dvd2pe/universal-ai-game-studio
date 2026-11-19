#!/usr/bin/env bash
# Universal AI Game Studio — manual APK build (no Gradle).
# Usage: build-apk.sh [MIRROR_DIR] [GAME_URL] [PACKAGE] [APP_NAME] [OUT_APK]
#   MIRROR_DIR  game mirror folder to bundle as assets/mirror (optional)
#   GAME_URL    fallback URL if no mirror is bundled (optional)
# Requires ANDROID_HOME (or ANDROID_SDK_ROOT) with build-tools + platforms.
set -euo pipefail

MIRROR_DIR="${1:-}"
GAME_URL="${2:-}"
PACKAGE="${3:-com.dvd2pe.gamebox}"
APP_NAME="${4:-AI Game Box}"
OUT="${5:-dist/game.apk}"

# absolutize caller-relative paths BEFORE cd'ing into android/
MIRROR_DIR="${MIRROR_DIR:-}"
if [ -n "$MIRROR_DIR" ] && [ "${MIRROR_DIR#/}" = "$MIRROR_DIR" ]; then
  MIRROR_DIR="$(pwd)/$MIRROR_DIR"
fi
if [ "${OUT#/}" = "$OUT" ]; then
  OUT="$(pwd)/$OUT"
fi
mkdir -p "$(dirname "$OUT")"

SDK="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
[ -n "$SDK" ] || { echo "ERROR: ANDROID_HOME not set" >&2; exit 1; }
# prefer stable versions explicitly; fall back to newest stable available
BT=""
for v in 34.0.0 35.0.0 36.0.0; do
  [ -d "$SDK/build-tools/$v" ] && { BT="$SDK/build-tools/$v"; break; }
done
[ -n "$BT" ] || BT="$(ls -d "$SDK"/build-tools/* | sort -V | tail -1)"
PLAT=""
for v in android-34 android-35 android-36; do
  [ -d "$SDK/platforms/$v" ] && { PLAT="$SDK/platforms/$v"; break; }
done
[ -n "$PLAT" ] || PLAT="$(ls -d "$SDK"/platforms/android-* | grep -v beta | sort -V | tail -1)"
echo "SDK: $SDK | build-tools: $(basename "$BT") | platform: $(basename "$PLAT")"

cd "$(dirname "$0")/../android"
rm -rf bin gen classes dex; mkdir -p bin gen classes dex assets

# configurable bits
sed -i "s|<string name=\"app_name\">.*</string>|<string name=\"app_name\">$APP_NAME</string>|" res/values/strings.xml
sed -i "0,/package=\"[^\"]*\"/s//package=\"$PACKAGE\"/" AndroidManifest.xml
if [ -n "$GAME_URL" ] && { [ -z "$MIRROR_DIR" ] || [ ! -f "$MIRROR_DIR/index.html" ]; }; then
  sed -i "s|<string name=\"default_url\">.*</string>|<string name=\"default_url\">$GAME_URL</string>|" res/values/strings.xml
fi

# bundle mirror as assets
if [ -n "$MIRROR_DIR" ] && [ -d "$MIRROR_DIR" ]; then
  mkdir -p assets/mirror && cp -r "$MIRROR_DIR"/. assets/mirror/
  echo "bundled mirror: $(find assets/mirror -type f | wc -l) files"
fi

# 1) resources
"$BT/aapt2" compile --dir res -o bin/res.zip
"$BT/aapt2" link -o bin/base.apk -I "$PLAT/android.jar" --manifest AndroidManifest.xml \
  -R bin/res.zip --java gen --auto-add-overlay -A assets \
  --min-sdk-version 21 --target-sdk-version 34

# 2) java → dex
javac -source 8 -target 8 -nowarn -classpath "$PLAT/android.jar" \
  -d classes $(find gen java -name '*.java')
"$BT/d8" --release --min-api 21 --lib "$PLAT/android.jar" --output dex \
  $(find classes -name '*.class')
cp dex/classes.dex bin/

# 3) package + align + sign
(cd bin && zip -qu base.apk classes.dex)
"$BT/zipalign" -f 4 bin/base.apk bin/aligned.apk
KS=bin/debug.keystore
if [ ! -f "$KS" ]; then
  keytool -genkeypair -keystore "$KS" -storepass android -keypass android \
    -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000 \
    -dname "CN=AI Game Studio Debug,O=UGS,C=US" 2>/dev/null
fi
"$BT/apksigner" sign --ks "$KS" --ks-pass pass:android --key-pass pass:android --out "$OUT" bin/aligned.apk
"$BT/apksigner" verify "$OUT"
echo "APK built and signed: $OUT ($(du -h "$OUT" | cut -f1))"
