export const getQuery = (key) => {
    const query = new URLSearchParams(location.search)

    return query.get(key);
}