define(function(){"use strict";return{initialize:function(){this.bindCustomEvents(),"list"===this.options.display?this.renderList():"import"===this.options.display&&this.renderImport()},renderList:function(){var a=this.sandbox.dom.createElement('<div id="products-list-container"/>');this.html(a),this.sandbox.start([{name:"products/components/list@suluproduct",options:{el:a}}])},renderImport:function(){var a=this.sandbox.dom.createElement('<div id="products-import"/>');this.html(a),this.sandbox.start([{name:"products/components/import@suluproduct",options:{el:a}}])},bindCustomEvents:function(){this.sandbox.on("sulu.pim.products.import",function(){this.sandbox.emit("sulu.router.navigate","pim/products/import")}.bind(this))}}});