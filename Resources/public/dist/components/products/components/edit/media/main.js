define(["suluproduct/util/product-delete-dialog","services/product/product-media-manager"],function(a,b){"use strict";var c={instanceName:"documents",datagridInstanceName:"documents-list",formSelector:"#documents-form",fieldsKey:"productMedia",fieldsUrl:"api/products/media/fields"},d=function(a,b){return"api/products/"+a+"/media?flat=true&locale="+b},e=function(){this.sandbox.emit("husky.datagrid."+c.datagridInstanceName+".update"),l.call(this,this.saved,!0),this.sandbox.emit("sulu.labels.success.show","labels.success.save-desc","labels.success")},f=function(){this.options.data.attributes.status=this.status,l.call(this,!0)},g=function(a){this.options.data.attributes.status.id!==a.id&&(this.status=a,this.options.data.attributes.status=this.status,l.call(this,!0))},h=function(a){var b=a>0?"enable":"disable";this.sandbox.emit("husky.toolbar."+c.datagridInstanceName+".item."+b,"deleteSelected",!1)},i=function(a){this.media=a,this.sandbox.emit("sulu.header.toolbar.item.loading","save"),b.save(this.options.data.id,{mediaIds:this.sandbox.util.arrayGetColumn(a,"id")}).done(e.bind(this))},j=function(){this.sandbox.emit("sulu.header.toolbar.item.loading","save")},k=function(){this.options.data.attributes.status=this.status,this.sandbox.emit("sulu.products.save",this.options.data.attributes,!0),this.saved=!1},l=function(a,b){(b||a!==this.saved)&&(a?this.sandbox.emit("sulu.header.toolbar.item.disable","save",!0):this.sandbox.emit("sulu.header.toolbar.item.enable","save",!1)),this.saved=a},m=function(){this.sandbox.on("product.state.change",g.bind(this)),this.sandbox.on("sulu.toolbar.save",k.bind(this)),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.products.list")},this),this.sandbox.on("sulu.products.saved",f.bind(this)),this.sandbox.on("husky.datagrid."+c.datagridInstanceName+".number.selections",h.bind(this))},n=function(a){j.call(this);var c=[];_.each(a,function(a){c.push(b["delete"](this.options.data.id,a))}.bind(this)),this.sandbox.dom.when.apply(null,c).done(e.bind(this))},o=function(){var b=[];this.sandbox.emit("husky.datagrid."+c.datagridInstanceName+".items.get-selected",function(a){b=a}.bind(this)),a.showMediaRemoveDialog(this.sandbox,function(a){a&&(this.media=this.media.filter(function(a){return-1===b.indexOf(a.id)?a:void 0}),n.call(this,b))}.bind(this))},p=function(){this.sandbox.emit("sulu.media-selection-overlay."+c.instanceName+".set-items",this.media),this.sandbox.emit("sulu.media-selection-overlay."+c.instanceName+".open")},q=function(){return this.sandbox.sulu.buttons.get({edit:{options:{"class":"highlight",callback:p.bind(this)}},deleteSelected:{options:{callback:o.bind(this)}}})};return{view:!0,templates:["/admin/product/template/product/documents"],initialize:function(){this.saved=!1,this.media=this.options.data.attributes.media,this.status=this.options.data.attributes.status,this.sandbox.emit("product.state.change",this.status),l.call(this,!0),this.render(),m.call(this)},render:function(){this.html(this.renderTemplate(this.templates[0])),this.sandbox.once("husky.datagrid."+c.datagridInstanceName+".loaded",function(a){this.startSelectionOverlay(a._embedded.media)}.bind(this)),this.initList()},initList:function(){this.sandbox.sulu.initListToolbarAndList.call(this,c.fieldsKey,c.fieldsUrl+"?locale="+this.options.locale,{el:this.$find("#list-toolbar-container"),instanceName:c.datagridInstanceName,template:q.call(this),hasSearch:!0},{el:this.$find("#documents-list"),url:d(this.options.data.id,this.options.locale),searchInstanceName:c.datagridInstanceName,instanceName:c.datagridInstanceName,resultKey:"media",searchFields:["name","title","description"],viewOptions:{table:{selectItem:{type:"checkbox"}}}})},startSelectionOverlay:function(a){var b=this.sandbox.dom.createElement("<div/>");this.sandbox.dom.append(this.$el,b),this.sandbox.start([{name:"media-selection/overlay@sulumedia",options:{el:b,instanceName:c.instanceName,removeable:!1,preselected:a,locale:this.options.locale,saveCallback:i.bind(this)}}])}}});