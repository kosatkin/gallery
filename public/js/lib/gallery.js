var Gallery = function(options){
    this.settings = $.extend(true, {}, {
        containerId : null,
        url : '/board/index/list',
        template : '',
        margin : 10,

        cssClasses : {
            image : 'image'
        }

    }, options || {});

    this.init();
};

Gallery.prototype.container = null;
Gallery.prototype.dirStack = [];
Gallery.prototype.settings = {};

Gallery.prototype.col = [];

Gallery.prototype.init = function(){
    this.container = $('#' + this.settings.containerId);
    this.load();
};

Gallery.prototype.load = function() {
    var self = this;

    $.ajax({
        url : this.getRequestUrl(),
        method : "GET"
    })
        .success(function(response) {
            if(typeof response.status != "undefined") {
                if(response.status == 'OK') {
                    
                    self.col = [];
                    self.render(response.data);
                }
            }
        })
        .fail(function(){
            alert('Request failed');
        })
};

Gallery.prototype.render = function(data) {
    var self = this;
    var window_width = $(window).width() - 80;
    var max_col = Math.floor(window_width/210);
    var offset_left = Math.floor((window_width - 210*max_col + 80) / 2);
    var col = [];
    var margin = 10;

    this.container.html('');

    this.loadImg(data, 0);

};

Gallery.prototype.loadImg = function(data, index) {
    var self = this;

    var window_width = $(window).width() - 80;
    var max_col = Math.floor(window_width/210);
    var offset_left = Math.floor((window_width - 210*max_col + 80) / 2);

    var row = data[index];
    if(row && typeof row.path != "undefined" && row.path != null) {
        var el = $(this.settings.template);
        el.find('.title').text(row.filename);

        if(row.isDir) {
            el.bind('click', {dir : row.filename}, function(event) {
                event.preventDefault();
                self.dirStack.push(event.data.dir);

                // loading folder
                self.load();
            });

            if(index < data.length)
                this.loadImg(data, index+1);
        } else {
            el.find('.' + this.settings.cssClasses.image + ' img').bind('load', {index : index, data : data}, function(event) {

                var el_height=el.height();
                var min_t = 0;
                for(var j = 0; j < max_col; j++ ) {
                    if (typeof self.col[j] == "undefined") {
                        self.col.push(0);
                        min_t = j;
                        break;
                    }

                    if (self.col[min_t] > self.col[j])
                        min_t = j;
                }

                el.css({
                    "position" : "absolute",
                    "top" : self.col[min_t] + self.settings.margin,
                    "left" : min_t*el.width() + self.settings.margin*min_t + offset_left
                });

                self.col[min_t] += el_height + self.settings.margin;

                if(event.data.index < event.data.data.length)
                    self.loadImg(event.data.data, event.data.index+1);

            }).attr("src", row.path);

            el.find('.property').text('Size: '+row.size);
        }

        this.container.append(el);
    }
};

Gallery.prototype.getRequestUrl = function() {
    return this.settings.url + '/?path=' + this.dirStack.join('/');
};