define(["config"],function(a){"use strict";var b={product:1,"product-with-variants":2,"product-addon":3,"product-set":4},c="#product-form",d={form:"/admin/product/template/product/form"},e={tagsId:"#tags",supplierId:"#supplierField",autocompleteSupplierInstanceName:"supplier"};return{templates:[d.form],initialize:function(){this.saved=!0,this.dfdFormIsSet=this.sandbox.data.deferred(),this.options.data?this.status=this.options.data.attributes.status:this.status=a.get("product.status.inactive"),this.sandbox.emit("product.state.change",this.status),this.initializeValidation(),this.bindCustomEvents(),this.setHeaderBar(!0),this.render(),this.listenForChange()},bindCustomEvents:function(){this.sandbox.on("product.state.change",function(a){this.options.data&&this.options.data.attributes.status&&this.options.data.attributes.status.id===a.id||(this.status=a,this.options.data.attributes.status=this.status,this.setHeaderBar(!1))},this),this.sandbox.on("sulu.toolbar.save",function(){this.save()}.bind(this)),this.sandbox.on("sulu.products.saved",function(){this.setHeaderBar(!0)},this)},initializeValidation:function(){this.sandbox.form.create(c)},save:function(){if(this.sandbox.form.validate(c)){var a,d=this.sandbox.form.getData(c);""===d.id&&delete d.id,d.status=this.status,d.tags=this.sandbox.dom.data(this.$find(e.tagsId),"tags"),!d.type&&this.options.productType&&(d.type={id:b[this.options.productType]}),a=this.sandbox.dom.attr("#"+e.autocompleteSupplierInstanceName,"data-id"),a&&"null"!==a&&(d.supplier={id:a}),this.sandbox.emit("sulu.products.save",d)}},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate(d.form,{contentLocale:this.options.locale})),this.initSupplierAutocomplete(),this.initForm(this.options.data),this.setTags();var a={};this.options.data&&(a=this.options.data.toJSON()),this.bindTagEvents(a)},setTags:function(){var a=this.sandbox.util.uniqueId();this.options.data&&this.options.data.id&&(a+="-"+this.options.data.id),this.autoCompleteInstanceName=a,this.dfdFormIsSet.then(function(){this.sandbox.start([{name:"auto-complete-list@husky",options:{el:"#tags",instanceName:this.autoCompleteInstanceName,getParameter:"search",itemsKey:"tags",remoteUrl:"/admin/api/tags?flat=true&sortBy=name&searchFields=name",completeIcon:"tag",noNewTags:!0}}])}.bind(this))},initForm:function(a){var b=this.sandbox.form.create(c);b.initialized.then(function(){this.setFormData(a)}.bind(this))},setFormData:function(a){a?this.sandbox.form.setData(c,a.toJSON()).then(function(){this.sandbox.start(c),this.dfdFormIsSet.resolve()}.bind(this)).fail(function(a){this.sandbox.logger.error("An error occured when setting data!",a)}.bind(this)):(this.sandbox.start(c),this.dfdFormIsSet.resolve())},bindTagEvents:function(a){a.tags&&a.tags.length>0&&this.sandbox.on("husky.auto-complete-list."+this.autoCompleteInstanceName+".initialized",function(){this.sandbox.emit("husky.auto-complete-list."+this.autoCompleteInstanceName+".set-tags",a.tags)}.bind(this))},initSupplierAutocomplete:function(){var b=a.get("sulucontact.components.autocomplete.default.account");b.el=e.supplierId,this.options.data&&this.options.data.attributes.supplier?b.value=this.options.data.attributes.supplier:b.value="",b.instanceName=e.autocompleteSupplierInstanceName,b.remoteUrl+="type=3",this.sandbox.start([{name:"auto-complete@husky",options:b}])},setHeaderBar:function(a){a!==this.saved&&(a?this.sandbox.emit("sulu.header.toolbar.item.disable","save",!0):this.sandbox.emit("sulu.header.toolbar.item.enable","save",!1)),this.saved=a},listenForChange:function(){this.sandbox.dom.on("#product-form","change",function(){this.setHeaderBar(!1)}.bind(this),"select"),this.sandbox.dom.on("#product-form","keyup",function(){this.setHeaderBar(!1)}.bind(this),"input, textarea"),this.sandbox.on("sulu.content.changed",function(){this.setHeaderBar(!1)}.bind(this)),this.sandbox.on("husky.select.status.selected.item",function(){this.setHeaderBar(!1)}.bind(this)),this.sandbox.on("husky.select.orderUnit.selected.item",function(){this.setHeaderBar(!1)}.bind(this)),this.sandbox.on("husky.select.contentUnit.selected.item",function(){this.setHeaderBar(!1)}.bind(this)),this.sandbox.on("husky.select.contentUnit.deselected.item",function(){this.setHeaderBar(!1)}.bind(this)),this.sandbox.on("husky.select.deliveryStatus.selected.item",function(){this.setHeaderBar(!1)}.bind(this)),setTimeout(function(){this.sandbox.on("husky.auto-complete-list."+this.autoCompleteInstanceName+".items-added",function(){this.setHeaderBar(!1)}.bind(this)),this.sandbox.on("husky.auto-complete-list."+this.autoCompleteInstanceName+".item-deleted",function(){this.setHeaderBar(!1)}.bind(this))}.bind(this),1e3)}}});