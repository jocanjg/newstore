/// === Awoke tooltips === ///
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

/// === Adding pop up div on page load === ///
window.addEventListener('load', function() {
    document.querySelector(".showcase").classList.add("showDiv");
});

$('.close-icon').on('click',function() {
    $(this).closest('.showcase').css('display','none');
})
