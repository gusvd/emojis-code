const searchClient = algoliasearch('OCUTWK8OFD', '721e9f1972bc892174d0794ddc9a306d');

const search = instantsearch({
  indexName: 'weheartemojis',
  searchClient,
  searchParameters: {
    //query: 'lenovo',
    filters: 'brand:Samsung OR brand:Apple',
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
     style="
       transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
         rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
       transform-style: preserve-3d;
     ">
     {{ symbol }}
     </a>`
    }
  })
]);

search.start();