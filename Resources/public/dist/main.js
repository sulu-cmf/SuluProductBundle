require.config({paths:{suluproduct:"../../suluproduct/js"}}),define({name:"SuluProductBundle",initialize:function(a){"use strict";var b=a.sandbox;a.components.addSource("suluproduct","/bundles/suluproduct/js/components"),b.mvc.routes.push({route:"pim/products",callback:function(){this.html('<div data-aura-component="products@suluproduct" data-aura-display="list"/>')}}),b.mvc.routes.push({route:"pim/products/:locale/add/type::type",callback:function(a,b){this.html('<div data-aura-component="products@suluproduct" data-aura-display="form" data-aura-locale="'+a+'" data-aura-product-type="'+b+'"/>')}}),b.mvc.routes.push({route:"pim/products/:locale/edit::id/:content",callback:function(a,b){this.html('<div data-aura-component="products@suluproduct" data-aura-display="form" data-aura-locale="'+a+'" data-aura-id="'+b+'"/>')}}),b.mvc.routes.push({route:"pim/products/import",callback:function(){this.html('<div data-aura-component="products@suluproduct" data-aura-display="import"/>')}}),b.mvc.routes.push({route:"pim/attributes",callback:function(){this.html('<div data-aura-component="attributes@suluproduct" data-aura-display="list"/>')}}),b.mvc.routes.push({route:"pim/attributes/:locale/add",callback:function(a){this.html('<div data-aura-component="attributes@suluproduct" data-aura-display="form" data-aura-locale="'+a+'"/>')}}),b.mvc.routes.push({route:"pim/attributes/:locale/edit::id/:details",callback:function(a,b){this.html('<div data-aura-component="attributes@suluproduct" data-aura-display="form" data-aura-locale="'+a+'" data-aura-id="'+b+'"/>')}})}});