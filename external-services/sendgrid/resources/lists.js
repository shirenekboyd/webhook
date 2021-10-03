const sendGrid = require('../sendgrid-client-proxy');

function getAllLists() {
    return sendGrid.request({
        method: 'GET',
        url: '/marketing/lists'
    }).then(([response, body]) => {
        if (response.statusCode !== 200) {
            throw new Error('Get All Lists request failed!');
        }

        return body.result;
    });
}

function getListByName(listName) {
    return getAllLists().then((lists) => {
        return lists.find((list) => list.name === listName);
    });
}

module.exports = {
    getAllLists,
    getListByName
};
