const functions = require('firebase-functions');
const algoliasearch=require('algoliasearch');

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;


const ALGOLIA_INDEX_NAME = 'markers';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

//const client = algoliasearch(APP_ID,ADMIN_KEY);
//const index= client.initIndex('markers');
/*
exports.addToIndex = functions.firestore.document('/markers/{markerId}')
.onCreate(snapshot=>{
  const data= snapshot.data();
  const objectID = snapshot.id;

  return index.addObject({...data,objectID});
});
*/

exports.onNoteCreated = functions.firestore.document('markers/{markerId}').onCreate((snap, context) => {
  // Get the note document
  const note = snap.data();

  // Add an 'objectID' field which Algolia requires
  note.objectID = context.params.noteId;

  // Write to the algolia index
  console.log('la data es',note);
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  return index.saveObject(note, { autoGenerateObjectIDIfNotExist: true }).then(({ objectIDs }) => {
    console.log('se creo el indice--->',objectIDs);
  }).catch(err=>{
    console.error('huboun error', err)
  });
});

