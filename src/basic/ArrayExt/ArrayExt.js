(function() {
    var p = Array.prototype

    if (p.whereEqual != undefined) {
        return; //防止重复定义
    }

    function define(name, func) {
        if (p[name] != null) {
            return;
        }
        try {
            Object.defineProperty(p, name, {
                value: func,
                enumerable: false
            })
        } catch (e) {

        }
    }

    define("countEqual", function(key, value) {

        return this.count(function(a) {
            return a[key] == value;
        });

    })
    define("count", function(callback) {
        var count = 0;
        for (var i = 0; i < this.length; i++) {
            var element = this[i];
            if (callback(element)) {
                count++;
            }
        }
        return count;
    })
    Object.defineProperty(p, 'single', {
        get: function() {
            return this[0];
        },
        enumerable: false
    })
    define("removeAll", function(value) {
        if (!(value instanceof Array)) {
            return
        }
        let removeList = value
        for (var i = 0; i < removeList.length; i++) {
            var element = removeList[i];
            var index = this.indexOf(element)
            if (index != -1) {
                this.splice(index, 1)
            }
        }
        return this;
    })
    define("remove", function(value) {
        var index = this.indexOf(value)
        if (index != -1) {
            this.splice(index, 1)
        }
        return this;
    })
    define("removeAt", function(value) {
        this.splice(index, 1)
        return this;
    })
    define("removeWhere", function(callback) {
        return this.removeAll(this.filter(callback))
    })
    var NULL = Symbol('null')
    define("max", function(callback) {
        if (this.length <= 0) {
            return undefined, undefined
        }
        var maxItem = NULL
        var maxValue = undefined
        for (var i = 0; i < this.length; i++) {
            var element = this[i];
            var value = callback(element)
            if (maxItem == NULL || maxValue < value) {
                maxItem = element
                maxValue = value
            }
        }
        if (maxItem == NULL) {
            maxItem = undefined
        }
        return maxItem;
    })
    define("min", function(callback) {
        if (this.length <= 0) {
            return undefined, undefined
        }
        var maxItem = NULL
        var maxValue = undefined
        for (var i = 0; i < this.length; i++) {
            var element = this[i];
            var value = callback(element)
            if (maxItem == NULL || maxValue > value) {
                maxItem = element
                maxValue = value
            }
        }
        if (maxItem == NULL) {
            maxItem = undefined
        }
        return maxItem;
    })
    define("destruct", function() {
        return [].concat(...this)
    })
    define("find", function(callback) {
        return this.where(callback).single
    })
})();