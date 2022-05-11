const fetch = require('node-fetch');

// Replace this with you api's base URI
const BASE_URI = 'https://api.clickfunnels.com/api';


/**

 * @param token - Snazzy Contacts token required for authentication
 * @param snapshot - current state of snapshot
 * @return {Object} - Array of person objects
 */
async function getObjects(token, snapshot) {
  try {
    const response = await fetch({
      method: 'GET',
      uri: `${BASE_URI}/attributes/contacts.json`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      console.error('Could not fetch contacts!');
      console.error('Status: ', response.status);
      console.error(response.text());
      return [];
    }

    const contacts = response.json();

    // Filter out all entries that are older than the snapshot
    const entries = contacts.filter(entry => entry.updated_at > snapshot.lastUpdate);

    return entries;
  } catch (e) {
    console.error(e);
    return [];
  }
}


module.exports = { getObjects, upsertObject, getToken };
