import { getStaticDate } from "./datetime.js"

export const formatAlbumsForArtist = (albums) => {
    let formated = '';

    albums.forEach((album) => {
        formated += `
            <div class="container__main__center__covers__item">
                <div class="container__main__center__covers__item__back image--back" style="position: relative; background-image: url('/assets/uploads/covers/${album.cover}');">
                    <svg class="container__main__center__covers__item__back__del image--icon pos--abs" data-albumid="${album.id}" style="right: .8rem; bottom: .8rem;">
                        <use href="#trash"></use>
                    </svg>
                </div>
                <div class="container__main__center__covers__item__details">
                    <p>${album.name}</p>
                    <p class="flex flex--a-center container__main__center__covers__item__add-song" data-albumid="${album.id}" data-albumcover="${album.cover}">
                        <svg class="image--icon" style="margin-right: 1rem;">
                            <use href="#add"></use>
                        </svg>
                        <span>Add song</span>
                    </p>
                </div>
            </div>
        `
    })

    return formated;
}

export const formatEventsForOrganizer = (events) => {
    let formated = '';

    events.forEach(_event => {
        formated += `
            <div class="events-container__list__item flex" style="margin-bottom: 1rem;">
                <div class="events-container__list__item__back image--back" style="background-image: url('/assets/uploads/covers/${_event.cover}');"></div>
                <div class="events-container__list__item__details flex flex--j-space-between" style="flex-direction: column;">
                    <div>
                        <h4>${_event.name}</h4>
                        <p>${_event.location}</p>
                        <p>${getStaticDate(_event.start_date)}</p>
                    </div>
                    <div>
                        <p data-inviteid="${_event.id}"><a href="/organizer/events/manage?e=${_event.id}">Manage</a></p>
                    </div>
                </div>
            </div>
        `
    });

    return formated;
}

export const formatEventsForHome = (events) => {
    let formated = '';

    events.forEach(_event => {
        formated += `
            <div class="events-container__list__item flex" style="margin-bottom: 1rem;">
                <div class="events-container__list__item__back image--back" style="background-image: url('/assets/uploads/covers/${_event.cover}');"></div>
                <div class="events-container__list__item__details flex flex--j-space-between" style="flex-direction: column;">
                    <a href="/event/view?e=${_event.id}">
                        <h4>${_event.name}</h4>
                        <p>${_event.location}</p>
                        <p>${getStaticDate(_event.start_date)}</p>
                    </a>
                </div>
            </div>
        `
    });

    return formated;
}

export const formatInvitationsForArtists = (events) => {
    let formated = '';

    events.forEach(_event => {
        let options = 
            `<p data-inviteid="${_event.id}" style="cursor: pointer;"><span class="accept-invite" style="color: #3dbc3d; margin-right: 1rem;">Accept</span><span class="decline-invite" style="color: #ff8787;">Decline</span></p>`;
            
        formated += `
            <div class="events-container__list__item flex" style="margin-bottom: 1rem;">
                <div class="events-container__list__item__back image--back" style="background-image: url('/assets/uploads/covers/${_event.cover}');"></div>
                <div class="events-container__list__item__details flex flex--j-space-between" style="flex-direction: column;">
                    <div>
                        <h4>${_event.name}</h4>
                        <p>${getStaticDate(_event.start_date)}</p>
                    </div>
                    <div>
                        <p>${_event.status}</p>
                        ${ options }
                    </div>
                </div>
            </div>
        `
    });

    return formated;
}

export const formatInvitationsForOrganizer = (invites) => {
    let formated = '';

    invites.forEach(invite => {
        formated += `
             <ul class="table__body__row table__body__row--route" data-routeid="${invite.id}">
                <li class="table__body__row__item">${invite.stage_name}</li>
                <li class="table__body__row__item">${invite.email}</li>
                <li class="table__body__row__item">${invite.status}</li>
            </ul>
        `
    });

    return formated;
}

export const formatForHome = (invites) => {
    let formated = '';

    invites.forEach(invite => {
        formated += `
            <div class="invite">
                <div class="invite__profile image--back image--round" style="flex: 0 0 33%;  width: 12rem; height: 12rem;background-image: url('/assets/uploads/profile/default.jpg');"></div>
                <div class="invite__details">
                    <h4 style="text-align: center;">${invite.stage_name}</h4>
                </div>
            </div>
        `
    });

    return formated;
}

export const formatSongsForArtist = (songs) => {
    let formated = '';

    songs.forEach((song) => {
        formated += `
            <div class="container__main__center__covers__item">
                <div class="container__main__center__covers__item__back image--back" style="position: relative; background-image: url('/assets/uploads/covers/${song._album_cover || song.cover}');">
                    <svg class="container__main__center__covers__item__back__del image--icon pos--abs" data-songid="${song.id}" style=" cursor: pointer; right: .8rem; bottom: .8rem;">
                        <use href="#trash"></use>
                    </svg>

                    <a href="/listen?s=${song.id}" >
                        <svg class="image--icon pos--abs pos--center">
                            <use href="#play"></use>
                        </svg>
                    </a>
                </div>
                <div class="container__main__center__covers__item__details">
                    <p><a href="/listen?s=${song.id}" >${song.name} | ${song.album_id ? song._album_name : 'Single'}</a></p>
                </div>
            </div>
        `
    })

    return formated;
}

export const formatSongsForHome = (songs) => {
    let formated = '';

    songs.forEach(song => {
        formated += `
            <div class="song">
                <div class="song__background image--back pos--rel" style="background-image: url('/assets/uploads/covers/${song._album_cover || song.cover}');">
                    <a href="/listen?s=${song.id}" >
                        <svg class="image--icon pos--abs pos--center">
                            <use href="#play"></use>
                        </svg>
                    </a>
                </div>
                <div class="song__details">
                    <h4>${song.name} | ${song.album_id ? song._album_name : 'Single'}</h4>
                    <p>${song.stage_name}</p>
                    <p>${song.genre}</p>
                </div>
            </div>
        `
    });

    return formated;
}

export const formatSongsForNext = (songs) => {
    let formated = '';

    songs.forEach(song => {
        formated += `
            <a href="/listen?s=${song.id}" class="song flex">
                <div class="pos--rel song__thumbnail image--back" style="background-image: url('/assets/uploads/covers/${song._album_cover || song.cover}')">
                    <svg class="image--icon pos--abs pos--center">
                        <use href="#play"></use>
                    </svg>
                </div>
                <div class="song__details">
                    <h4>${song.name} | ${song.album_id ? song._album_name : 'Single'}</h4>
                    <p>${song.stage_name}</p>
                </div>
            </a>
        `;
        
    });

    return formated;
}

export const formatArtistSelect = (artists) => {
    let formated = '<option value="select">Select</option>';

    let temp = [], dic = {}

    artists.forEach(artist => {
        dic[artist.stage_name] = artist.id
        temp.push(artist.stage_name)
    })

    temp.sort().forEach(artist => {
        formated += `<option value="${dic[artist]}">${artist}</option>`;
    });

    return formated;
}