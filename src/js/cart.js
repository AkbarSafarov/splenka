document.addEventListener('DOMContentLoaded', function(){
    let itemTooltip;
    document.querySelectorAll('.cart-header-btns > a').forEach(function(item){
        itemTooltip = item.dataset.tooltip;
        
        if(itemTooltip) {
            tippy(item, {
                theme: 'light',
                content: itemTooltip,
                placement: 'bottom',
                arrow: true, 
            });
        }
    })

    const fizCheckbox = document.querySelector('input[name="fiz"]');
    const yurCheckbox = document.querySelector('input[name="yur"]');

    if(fizCheckbox && yurCheckbox) {
        const innField = document.querySelector('.inn-field');

        function toggleFields(e) {
            if (e.target === fizCheckbox) {
                yurCheckbox.checked = false;
                innField.classList.add('d-none');
            } else if (e.target === yurCheckbox) {
                fizCheckbox.checked = false;
                innField.classList.remove('d-none');
            }
        }

        fizCheckbox.addEventListener("change", toggleFields);
        yurCheckbox.addEventListener("change", toggleFields);

        fizCheckbox.checked = true;
        innField.classList.add('d-none');
    }

    const orderLabel = document.querySelectorAll('.jsOrderLabelHead');

    if(orderLabel.length) {
        orderLabel.forEach(head => {
            head.addEventListener('click', function () {
                const parent = this.closest('.order__item-label.block');
                const allBlocks = document.querySelectorAll('.order__item-label.block');

                allBlocks.forEach(block => {
                    if (block === parent) {
                        block.classList.toggle('active');
                    } else {
                        block.classList.remove('active');
                    }
                });
            });
        });
    }

    const orderPayments = document.querySelectorAll('.order__item-labels-payment .order__item-label');

    if(orderPayments.length) {
        orderPayments.forEach(head => {
            head.addEventListener('click', function () {
                const allBlocks = document.querySelectorAll('.order__item-labels-payment .order__item-label');
                allBlocks.forEach((el) => el.classList.remove('active'));
                head.classList.add('active')
            });
        });
    }

    if(document.querySelector('.tooltip-item')) {
        let itemTooltipDelivery;

        document.querySelectorAll('.tooltip-item').forEach(function(item){
            itemTooltipDelivery = item.dataset.tooltip;

            if(itemTooltipDelivery) {

                tippy(item, {
                    theme: 'light',
                    allowHTML: true,
                    content: itemTooltipDelivery,
                    placement: 'top',
                    arrow: true, 
                });
            }
        })
    }
});

$(function(){
    if($('.cart_page').length > 0){
        $('.select-all-cart-items').on('click', function(){
            $(this).toggleClass('selected');
            let isActive = $(this).hasClass('selected');
            if(isActive) {
                $('.cart-item').addClass('selected');
            } else {
                $('.cart-item').removeClass('selected');
            }
        })

        $('.cart-item .custom-checkbox').on('click', function(){
            $(this).closest('.cart-item').toggleClass('selected');
            let allItems = $('.cart-item').length;
            let selectedItems = $('.cart-item.selected').length;
            if(allItems === selectedItems) {
                $('.select-all-cart-items').addClass('selected');
            } else {
                $('.select-all-cart-items').removeClass('selected');
            }
        })

        $('.cart-item__amount-input input').on('change keyup', function(){
            let val = $(this).val();
            val = val.replace(/\D/g, '');
            if(val == 1) {
                $(this).closest('.cart-item__amount').find('.cart-item__minus-btn').addClass('hide');
                $(this).closest('.cart-item__amount').find('.cart-item__delete-btn').removeClass('hide');
            } else {
                $(this).closest('.cart-item__amount').find('.cart-item__minus-btn').removeClass('hide');
                $(this).closest('.cart-item__amount').find('.cart-item__delete-btn').addClass('hide');
            }
        })

        $('.cart-item__plus-btn').on('click', function(){
            let input = $(this).closest('.cart-item__amount').find('.cart-item__amount-input input');
            let val = input.val();
            val = val.replace(/\D/g, '');
            val = parseInt(val) + 1;
            input.val(val);
            if(val > 1) {
                $(this).closest('.cart-item__amount').find('.cart-item__minus-btn').removeClass('hide');
                $(this).closest('.cart-item__amount').find('.cart-item__delete-btn').addClass('hide');
            }   
        })

        $('.cart-item__minus-btn').on('click', function(){
            let input = $(this).closest('.cart-item__amount').find('.cart-item__amount-input input');
            let val = input.val();
            val = val.replace(/\D/g, '');
            val = parseInt(val) - 1;
            if(val < 1) val = 1;
            input.val(val); 
            if(val == 1) {
                $(this).closest('.cart-item__amount').find('.cart-item__minus-btn').addClass('hide');
                $(this).closest('.cart-item__amount').find('.cart-item__delete-btn').removeClass('hide');
            }
        })

        $('.cart-item__delete-btn').on('click', function(){
            $(this).closest('.cart-item').remove();
            let allItems = $('.cart-item').length;
            let selectedItems = $('.cart-item.selected').length;
            if(allItems === selectedItems) {
                $('.select-all-cart-items').addClass('selected');
            } else {
                $('.select-all-cart-items').removeClass('selected');
            }
        })

        $('.promocode-input').on('change keyup', function(){
            let val = $(this).val();
            if(val.length > 2) {
                $(this).closest('.promocode-input-block').find('.promocode-input-btn').addClass('active');
            } else {
                $(this).closest('.promocode-input-block').find('.promocode-input-btn').removeClass('active');
            }
        })

        if($('.promocode-input').val().length) {
            $('.promocode-input-btn').addClass('promo-accepted');
        } else {
            $('.promocode-input-btn').removeClass('promo-accepted');
        }

        $('.promocode-input-btn').on('click', function(){
            $('.cart-total-block__items').addClass('loading');
        })

        $('.add-installation-btn').on('click', function(){
            $(this).toggleClass('active');
            $('.assembly-notice').slideToggle(200);
        });
    }
})
