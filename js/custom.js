$(".dropdown").each(function() {
    $(this).on("click", function(e) {
        // 收起其他菜单
        if (isMobile()) {
            $(".menu").find(".dropdown-menu").not($(this).children("div")).slideUp("fast");    
        } else {
            $(".menu-inner").find(".dropdown-menu").not($(this).children("div")).slideUp("fast");    
        }
        e.stopPropagation(); 
        var downmenu = $(this).children("div");
        // 展开菜单
        downmenu.slideToggle("fast");
        // 点击其他地方，隐藏菜单
        if (downmenu.is(":visible")) {
            $(document).one("click", function() {   
                downmenu.slideUp("fast");
            });
        }
    });
});

function isMobile(){
    return window.matchMedia("only screen and (max-width: 680px)").matches;
}

console.log('___  ___                                                        \n|  \\/  |                                                        \n| .  . | _   _   _ __ ___    ___  _ __ ___    ___   _ __  _   _ \n| |\\/| || | | | | \'_ ` _ \\  / _ \\| \'_ ` _ \\  / _ \\ | \'__|| | | |\n| |  | || |_| | | | | | | ||  __/| | | | | || (_) || |   | |_| |\n\\_|  |_/ \\__, | |_| |_| |_| \\___||_| |_| |_| \\___/ |_|    \\__, |\n          __/ |                                            __/ |\n         |___/                                            |___/\n\n我想把这些东西留下。');
