define(["config"],function(a){"use strict";var b="#product-pricing-form",c="#prices",d=60,e=function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/product/template/product/pricing")),l.call(this),i.call(this,this.options.data),f.call(this,this.options.data)},f=function(a){var b={currencies:this.currencies,defaultCurrency:this.defaultCurrency,data:a,el:c};this.sandbox.start([{name:"price-list@suluproduct",options:b}])},g=function(){this.sandbox.on("sulu.header.toolbar.delete",function(){this.sandbox.emit("sulu.product.delete",this.sandbox.dom.val("#id"))}.bind(this)),this.sandbox.on("product.state.change",function(a){this.options.data.attributes.status&&this.options.data.attributes.status.id===a||(this.status={id:a},this.options.data.status=this.status,k.call(this,!1))},this),this.sandbox.on("sulu.header.toolbar.save",function(){h.call(this)},this),this.sandbox.on("sulu.products.saved",function(){k.call(this,!0)},this),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.products.list")},this),this.sandbox.on("sulu.product.set-currencies",function(a){this.currencies=a},this),this.sandbox.on("sulu.product.set-default-currency",function(a){this.defaultCurrency=a},this)},h=function(){if(this.sandbox.form.validate(b)){var a=this.sandbox.form.getData(b);a.status=this.status,this.sandbox.emit("sulu.products.save",a)}},i=function(a){var c=this.sandbox.form.create(b);c.initialized.then(function(){j.call(this,a)}.bind(this))},j=function(a){this.sandbox.form.setData(b,a.toJSON()).then(function(){this.sandbox.start(b)}.bind(this)).fail(function(a){this.sandbox.logger.error("An error occured when setting data!",a)}.bind(this))},k=function(a){if(a!==this.saved){var b=this.options.data&&this.options.data.attributes.id?"edit":"add";this.sandbox.emit("sulu.header.toolbar.state.change",b,a,!0)}this.saved=a},l=function(){var a="pim.product.title",b=[{title:"navigation.pim"},{title:"pim.products.title"}];this.options.data&&this.options.data.attributes.name&&(a=this.options.data.attributes.name),a=this.sandbox.util.cropTail(a,d),this.sandbox.emit("sulu.header.set-title",a),this.options.data&&this.options.data.attributes.number?b.push({title:"#"+this.options.data.attributes.number}):b.push({title:"pim.product.title"}),this.sandbox.emit("sulu.header.set-breadcrumb",b)},m=function(){this.sandbox.dom.on(b,"change",function(){k.call(this,!1)}.bind(this),"select"),this.sandbox.dom.on(b,"keyup",function(){k.call(this,!1)}.bind(this),"input, textarea"),this.sandbox.on("sulu.content.changed",function(){k.call(this,!1)}.bind(this)),this.sandbox.on("husky.select.tax-class.selected.item",function(){k.call(this,!1)}.bind(this))};return{name:"Sulu Product Pricing View",view:!0,templates:["/admin/product/template/product/pricing"],initialize:function(){this.status=this.options.data?this.options.data.attributes.status:a.get("product.status.active"),g.call(this),e.call(this),m.call(this)}}});