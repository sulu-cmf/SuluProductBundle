define(["config"],function(a){"use strict";var b="product",c="product-with-variants",d="product-addon",e="product-set",f={toolbarInstanceName:"productsToolbar",datagridInstanceName:"products"},g=function(a){this.sandbox.emit("sulu.products.new",a)},h=function(){this.sandbox.emit("husky.datagrid."+f.datagridInstanceName+".items.get-selected",function(b){this.sandbox.emit("sulu.products.workflow.triggered",{ids:b,status:a.get("product.status.active").id})}.bind(this))},i=function(){this.sandbox.emit("husky.datagrid."+f.datagridInstanceName+".items.get-selected",function(b){this.sandbox.emit("sulu.products.workflow.triggered",{ids:b,status:a.get("product.status.inactive").id})}.bind(this))},j=function(){this.sandbox.on("sulu.toolbar.add",function(){this.sandbox.emit("sulu.products.new")}.bind(this)),this.sandbox.on("sulu.product.workflow.completed",function(){this.sandbox.emit("husky.datagrid."+f.datagridInstanceName+".update")},this),this.sandbox.on("sulu.toolbar.delete",function(){this.sandbox.emit("husky.datagrid."+f.datagridInstanceName+".items.get-selected",function(a){this.sandbox.emit("sulu.products.delete",a)}.bind(this))},this),this.sandbox.on("husky.datagrid."+f.datagridInstanceName+".number.selections",function(a){var b=a>0?"enable":"disable",c=a>0?"husky-publish":"husky-deactivated";this.sandbox.emit("sulu.header.toolbar.item."+b,"productWorkflow",!1),this.sandbox.emit("sulu.header.toolbar.button.set","productWorkflow",{icon:c}),this.sandbox.emit("sulu.header.toolbar.item."+b,"deleteSelected",!1)},this),this.sandbox.on("sulu.toolbar.productWorkflow.active",h.bind(this)),this.sandbox.on("sulu.toolbar.productWorkflow.inactive",i.bind(this))},k=function(){return this.sandbox.sulu.buttons.get({settings:{options:{dropdownItems:[{type:"columnOptions"}]}}})},l=function(a){this.sandbox.emit("sulu.products.load",a)};return{view:!0,layout:{content:{width:"max"}},header:function(){return{title:"pim.products.title",toolbar:{buttons:this.sandbox.util.extend(!0,{add:{options:{dropdownItems:[{id:"add-product",title:this.sandbox.translate("products.add-product"),callback:g.bind(this,b)},{id:"add-product-with-variants",title:this.sandbox.translate("products.add-product-with-variants"),callback:g.bind(this,c)},{id:"add-product-addon",title:this.sandbox.translate("products.add-product-addon"),callback:g.bind(this,d)},{id:"add-product-set",title:this.sandbox.translate("products.add-product-set"),callback:g.bind(this,e)}]}},deleteSelected:{},productWorkflow:{}},a.get("product.toolbar.extension")||{})}}},templates:["/admin/product/template/product/list"],initialize:function(){this.render(),j.call(this)},renderGrid:function(){var b=k.call(this);this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/product/template/product/list")),this.sandbox.sulu.initListToolbarAndList.call(this,"productsFields","/admin/api/products/fields",{el:this.$find("#list-toolbar-container"),instanceName:f.toolbarInstanceName,inHeader:!0,template:b,groups:[{id:1,align:"left"},{id:2,align:"right"},{id:3,align:"left"}]},{el:this.sandbox.dom.find("#products-list",this.$el),url:"/admin/api/products?flat=true&status_id="+a.get("product.list.statuses.ids"),resultKey:"products",searchInstanceName:"productsToolbar",searchFields:["name","number","supplier"],instanceName:f.datagridInstanceName,actionCallback:l.bind(this)},"products","#products-list-info")},render:function(){this.renderGrid()}}});