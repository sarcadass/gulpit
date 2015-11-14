function File2(content) {
    this.content = content;
}

File2.prototype.getContent = function() {
    // Some comment here
    var theContent = this.content;

    return theContent;
};

var app = new File2('app');
console.log(app.getContent());
