$('.selectpicker').selectpicker({
    style: 'btn-info',
    size: 4
});
$('.rating').rating({
    extendSymbol: function(rate) {
        $(this).tooltip({
            container: 'body',
            placement: 'bottom',
            title: 'Rate ' + rate
        });
    }
});

function doSomething() {
    alert('I am so good at naming things.');
}