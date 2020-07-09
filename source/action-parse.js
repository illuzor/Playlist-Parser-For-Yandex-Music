var playlists = document.getElementsByClassName("playlist playlist_selectable");

var string = "";
var totalPlaylists = playlists.length;
var currentPlaylist = 0;
var totalTracks = 0;

scrollPlaylist();

function preParse() {
    var playlist = playlists[currentPlaylist];
    string += playlist.getElementsByClassName("playlist__title")[0].getAttribute('title') + ":\n";
    playlist.click();
    setTimeout(parse, 1200);
}

function parse() {
    parseTracks();
    currentPlaylist++;
    console.log(currentPlaylist + "/" + totalPlaylists);

    if (currentPlaylist < totalPlaylists) {
        preParse();
    } else {
        string += " ---------- \n";
        string += "Total playlists: " + totalPlaylists + "\n";
        string += "Total tracks: " + totalTracks;

        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        document.body.innerText = string;
    }
}

function parseTracks() {
    var allTracks = [];

    var oldTracks = [];
    var tracks = [];

    while (true) {
        tracks = getTracklist();

        if (arraysEqual(tracks, oldTracks)) {
            break;
        }

        for (var j = 0; j < tracks.length; j++) {
            var trackString = tracks[j];
            if (allTracks.indexOf(trackString) == -1) {
                allTracks.push(tracks[j]);
            }
        }
        oldTracks = tracks;
        scrollPlaylist();
    }

    for (var j = 0; j < allTracks.length; j++) {
        string += allTracks[j];
        string += "\n";
        totalTracks++;
    }

    string += "\n";
    string += "\n";
}

function getTracklist() {
    var sidebarPlaylists = document.getElementsByClassName("sidebar__tracks");
    var sidebarPlaylist = sidebarPlaylists[sidebarPlaylists.length - 1];
    var tracklist = sidebarPlaylist.getElementsByClassName("d-track");

    var tracksString = []

    for (var j = 0; j < tracklist.length; j++) {
        var trackString = tracklist[j].getElementsByClassName("d-track__name")[0].getAttribute('title');

        var artists = "";
        var allArtists = tracklist[j].getElementsByClassName("d-track__artists")[0].getElementsByClassName("deco-link deco-link_muted");

        for (var i = 0; i < tracklist.length; i++) {
            if (allArtists[i] != undefined) {
                console.log(allArtists[i]);
                artists += allArtists[i].innerText;
                artists += " & ";
            }
        }
        artists = artists.substring(0, artists.length - 3);
        trackString += " - ";
        trackString += artists;

        tracksString.push(trackString)
    }
    return tracksString;
}

function scrollPlaylist() {
    var scrollings = document.getElementsByClassName("sidebar-cont sidebar-cont_shown deco-pane");
    var scrolling = scrollings[scrollings.length - 1];
    scrolling.scrollTop += 1300;
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
