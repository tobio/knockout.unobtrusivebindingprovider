(function (ko, $) {
    var bindings,
        reBindingClassPrefix = /(?:^|\s)ko-/;

    function hasBindings(node) {
        return node.className && !!node.className.match(reBindingClassPrefix);
    }

    function getBindings(node, bindingContext) {
        var nodeBindings = {},
            $node = $(node);

        $.each(bindings, function (selector, binding) {
            if ($node.is(selector)) {
                if ($.isFunction(binding)) binding = binding.call(bindingContext.$data);
                nodeBindings = $.extend(nodeBindings, binding);
            }
        });

        return nodeBindings;
    }

    function setBindings(b) { bindings = b; }

    ko.bindingProvider.instance = {
        nodeHasBindings: hasBindings,
        getBindings: getBindings,
        setBindings: setBindings
    };
})(ko, jQuery);