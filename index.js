(function ($) {
    let sums = [],
        formula = [],
        calculator = $('.calculator'),
        topInfo = $('.top-info'),
        formulaText = $('.formula-text'),
        $this = $(this),
        ans,
		char,
		code,
        is = {
            open: () => calculator.hasClass('open'),
            leap: () => formulaText.hasClass('leap'),
            shift: () => calculator.hasClass('shift'),
            alpha: () => calculator.hasClass('alpha')
        };

    // Open Calculator Func
    function opCalcFunc() {
        if (!is.open()) {
            calculator.addClass('open');
            formulaText.addClass('leap');
        } else {
            if (!is.shift()) {
                aCFunc();
            } else {
                aCFunc('shift');
            }
        }
    }
    // Add Numbers Func
    function numFunc($this) {
        if (is.open()) {
            if (!is.leap()) {
                sums = [];
                formula = [];
                $('.result').text('');
                formulaText.addClass('leap');
            }
            if (is.shift()) {
                if ($this.children('.shift-btn').data('value')) {
                    sums.push($this.children('.shift-btn').data('value'));
                    formula.push($this.children('.shift-btn').text());
                    formulaText.text(formula.join(''));
                }
            } else if (is.alpha()) {
                if ($this.children('.alpha-btn').data('value')) {
                    sums.push($this.children('.alpha-btn').data('value'));
                    formula.push($this.children('.alpha-btn').text());
                    formulaText.text(formula.join(''));
                }
            } else {
                if ($this.children('.normal-btn').data('value') !== undefined) {
                    sums.push($this.children('.normal-btn').data('value'));
                    formula.push($this.children('.normal-btn').text());
                    formulaText.text(formula.join(''));
                }
            }
        }
    }
    // Add Signs Func
    function signFunc($this) {
        if (is.open()) {
            if (!is.leap()) {
                sums = [];
                formula = [];
                $('.result').text(eval(sums.join('')));
                sums.push(ans);
                formula.push('Ans');
                formulaText.text(formula.join(''));
                formulaText.addClass('leap');
            }
            if (is.shift()) {
                if ($this.children('.shift-btn').data('value')) {
                    sums.push($this.children('.shift-btn').data('value'));
                    formula.push($this.children('.shift-btn').text());
                    formulaText.text(formula.join(''));
                }
            } else if (is.alpha()) {
                if ($this.children('.alpha-btn').data('value')) {
                    sums.push($this.children('.alpha-btn').data('value'));
                    formula.push($this.children('.alpha-btn').text());
                    formulaText.text(formula.join(''));
                }
            } else {
                if ($this.children('.normal-btn').data('value')) {
                    sums.push($this.children('.normal-btn').data('value'));
                    formula.push($this.children('.normal-btn').text());
                    formulaText.text(formula.join(''));
                }
            }
        }
    }
    // Equality Func
    function eqlFunc() {
        try {
            if (is.leap()) {
                formulaText.removeClass('leap');
                ans = eval(sums.join(''));
            }
 $('.result').text(eval(sums.join('')));

        } catch (e) {
            formulaText.text(e.name);
            console.log(e.name);
            console.log(e.message);
        }
    }
    // All Clear Func
    function aCFunc(c = 'none') {

        if (is.open()) {
            if (!is.leap()) {
                formulaText.addClass('leap');
            }
            if (is.shift()) {
                if (c !== 'shift') {
                    calculator.removeClass('open');

                }
            }
        }
        sums = [];
        formula = [];
        formulaText.text(formula.join(''));
        $('.result').text(' ');
    }
    // Delete Last Char Func
    function delFunc() {
        if (is.leap()) {
            if (sums.length > 0) {
                if (sums[sums.length - 1].toString().length > 1) {
                    sums[sums.length - 1] = sums[sums.length - 1].substring(0, sums[sums.length - 1].length - 1);
                    formula[formula.length - 1] = formula[formula.length - 1].substring(0, formula[formula.length - 1].length - 1);
                } else if (sums[sums.length - 1].toString().length == 1) {
                    sums.pop();
                    formula.pop();
                }
            }
            formulaText.text(formula.join(''));
        }
    }
    // Add Ans Func
    function ansFunc() {
        if (!is.leap()) {
            formula = [];
            formulaText.text(formula.join(''));
            formulaText.addClass('leap');
        }
        sums = [];
        sums.push(ans);
        formula.push('Ans');
        formulaText.text(formula.join(''));
    }
    // Add Shift Mode
    function toglShift() {
        if (is.open()) {
            calculator.toggleClass('shift');
        }
    }
    // Add Alpha Mode
    function toglAlpha() {
        if (is.open()) {
            calculator.toggleClass('alpha');
        }
    }
    $(document).ready(function () {
        $(document).on('click', '.btn:not(.btn-shift)', () => {
            calculator.removeClass('shift');
        });
        $(document).on('click', '.btn:not(.btn-alpha)', () => {
            calculator.removeClass('alpha');
        });
        $(document).on('click keydown', () => {
            if (formulaText.width() >= topInfo.width()) {
                formulaText.removeClass('left').addClass('right');
            } else {
                formulaText.removeClass('right').addClass('left');
            }
        });
        $('.on').on('click', () => {
            opCalcFunc();
        });
        $('.number').on('click', function () {
            $this = $(this);
            numFunc($this);
        });
        $('.sign').on('click', function () {
            $this = $(this);
            signFunc($this);
        });
        $('.equal').on('click', () => {
            eqlFunc();
        });
        $('.ac').on('click', () => {
            aCFunc();
        });
        $('.del').on('click', () => {
            delFunc();
        });
        $('.ans').on('click', () => {
            ansFunc();
        });
        $('.btn-shift').on('click', () => {
            toglShift();
        });
        $('.btn-alpha').on('click', () => {
            toglAlpha();
        });
        $(document).on('keydown', e => {
            char = e.originalEvent.key;
            code = e.originalEvent.code;
            if (/[0-9.]/g.test(char)) {
                numFunc($('.' + code + ''));
            }
            if (/[/*-+%()]/g.test(char)) {
                signFunc($('.' + code + ''));
            }
            if (/(=|Enter)/g.test(char)) {
                eqlFunc();
            }
        });
    });
})(jQuery);
