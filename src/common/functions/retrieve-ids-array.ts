export const retrieveIdsArray = (fields, elements) => {
    let result = [];

    if (fields.length == 0) return undefined;

    if (fields.length == 1) {
        elements.forEach((el) => {
            el[fields[0]].forEach((subEl) => {
                result.push(subEl.id);
            });
        });
    } else {
        const newFields = fields.slice(1, fields.length);

        elements.forEach((el) => {
            const ids = retrieveIdsArray(newFields, el[fields[0]]);
            result = result.concat(ids);
        });
    }

    return result;
};