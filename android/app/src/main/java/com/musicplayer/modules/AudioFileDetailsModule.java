package com.musicplayer.modules;

import android.content.ContentResolver;
import android.content.ContentUris;
import android.database.Cursor;
import android.media.MediaMetadataRetriever;
import android.net.Uri;
import android.provider.MediaStore;

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

        promise.resolve(map);
    }

    @ReactMethod
    private void getAllArtists(Promise promise) {
        ContentResolver contentResolver = getReactApplicationContext().getContentResolver();
        WritableMap map = Arguments.createMap();

        // Query for Album data
        Uri uri = MediaStore.Audio.Artists.EXTERNAL_CONTENT_URI;
        String[] projection =
                {
                        MediaStore.Audio.Artists._ID,
                        MediaStore.Audio.Artists.ARTIST,
                        MediaStore.Audio.Artists.NUMBER_OF_TRACKS,
                        MediaStore.Audio.Artists.NUMBER_OF_ALBUMS
                };
        String sortOrder = MediaStore.Audio.Artists.ARTIST + " ASC";
        Cursor cursor = contentResolver.query(uri, projection, null, null, sortOrder);

        if (cursor != null && cursor.getCount() > 0) {
            while (cursor.moveToNext()) {
                String id = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Artists._ID));
                String artist = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Artists.ARTIST));
                String numOfTracks = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Artists.NUMBER_OF_TRACKS));
                String numOfAlbums = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Artists.NUMBER_OF_ALBUMS));

                WritableMap artistMap = Arguments.createMap();

                artistMap.putString("ID", id);
                artistMap.putString("NUMBER_OF_TRACKS", numOfTracks);
                artistMap.putString("NUMBER_OF_ALBUMS", numOfAlbums);
                artistMap.putString("ARTIST", artist);
                map.putMap(id, artistMap);
            }
        }
        cursor.close();

        promise.resolve(map);
    }

    @ReactMethod
    private void getAlbumsForArtist(String artistId, Promise promise) {
        ContentResolver contentResolver = getReactApplicationContext().getContentResolver();
        WritableMap map = Arguments.createMap();

        Uri uri = MediaStore.Audio.Artists.Albums.getContentUri("external", Long.parseLong(artistId));
        Cursor cursor = contentResolver.query(uri, null, null, null, MediaStore.Audio.Albums.DEFAULT_SORT_ORDER);

        if (cursor != null && cursor.getCount() > 0) {
            while (cursor.moveToNext()) {
                String albumName  = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Artists.Albums.ALBUM));
                String albumId  = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Artists._ID));
                String albumArt  = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Artists.Albums.ALBUM_ART));
//                Long albumid = Long.parseLong(album_id);
//                Uri sArtworkUri = Uri.parse("content://media/external/audio/albumart");
//                Uri finaluri = ContentUris.withAppendedId(sArtworkUri, albumid);

                WritableMap albumMap = Arguments.createMap();

                albumMap.putString("ALBUM_ID", albumId);
                albumMap.putString("ALBUM", albumName);
                albumMap.putString("ALBUM_ART", albumArt);
                map.putMap(albumId, albumMap);
            }
        }
        cursor.close();

        promise.resolve(map);
    }

    @ReactMethod
    private void getAllAlbums(Promise promise) {
        ContentResolver contentResolver = getReactApplicationContext().getContentResolver();
        WritableMap map = Arguments.createMap();

        // Query for Album data
        Uri uri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        String selection = MediaStore.Audio.Media.IS_MUSIC + "!= 0";
        String sortOrder = MediaStore.Audio.Media.TITLE + " ASC";
        Cursor cursor = contentResolver.query(uri, null, selection, null, sortOrder);

        if (cursor != null && cursor.getCount() > 0) {
            while (cursor.moveToNext()) {
                String data  = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DATA));
                String title = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.TITLE));
                String album = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM));
                String artist = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST));
                String album_id = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM_ID));
                Long albumid = Long.parseLong(album_id);
                Uri sArtworkUri = Uri.parse("content://media/external/audio/albumart");
                Uri finaluri = ContentUris.withAppendedId(sArtworkUri, albumid);
                //Bitmap artwork = BitmapFactory.decodeStream(in);

                WritableMap albumMap = Arguments.createMap();

                albumMap.putString("data", data);
                albumMap.putString("title", title);
                albumMap.putString("album", album);
                albumMap.putString("artist", artist);
                albumMap.putString("album_id", cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM_ID)));
                albumMap.putString("sArtworkUri", sArtworkUri.toString());
                map.putMap("album " + album_id, albumMap);
            }
        }
        cursor.close();

        promise.resolve(map);
    }
}
