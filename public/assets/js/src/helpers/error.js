export const showError = (id, error) => {
    $(`#${id}`).text(error);

    $(`#${id}`).show();
}