var mcards = {
	init : function() {
		mcards.csvInput = document.querySelector("#csv-input");
		if(localStorage.getItem(mcards.storageKey)) {mcards.allIssues = JSON.parse(localStorage.getItem(mcards.storageKey))}
		
		mcards.showIssues();
		mcards.initDragOnList();
		mcards.initDropOnPrint();
		mcards.initDropOnList();
		mcards.attachEvents();
	},
	attachEvents : function() {
		var importBtn = document.querySelector("#import-btn");

		addEvent(importBtn, 'click', function(){
			mcards.importFromCSV();
			location.reload();
		});

	},
	importFromCSV : function() {
		var json = CSV2JSON(mcards.csvInput.value);
		localStorage.setItem(mcards.storageKey, json);
		mcards.allIssues = JSON.parse(json);
	},
	showIssues : function() {
		// display template on the left
		var listHtml = "", list = document.querySelector("ul#list.issues"), print = document.querySelector("ul#print.issues");

		for (var i = 0, j = mcards.allIssues.length; i < j; i++) {
			listHtml += Handlebars.templates["single-issue"](mcards.allIssues["" + i + ""]);
		}
		list.innerHTML = listHtml;
	},
	toggleInput : function() {
		document.querySelector("import-panel")
	},

	initDragOnList : function() {
		var msie = /*@cc_on!@*/0;

		var issuesLeft = document.querySelectorAll('#left-panel > .issues > li'), el = null;
		for (var i = 0; i < issuesLeft.length; i++) {
			el = issuesLeft[i];

			//			el.setAttribute('draggable', 'true');

			addEvent(el, 'dragstart', function(e) {
				e.dataTransfer.effectAllowed = 'copy';
				// only dropEffect='copy' will be dropable
				e.dataTransfer.setData('Text', this.id);
				// required otherwise doesn't work
			});
		}
	},
	initDropOnPrint : function() {

		var print = document.querySelector('#print');

		addEvent(print, 'dragover', function(e) {
			if (e.preventDefault)
				e.preventDefault();
			// allows us to drop
			//this.className = 'over';
			e.dataTransfer.dropEffect = 'copy';
			return false;
		});

		// to get IE to work
		addEvent(print, 'dragenter', function(e) {
			//this.className = 'over';
			return false;
		});

		addEvent(print, 'dragleave', function() {
			//this.className = '';
		});

		addEvent(print, 'drop', function(e) {
			if (e.stopPropagation)
				e.stopPropagation();
			// stops the browser from redirecting...why???

			var el = document.getElementById(e.dataTransfer.getData('Text'));

			//el.parentNode.removeChild(el);

			//var y = yum.cloneNode(true);
			print.appendChild(el);

			return false;

		});
	},
	initDropOnList : function() {

		var print = document.querySelector('#list');

		addEvent(print, 'dragover', function(e) {
			if (e.preventDefault)
				e.preventDefault();
			// allows us to drop
			//this.className = 'over';
			e.dataTransfer.dropEffect = 'copy';
			return false;
		});

		// to get IE to work
		addEvent(print, 'dragenter', function(e) {
			//this.className = 'over';
			return false;
		});

		addEvent(print, 'dragleave', function() {
			//this.className = '';
		});

		addEvent(print, 'drop', function(e) {
			if (e.stopPropagation)
				e.stopPropagation();
			// stops the browser from redirecting...why???

			var el = document.getElementById(e.dataTransfer.getData('Text'));

			//el.parentNode.removeChild(el);

			//var y = yum.cloneNode(true);
			print.appendChild(el);

			return false;

		});
	},
	allIssues : {
	},
	csvInput : null,
	storageKey: "mcards-all"
}

function addEvent(el, type, fn) {
	if (el && el.nodeName || el === window) {
		el.addEventListener(type, fn, false);
	} else if (el && el.length) {
		for (var i = 0; i < el.length; i++) {
			addEvent(el[i], type, fn);
		}
	}
}