import Artist from "./auth/Artist";
import Organizer from "./auth/Organizer";
import Event from "./auth/Event";
import Invitation from "./auth/Invitation";
import Album from "./auth/Album";
import Song from "./auth/Song";

import { closeModal, openModal } from "./helpers/modal";
import { createArtistItem, removeArtistItem } from "./helpers/artist-selection";
import { getQuery } from "./helpers/urlquery";

Artist();
Organizer();
Invitation();
Event();
Album();
Song();

window.getQuery = getQuery;

window.closeModal = closeModal;
window.openModal = openModal;

window.createArtistItem = createArtistItem;
window.removeArtistItem = removeArtistItem;