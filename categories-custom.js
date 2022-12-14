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
    Query: 'hands',
  },
});
search.addWidgets([
 instantsearch.widgets.configure({
    hitsPerPage: 96 // INCREASE TO 320
  }),
	instantsearch.widgets.hits({
   container: '#search-results',
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

// const searchAnimals = instantsearch({
//   indexName: 'emojisandsymbols',
//   searchClient,
//   searchParameters: {
//     Query: 'animals',
//   },
// });
// searchAnimals.addWidgets([
//   // instantsearch.widgets.configure({
//   //   hitsPerPage: 48
//   // }),
// 	instantsearch.widgets.hits({
//    container: '#animals',
//    cssClasses: {
//     root: 'results-wrapper',
//     list: 'emoji-wrapper',
//     item: 'emoji',
//    },
//    templates: {
//      item: `
//      <a
//      href="#"
//      class="emoji-link"
//      style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
//          rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
//        transform-style: preserve-3d;
//      ">
//      {{ symbol }}
//      </a>`
//     }
//   })
// ]);

// searchAnimals.start();


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