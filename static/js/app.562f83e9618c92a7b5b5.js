webpackJsonp([1],{0:function(t,e){},"0H7O":function(t,e){},"7zck":function(t,e){},Gg6h:function(t,e){},J4hb:function(t,e){},KdL5:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("7+uW"),o=n("Zrlr"),i=n.n(o),s=n("wxAW"),a=n.n(s),c=new(function(){function t(){i()(this,t),this.env=null}return a()(t,[{key:"setEnv",value:function(t){this.env=t}},{key:"isDevMode",value:function(){return null===this.env||"development"===this.env.NODE_ENV}}]),t}()),l={name:"App",data:function(){return{items:[{title:"Config",icon:"dashboard",to:"config"},{title:"Main",icon:"question_answer",to:"main"}]}},methods:{switchComponent:function(t){this.$router.push(t)}},mounted:function(){c.setEnv(Object({NODE_ENV:"production"}))}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("v-content",[n("v-toolbar",{staticStyle:{"margin-bottom":"32px"}},[n("v-toolbar-side-icon"),t._v(" "),n("v-toolbar-title",[t._v("Github Visualization")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-toolbar-items",{staticClass:"hidden-sm-and-down"},[n("v-btn",{attrs:{flat:"",href:"https://github.com/ssthouse"}},[n("v-avatar",{attrs:{size:"42"}},[n("img",{attrs:{src:"https://avatars3.githubusercontent.com/u/10973821?s=460&v=4"}})]),t._v(" "),n("span",{staticStyle:{"margin-left":"8px"}},[t._v("About me")])],1),t._v(" "),n("v-btn",{attrs:{flat:"",href:"https://github.com/ssthouse/github-visualization"}},[n("v-avatar",{attrs:{size:"42"}},[n("img",{attrs:{src:"https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"}})]),t._v("\n          Source Code")],1)],1)],1),t._v(" "),n("v-container",{attrs:{fluid:""}},[n("router-view")],1)],1),t._v(" "),n("v-footer",{attrs:{app:""}})],1)},staticRenderFns:[]};var d=n("VU/8")(l,u,!1,function(t){n("Wg8g")},null,null).exports,h=n("/ocq"),f={name:"ProjectView",data:function(){return{g:null,height:700,areaScale:null,textScale:null,alphaScale:null,simulation:null,zoomFunc:null,updateTextLocation:null,div:null,showForkedRepo:!0,filteredRepositoryList:[],curShowProperty:"commit number",propertyList:["commit number","fork number","star number"],propertyLabelList:["Commit number","Fork number","Star number"]}},props:["repositoryList"],methods:{initChartContainer:function(){if(this.g)return this.div.selectAll("span").remove(),this.g.selectAll("circle").remove(),void this.g.attr("transform","scale(1)");var t=this.$d3.select("#projectViewSvg");this.g=t.append("g"),this.div=this.$d3.select("#projectViewDiv")},initScales:function(){this.areaScale=this.$d3.scaleSqrt().domain(this.$d3.extent(this.repositoryList,function(t){return t.count})).range([20,80]),this.textScale=this.$d3.scaleSqrt().domain(this.$d3.extent(this.repositoryList,function(t){return t.count})).range([6,24]),this.alphaScale=this.$d3.scaleLinear().domain(this.$d3.extent(this.repositoryList,function(t){return t.count})).range([.8,1])},forkFilter:function(t){return!!this.showForkedRepo||!t.isFork},startDisplay:function(){var t=this;this.initScales(),this.filteredRepositoryList=this.repositoryList.filter(this.forkFilter);var e=this,n=this.div.style("width");this.width=parseFloat(n.substr(0,n.length-2)),this.simulation=this.$d3.forceSimulation(this.filteredRepositoryList).force("charge",this.$d3.forceManyBody()).force("collide",this.$d3.forceCollide().radius(function(e){return t.areaScale(e.count)+3})).force("forceX",this.$d3.forceX(this.width/2).strength(.05)).force("forceY",this.$d3.forceY(this.height/2).strength(.05)).on("tick",function(){var t=e.$d3.zoomTransform(e.div);e.updateTextLocation();var n=e.div.selectAll("span").data(e.filteredRepositoryList);n.enter().append("span").merge(n).text(function(t){return t.name}).style("font-size",function(t){return e.textScale(t.count)+"px"}).style("left",function(n){return n.x-1.5*e.areaScale(n.count)/2*t.k+"px"}).style("top",function(n){return n.y-e.textScale(n.count)/2*t.k+"px"}).style("width",function(t){return 1.5*e.areaScale(t.count)+"px"}),n.exit().remove();var r=e.g.selectAll("circle").data(e.filteredRepositoryList);r.enter().append("circle").append("title").text(function(t){return"commit number: "+t.count}).merge(r).attr("cx",function(t){return t.x}).attr("cy",function(t){return t.y}).attr("r",function(t){return e.areaScale(t.count)}).style("opacity",function(t){return e.alphaScale(t.count)}).call(e.enableDragFunc()),r.exit().remove()}),this.enableDragFunc(),this.enableZoomFunc()},enableZoomFunc:function(){var t=this;this.zoomFunc=this.$d3.zoom().scaleExtent([.5,10]).on("zoom",function(){t.g.attr("transform",t.$d3.event.transform),t.div.selectAll("span").data(t.repositoryList).each(function(e){var n=t.$d3.select(this),r=n.style("left"),o=n.style("top");n.style("transform-origin","-"+r+" -"+o)}),t.div.selectAll("span").data(t.repositoryList).style("transform","translate("+t.$d3.event.transform.x+"px,"+t.$d3.event.transform.y+"px) scale("+t.$d3.event.transform.k+")")}),this.g.call(this.zoomFunc)},enableDragFunc:function(){var t=this,e=this;return this.updateTextLocation=function(){e.div.selectAll("span").data(e.repositoryList).each(function(t){var n=e.$d3.select(this),r=n.style("left"),o=n.style("top");n.style("transform-origin","-"+r+" -"+o)})},this.$d3.drag().on("start",function(e){t.$d3.event.active||t.simulation.alphaTarget(.3).restart(),e.fx=t.$d3.event.x,e.fy=t.$d3.event.y}).on("drag",function(n){n.fx=t.$d3.event.x,n.fy=t.$d3.event.y,e.updateTextLocation()}).on("end",function(e){t.$d3.event.active||t.simulation.alphaTarget(0),e.fx=null,e.fy=null})},update:function(){this.initChartContainer(),this.startDisplay()}},watch:{repositoryList:{handler:function(t,e){this.update()},deep:!0},showForkedRepo:function(t,e){this.update()},curShowProperty:function(t){this.update()}},mounted:function(){this.update()}},v={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"projectView"}},[n("div",{attrs:{id:"projectViewContainer"}},[n("svg",{attrs:{id:"projectViewSvg"}}),t._v(" "),n("div",{attrs:{id:"projectViewDiv"}})]),t._v(" "),n("v-expansion-panel",{attrs:{id:"controlPanel"}},[n("v-expansion-panel-content",[n("div",{attrs:{slot:"header"},slot:"header"},[t._v("Control panel")]),t._v(" "),n("div",{attrs:{id:"content"}},[n("v-checkbox",{attrs:{label:"Show Forked Repository"},model:{value:t.showForkedRepo,callback:function(e){t.showForkedRepo=e},expression:"showForkedRepo"}}),t._v(" "),n("h3",[t._v(t._s("Use : "+t.curShowProperty))]),t._v(" "),n("v-radio-group",{model:{value:t.curShowProperty,callback:function(e){t.curShowProperty=e},expression:"curShowProperty"}},t._l(t.propertyList,function(e,r){return n("v-radio",{key:r,attrs:{label:t.propertyLabelList[r],value:e}})}))],1)])],1)],1)},staticRenderFns:[]};var p=n("VU/8")(f,v,!1,function(t){n("0H7O")},null,null).exports,m=n("U/Dg"),g=n("vwbq"),y=function(){function t(e){i()(this,t),this.containerId=e}return a()(t,[{key:"initScene",value:function(){var t=document.getElementById(this.containerId);this.scene=new m.Scene,this.camera=new m.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.z=200,this.renderer=new m.WebGLRenderer({alpha:!0}),this.renderer.setClearColor(15658734,.3),this.containerSize=t.getBoundingClientRect().width,this.renderer.setSize(this.containerSize,this.containerSize),t.appendChild(this.renderer.domElement);var e=new m.SpotLight(16777215);e.position.set(-40,60,100),this.scene.add(e),this.animate()}},{key:"testAddCube",value:function(){var t=new m.BoxGeometry(1,1,1),e=new m.MeshBasicMaterial({color:65280}),n=new m.Mesh(t,e);this.scene.add(n)}},{key:"addBall",value:function(t,e){var n=new m.SphereGeometry(5,32,32),r=new m.MeshLambertMaterial({color:16711680}),o=new m.Mesh(n,r);this.scene.add(o),o.position.set(t,e,0)}},{key:"animate",value:function(){var t=this;requestAnimationFrame(function(){return t.animate()}),this.renderer.render(this.scene,this.camera)}},{key:"drawProjects",value:function(t){var e=this;this.initScene(),this.reporitoryList=t,this.simulation=g.forceSimulation(this.reporitoryList).force("charge",g.forceManyBody()).force("collide",g.forceCollide().radius(40)).force("forceX",g.forceX(this.containerSize/2).strength(.05)).force("forceY",g.forceY(this.containerSize/2).strength(.05));var n=document.createElement("svg");g.select(n).selectAll("circle").data(this.reporitoryList).enter().each(function(){var t=g.select(this).datum();e.addBall(t.x,t.y)})}}]),t}(),w={data:function(){return{githubView:new y("view-container")}},props:["repositoryList"],methods:{logTest:function(){this.githubView.drawProjects(this.repositoryList)}},mounted:function(){}},b={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[e("div",{attrs:{id:"view-container"}}),this._v(" "),e("v-btn",{on:{click:this.logTest}},[this._v("show projects")])],1)},staticRenderFns:[]};var _=n("VU/8")(w,b,!1,function(t){n("J4hb")},"data-v-3f8c9e97",null).exports,L={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-chip",{staticClass:"label",attrs:{color:"blue","text-color":"white"}},[n("v-avatar",[n("v-icon",[t._v("account_circle")])],1),t._v(" "),n("strong",[t._v("People you follow:")])],1),t._v(" "),t._l(t.userList,function(e){return n("v-chip",{key:e.id,staticClass:"mouseHand",attrs:{selected:""},on:{click:function(n){t.chooseUser(e.username)}}},[n("v-avatar",{attrs:{color:"teal"}},[n("img",{attrs:{src:e.avatarUrl}})]),t._v("\n    "+t._s(""+e.username)+"\n  ")],1)})],2)},staticRenderFns:[]};var x=n("VU/8")({name:"users-card",data:function(){return{}},props:["userList"],methods:{chooseUser:function(t){this.$emit("selectUser",t)}},computed:{},created:function(){}},L,!1,function(t){n("KdL5")},"data-v-c89bb162",null).exports,U=n("//Fk"),k=n.n(U),S=n("mvHQ"),$=n.n(S),F=n("NYxO"),C={state:{domainName:"https://api.github.com/graphql",privateToken:"83f30f4332b2371486791b2fadd8f677f476a8c2"},mutations:{},actions:{}},R={state:{username:"ssthouse",avatarUrl:"https://assets-cdn.github.com/images/modules/logos_page/Octocat.png",follwerUserList:[],followingUserList:[],repositoryBeanList:[]},mutations:{updateUserInfo:function(t,e){t.avatarUrl=e.avatarUrl},updateUsername:function(t,e){t.username=e},updateRepositoryBeanList:function(t,e){t.repositoryBeanList=e},updateFollowingUserList:function(t,e){t.followingUserList=e},updateFollowerUserList:function(t,e){t.follwerUserList=e}},actions:{}};r.a.use(F.a);var j=new F.a.Store({modules:{gitlabConfig:C,userinfo:R}}),P=n("mtWM"),D=n.n(P).a.create({baseURL:"https://api.github.com/graphql",headers:{Authorization:"Bearer "+"e741155e35e144246dfe8e1afc09af750997de3b".split("").reverse().join("")}}),z=function t(e,n){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];i()(this,t),this.name=e,this.count=n,this.isFork=r},q=function t(e,n,r,o){i()(this,t),this.id=e,this.username=n,this.name=r,this.avatarUrl=o},A=function(){function t(){i()(this,t),this.store=j}return a()(t,[{key:"getRepositoryBeanListFromQuery",value:function(t){if(!t)return[];for(var e=[],n=t.user.repositories.nodes,r=0;r<n.length;r++){var o=n[r];o.ref&&e.push(new z(o.name,o.ref.target.history.totalCount,o.isFork))}return e}},{key:"getFollowingUserList",value:function(t){if(!t)return[];for(var e=[],n=t.user.following.nodes,r=0;r<n.length;r++){var o=n[r];e.push(new q(o.id,o.login,o.name,o.avatarUrl))}return e}},{key:"getFollowerUserList",value:function(t){if(t){for(var e=[],n=t.user.followers.nodes,r=0;r<n.length;r++){var o=n[r];e.push(new q(o.id,o.login,o.name,o.avatarUrl))}return e}}},{key:"getAllProjects",value:function(){var t=this,e={query:'query {\n        user(login: "'+this.store.state.userinfo.username+'") {\n          avatarUrl\n          name\n          followers(first: 100) {\n            nodes {\n              avatarUrl\n              name\n              id\n              login\n            }\n          }\n          following(first: 100) {\n            nodes {\n              avatarUrl\n              name\n              id\n              login\n            }\n          }\n          repositories(first: 100){\n            totalCount\n            pageInfo{\n              hasNextPage\n              endCursor\n            }\n            nodes{\n              id\n              name\n              isFork\n              ref(qualifiedName: "master") {\n                target {\n                  ... on Commit {\n                    history {\n                      totalCount\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }'};D.post("",$()(e)).then(function(e){var n=e.data.data.user;t.store.commit("updateUserInfo",{avatarUrl:n.avatarUrl}),t.store.commit("updateRepositoryBeanList",t.getRepositoryBeanListFromQuery(e.data.data)),t.store.commit("updateFollowerUserList",t.getFollowerUserList(e.data.data)),t.store.commit("updateFollowingUserList",t.getFollowingUserList(e.data.data))}).catch(function(t){console.log("~~~~~~~~~~~~~~~~error get all projects")})}},{key:"loadUserRepositoryList",value:function(t){var e=this,n={query:'query {\n        user(login: "'+t+'") {\n          repositories(first: 100){\n            totalCount\n            pageInfo{\n              hasNextPage\n              endCursor\n            }\n            nodes{\n              id\n              name\n              isFork\n              ref(qualifiedName: "master") {\n                target {\n                  ... on Commit {\n                    history {\n                      totalCount\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }'};return new k.a(function(t,r){D.post("",$()(n)).then(function(n){var r=e.getRepositoryBeanListFromQuery(n.data.data);t(r)}).catch(function(t){r(t)})})}}]),t}(),E=n("JnRc"),V=n.n(E),B=V.a.Object.extend("UserRecord"),N=new(function(){function t(){i()(this,t)}return a()(t,[{key:"addRecord",value:function(t){c.isDevMode()?console.log("emit user record in dev mode"):(new B).save({username:t}).then(function(t){console.log("save userName to leancloud")}).catch(function(t){console.log("error save user record to leancloud"),console.log(t)})}}]),t}()),M={name:"Main",components:{"project-view":p,"github-view-3d":_,"users-card":x},data:function(){return{projectDao:new A,username:"",userRecorder:N,repositoryList:[],use3D:!0}},computed:{avatarUrl:function(){return this.$store.state.userinfo.avatarUrl},followingUserList:function(){return this.$store.state.userinfo.followingUserList}},methods:{showProjects:function(){this.updateUrl(this.username),this.$store.commit("updateUsername",this.username),this.projectDao.getAllProjects(),this.userRecorder.addRecord(this.username)},selectUser:function(t){var e=this;this.projectDao.loadUserRepositoryList(t).then(function(t){e.repositoryList=t}).catch(function(t){console.log(t)})},updateUrl:function(t){this.$router.push({name:"main",query:{user:t}})},initUsernameFromUrl:function(){if(this.$router.currentRoute.query&&this.$router.currentRoute.query.user){var t=this.$router.currentRoute.query.user;this.username=t}}},watch:{"$store.state.userinfo.repositoryBeanList":{handler:function(t){this.repositoryList=t},deep:!0}},mounted:function(){this.username&&this.showProjects()},created:function(){c.setEnv(Object({NODE_ENV:"production"})),this.initUsernameFromUrl()}},T={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{md6:"","offset-md3":""}},[n("div",{staticClass:"flex-row"},[n("v-text-field",{staticClass:"input-group--focused",attrs:{label:"github usename"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),n("v-btn",{on:{click:t.showProjects}},[t._v("show")])],1)])],1),t._v(" "),n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{md6:"","offset-md3":"",xs12:""}},[n("v-card",{staticStyle:{width:"100%"}},[n("v-card-title",{staticClass:"action-title",attrs:{"primary-title":""}},[t._v("Support actions:")]),t._v(" "),n("div",{staticStyle:{display:"flex","flex-direction":"column"}},[n("v-chip",{attrs:{selected:""}},[n("strong",[t._v("Zoom by mouse wheel")])]),t._v(" "),n("v-chip",{attrs:{selected:""}},[n("strong",[t._v("Circles can be draged")])]),t._v(" "),n("v-chip",{attrs:{selected:""}},[n("strong",[t._v("Click following user's avatar to see their repositories")])]),t._v(" "),n("v-chip",{attrs:{selected:""}},[n("strong",[t._v("Hover on circle to see repository commit number")])]),t._v(" "),n("h3",{staticStyle:{"margin-top":"20px"}},[n("strong",[t._v("Hint: username is the last part of your github profile page:")]),t._v(" "),n("br"),t._v(" "),n("strong",[t._v("eg: https://github.com/ssthouse ==> ssthouse")])])],1)],1)],1),t._v(" "),n("v-flex",{staticStyle:{"margin-top":"20px","margin-bottom":"20px"},attrs:{md4:"","offset-md4":"",xs12:""}},[n("v-avatar",{staticClass:"grey lighten-4",attrs:{tile:!1,size:"120px"}},[n("img",{attrs:{src:t.avatarUrl,alt:"avatar"}})])],1)],1),t._v(" "),n("users-card",{attrs:{userList:t.followingUserList},on:{selectUser:t.selectUser}}),t._v(" "),n("v-switch",{attrs:{label:"Use 3D"},model:{value:t.use3D,callback:function(e){t.use3D=e},expression:"use3D"}}),t._v(" "),t.use3D?n("div",[n("github-view-3d",{attrs:{repositoryList:t.repositoryList}})],1):n("div",[n("project-view",{attrs:{repositoryList:t.repositoryList}})],1)],1)},staticRenderFns:[]};var O=n("VU/8")(M,T,!1,function(t){n("t3lJ")},"data-v-2e0ab024",null).exports,H={name:"Config",data:function(){return{projectDao:new A,domainName:this.$store.state.gitlabConfig.domainName,privateToken:this.$store.state.gitlabConfig.privateToken}},methods:{testConnection:function(){this.projectDao.getAllProjects()}}},I={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("\n  Config page:\n  "),n("v-text-field",{attrs:{label:"domain:",value:t.domainName}}),t._v(" "),n("v-text-field",{attrs:{label:"private token:",value:t.privateToken}}),t._v(" "),n("v-btn",{on:{click:function(e){t.testConnection()}}},[t._v("Test connection")])],1)},staticRenderFns:[]};var G=n("VU/8")(H,I,!1,function(t){n("Gg6h")},"data-v-852ba536",null).exports;r.a.use(h.a);var J=new h.a({routes:[{path:"/",redirect:"main"},{path:"/main",name:"main",component:O},{path:"/config",name:"config",component:G}]}),W=(n("7zck"),n("3EgV")),Y=n.n(W),K=n("8+8L"),X=new(function(){function t(){i()(this,t),this.APP_ID="86t8rMn6wqyJwqwFKsuBqjie-gzGzoHsz",this.APP_KEY="49cGO1dtTXdWqRlDJq8OarIb"}return a()(t,[{key:"init",value:function(){V.a.init({appId:this.APP_ID,appKey:this.APP_KEY})}}]),t}());r.a.use(K.a),r.a.use(Y.a),r.a.config.productionTip=!1,r.a.prototype.$axios=D,r.a.prototype.$d3=g,r.a.prototype.$leancloud=X,X.init(),new r.a({el:"#app",router:J,store:j,components:{App:d},template:"<App/>"})},Wg8g:function(t,e){},t3lJ:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.562f83e9618c92a7b5b5.js.map