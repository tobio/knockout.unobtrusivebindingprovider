knockout.unobtrusivebindingprovider
===================================

A little unobtrusive binding provider for knockout2.0.

Usage
-----

The binding provider will look for bindings on any element that has a class prefixed with 'ko-'.
Of course this should be configurable, but I'll fix that up shortly. 

As it stand the library will automatically set itself as the bindingProvider instance, 
however it has no knowledge of your bindings. Let's fix that:

```
ko.bindingProvider.instance.setBindings({
    '.ko-example': function() {
        return {
            text: model.exampleText(),
            click: submitMe
        };
    }
});
```

From the code, we're looking for an element matching '.ko-example', this can be any jQuery selected, that should be as flexible as anyone needs. 
For that element we're providing a text and click binding, pretty much identical syntax for the bindings as you would use in a data-bind attribute. 

Why the function? Well knockout listens to the observables in your model during the initial binding phase to determine dependancies, if you just set a plain old object literal then any calls on your models observables will happen at the wrong time (when the object is created rather than during the element binding) and knockout won't notice any of your dependancies. In some cases you won't need the function but it's easier to just have it all the time. 

