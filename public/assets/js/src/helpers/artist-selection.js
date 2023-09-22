export const createArtistItem = () => {
    const artistCount = parseInt($('#artist-count').val()) + 1;

    const itemTemplate = `
        <div class="input" id="artist-item-${artistCount}" style="margin-top: 1.4rem;">
            <label for="artist-${artistCount}" id="artist-${artistCount}-label">Artist: ${artistCount}</label>
            <div class="flex flex--a-center">
                <select id="artist-${artistCount}" class="artists__item" style="flex: 1;"></select>
                <svg class="image--icon" style="margin-left: 1rem; fill: #b68c8c;" id="delete-item-${artistCount}">
                    <use href="#cancel"></use>
                </svg>
            </div>
        </div>
    `

    const parent = $(`.artist-container`);

    $(itemTemplate).appendTo(parent);

    $(`#artist-${artistCount}`).html($(`#artist-1`).html())

    $(`#delete-item-${artistCount}`).on('click', (e) => {
        const itemId = e.currentTarget.id.split('-')[2];

        removeArtistItem(itemId);
    });

    $('#artist-count').val(artistCount);
};

const rename = (itemId, artistCount) => {
    itemId = parseInt(itemId);

    for (let i = artistCount; i > itemId; i--) {
        const oldId = i,
            currentId = oldId - 1;

        const item = $(`#artist-item-${oldId}`)[0];
        item.id = `artist-item-${currentId}`;

        const label = $(`#artist-${oldId}-label`)[0];
        $(label).attr('for', `#artist-${currentId}`);
        label.id = `artist-${currentId}-label`;
        label.innerText = `Artist: ${currentId}`;

        const select = $(`#artist-${oldId}`)[0];
        select.id = `artist-${currentId}`;

        const deleteBtn = $(`#delete-item-${oldId}`);
        deleteBtn[0].id = `delete-item-${currentId}`;

        // remove previous event, because it points to an old id
        deleteBtn.off('click');

        // set new event pointing to current event
        $(deleteBtn).on('click', () => {
            removeArtistItem(currentId);
        });
    }

    $('#artist-count').val(artistCount - 1);
};

export const removeArtistItem = (itemId) => {
    const artistCount = parseInt($('#artist-count').val());

    if (artistCount == 1)
        return;

    $(`#artist-item-${itemId}`).remove();

    rename(itemId, artistCount);
};