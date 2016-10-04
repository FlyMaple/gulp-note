(function () {
    function func1() {
        var count = 10;
        for (var i=0; i<count; i++) {
            console.log(i);
        }
        console.log('done');
    }

    setTimeout(func1, 1000);
})();