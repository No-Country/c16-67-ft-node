function calculateOffset(page, limit) {
    return (page - 1) * limit;
}

function getPagination(page,limit){
    let offset = 0;
    let pagination = {};

    if(page && limit) {
        offset = calculateOffset(page, limit);
        pagination = {
            offset, 
            limit
        };
    }
    return pagination;
}




module.exports = {
    getPagination
};