/** 
   Virtual element support has been taken from knockout. 
   https://github.com/SteveSanderson/knockout/blob/master/src/virtualElements.js
*/
(function (ko, $) {
    var bindings,
        reBindingClassPrefix = /(?:^|\s)ko-/,
        commentNodesHaveTextProperty = document.createComment("test").text === "<!--test-->",
        startCommentRegex = commentNodesHaveTextProperty ? /^<!--\s*ko\s+ko:\s+(.*)\s*-->$/ : /^\s*ko\s+ko:\s+(.*)\s*$/;

    function virtualNodeBindingClasses(node) {
        var match = (commentNodesHaveTextProperty ? node.text : node.nodeValue).match(startCommentRegex);

        return match ? match[1] : null;
    }

    function hasBindings(node) {
        switch (node.nodeType) {
            case 1: return node.className && node.className.match && !!node.className.match(reBindingClassPrefix); // Element
            case 8: return virtualNodeBindingClasses(node) !== null;
            default: return false;
        }
    }

    function getBindingsForElement($node, bindingContext) {
        var nodeBindings = {};

        $.each(bindings, function (selector, binding) {
            if ($node.is(selector)) {
                if ($.isFunction(binding)) binding = binding.call(bindingContext.$data, bindingContext.$parent, bindingContext.$parents, bindingContext.$index);
                nodeBindings = $.extend(nodeBindings, binding);
            }
        });

        return nodeBindings;
    }

    function getBindingsForComment(bindingClasses, bindingContext) {
        var $worker = $('<div />').addClass(bindingClasses);

        return getBindingsForElement($worker, bindingContext);
    }

    function getBindings(node, bindingContext) {
        switch (node.nodeType) {
            case 1: return getBindingsForElement($(node), bindingContext);
            case 8: return getBindingsForComment(virtualNodeBindingClasses(node), bindingContext);
            default: return null;
        }
    }

    function setBindings(b) { bindings = b; }

    ko.bindingProvider.instance = {
        nodeHasBindings: hasBindings,
        getBindings: getBindings,
        setBindings: setBindings
    };
})(ko, jQuery);
