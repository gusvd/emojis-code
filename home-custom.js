////////////////////////////////////////////////
// Algolia
////////////////////////////////////////////////
const searchClient = algoliasearch('OCUTWK8OFD', '721e9f1972bc892174d0794ddc9a306d');

const search = instantsearch({
  indexName: 'weheartemojis',
  searchClient,
  searchParameters: {
  },
});

search.addWidgets([
 instantsearch.widgets.configure({
    hitsPerPage: 96
  }),
  instantsearch.widgets.searchBox({
    container: '#input-container',
    placeholder: 'Search emojis, symbols, occasions, emotions...',
    autofocus: true,
    showSubmit: false,
    showReset: false,
    cssClasses: {
    	input: 'search-input',
    }
	}),
	instantsearch.widgets.hits({
   container: '#results-container',
   cssClasses: {
    root: 'results-wrapper',
    list: 'emoji-wrapper',
    item: 'emoji',
   },
   templates: {
     item: `
     <a
     href="#"
     class="emoji-link"
     style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
         rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
       transform-style: preserve-3d;
     ">
     {{ symbol }}
     </a>`
    }
  })
]);

search.start();

////////////////////////////////////////////////
// Algolia categories query
////////////////////////////////////////////////

const searchAnimals = instantsearch({
  indexName: 'weheartemojis',
  searchClient,
  searchParameters: {
  },
});

searchAnimals.addWidgets([
 instantsearch.widgets.configure({
    hitsPerPage: 48,
    filters: '(group:Animals & Nature'
  }),
	instantsearch.widgets.hits({
   container: '#animals',
   cssClasses: {
    root: 'results-wrapper',
    list: 'emoji-wrapper',
    item: 'emoji',
   },
   templates: {
     item: `
     <a
     href="#"
     class="emoji-link"
     style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
         rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
       transform-style: preserve-3d;
     ">
     {{ symbol }}
     </a>`
    }
  })
]);

searchAnimals.start();


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