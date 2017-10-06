package com.musicplayer.modules;

import android.media.MediaMetadataRetriever;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

/**
 * Created by AngelC on 6/10/2017.
 */

public class AudioFileDetailsModule extends ReactContextBaseJavaModule {

    public AudioFileDetailsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AudioFileDetailsModule";
    }

    @ReactMethod
    public void retrieveAudioFileDetails(String filePath, Promise promise) {
        MediaMetadataRetriever mmr = new MediaMetadataRetriever();
        mmr.setDataSource(filePath);

        WritableMap map = Arguments.createMap();

        map.putString("artist", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST));
        map.putString("album", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ALBUM));
        map.putString("duration", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION));
        map.putString("trackName", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_TITLE));
        map.putString("trackNumber", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_CD_TRACK_NUMBER));
        map.putString("year", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_YEAR));
        map.putMap("albumArt", mmr.getEmbeddedPicture());

        promise.resolve(map);
    }
}
