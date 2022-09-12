////////////////////////////////////////////////
// Algolia
////////////////////////////////////////////////
const searchClient = algoliasearch(
  'OCUTWK8OFD',
  '721e9f1972bc892174d0794ddc9a306d'
);
const search = instantsearch({
  indexName: 'emojis',
  searchClient,
  searchParameters: {
    query: 'hearts',
    //filters: 'brand:Samsung OR brand:Apple',
  },
});
search.addWidget(
  instantsearch.widgets.hits({
    container: '#search-results',
    templates: {
      item: `
{{ symbol }}
`,
    },
  })
);

search.start();


////////////////////////////////////////////////
// clipboard.js
////////////////////////////////////////////////

var clipboard = new ClipboardJS('.emoji-link', {
    target: function(trigger) {
        return trigger;
    }
});
  
  clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

////////////////////////////////////////////////
// Reload webflow interactions
////////////////////////////////////////////////

search.on('render', () => {
  Webflow.require('ix2').init();
});