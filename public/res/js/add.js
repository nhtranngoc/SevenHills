$('.rating').rating({
    extendSymbol: function(rate) {
        $(this).tooltip({
            container: 'body',
            placement: 'bottom',
            title: 'Rate ' + rate
        });
    }
});