var ToDoList = function(name) {
    this.el = list = document.querySelector('[data-list="' + name +'"]');
    this.childs = this.el.querySelectorAll('li');
    this.lastRemoved = [];
   
    this.input = document.querySelector('[data-input="' + name +'"]');
    this.undoButton = document.querySelector('[data-undo="' + name +'"]');
   
    
    this.demoList = ["complete Challenge", "Finish Js", "Have hot coffee", "Code AGAIN", "Rest"];
    
    
    this.addEntry = function(entry) {
      this.el.innerHTML += '<li>' + entry + '</li>';
    }
    
    this.init = function() {
      this.removeEntry();
      this.addByInput();
      this.undoRemove();
      this.addByArray([]);
    }  
  }
  
  ToDoList.prototype.addByArray = function(array) {
    this.array = array;
    var list = this;
    array.forEach(function (item) {
      console.log(item);
      list.addEntry(item);
    });
  }
  
  ToDoList.prototype.addByInput = function() {
    this.input.addEventListener('keyup', function(e) {
      e.preventDefault();
      if(e.keyCode === 13 && e.target.value.length > 0) {
        this.addEntry(e.target.value);
        e.target.value = null;
      }
    }.bind(this));
  }
  
  ToDoList.prototype.removeEntry = function() {
    this.el.addEventListener('click', function(e) {
      if(e.target.nodeName === 'LI') {
        this.lastRemoved.push({action: 'remove', content: e.target});
       this.el.removeChild(e.target);
      }
    }.bind(this));
  }
  
  
  ToDoList.prototype.undoRemove = function() {
    this.undoButton.addEventListener('click', function(e) {
      e.preventDefault();
      var lastEntry = this.lastRemoved.pop();
      if(lastEntry && lastEntry.action === 'remove') {
        this.addEntry(lastEntry.content.innerText);
      } else {
        console.log("No last entry.");
      }
    }.bind(this));
  }
  
  var lists = {};
  
  lists.work = lists.work || new ToDoList('work').init();
  lists.private = lists.private || new ToDoList('private').init();
  