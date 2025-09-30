---
uglify: true
---
var BASE_URL = window.location.protocol + '//' + window.location.host;

$(function() {
	// sending contact info    
  Parse.initialize("fKeeCMQcEkzbuyOl03VCUeJtLDKW41hl0AtfmcXQ", "zoc7R9wnn4liEjHquFzjDIjOXrUM3P0bcWx7JLWc");

	/* Scroll to Top */
	$(".totop").hide();

    var lastScrollTop = 0,
        $navbar = $('#main-navbar'),
        $about_subnav = $('#about-nav');
    $(window).scroll(function() {
    // handle event for subnac in about page
    // style header when scroll down
    var st = $(this).scrollTop();
    if(st>lastScrollTop) {
        $navbar.addClass('style-scroll-down');
    } else {
        $navbar.removeClass('style-scroll-down');
    }

    if($(this).scrollTop() > 620) {
      $about_subnav.addClass('f-about-subnav'); 
    } else {
      $about_subnav.removeClass('f-about-subnav');
    }
		if ($(this).scrollTop() > 300) {
			$('.totop').slideDown();
		} else {
			$('.totop').slideUp();
		}
	});

	$('.totop a').click(function (e) {
		e.preventDefault();
		$('body,html').animate({scrollTop: 0}, 500);
	});

	
	

    PIPEDRIVE_KEY   = 'beec9d45000d9c8bc89cff1df7fe5fe57ccd2041';

    jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
        phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
    });

    /**
     * The form submit handle
     * This is working with Pine and Parse
     * @param  {[type]} form [description]
     * @return {[type]}      [description]
     */
    var submitHandler = function(form) {
        var $contactForm    = $(form),
            _firstName      = $.trim($contactForm.find('input[name=firstname]').val()),
            _lastName       = $.trim($contactForm.find('input[name=lastname]').val()),
            _email          = $.trim($contactForm.find('input[name=email]').val()),
            _company        = $.trim($contactForm.find('input[name=company]').val()),
            _request        = '',
            _phone          = $.trim($contactForm.find('input[name=phone]').val()),
            _requestTrial   = false,
            $submitButton   = $contactForm.find('button[type=submit]');
        
        
        // show indicator and disable the submit button while processing
        $submitButton
        .attr('disabled', true)
        .removeClass('hide-loading-state');            
        
        if ($contactForm.attr('id') === 'contact') {
            
            _request        = $.trim($contactForm.find('textarea[name=request]').val());
            _requestTrial   = false;

        } else {

            _request        = $.trim($contactForm.find('select[name=about]').val());
            _requestTrial   = true;
        }
        

        // checking the company name is existed or not
        $.ajax({
            url: 'https://api.pipedrive.com/v1/organizations/find',
            dataType: 'json',
            data: {
                term: _company,
                start: 0,
                api_token: PIPEDRIVE_KEY
            },
            success: function(response) {
                if (response.success) {
                    // in case the company name is not existed
                    if (response.data === null) {
                        // create new company
                        $.ajax({

                            url: 'https://api.pipedrive.com/v1/organizations?api_token=' + PIPEDRIVE_KEY,
                            method: 'POST',
                            dataType: 'json',
                            data: {
                                name: _company
                            },
                            success: function(response) {
                                if (response.success) {
                                    var _companyID = response.data.id;
                                    createPerson(_companyID);
                                }
                            },
                            error: function() {
                                setContentForThanksModal('Sorry!', 'There is an error while sending your requests to us. Please try it later.');
                                $('#thanksModal').modal('show');
                            }
                        });

                    // if the company is existed already, just get the id    
                    } else {
                        var _companyID = response.data[0].id;
                        createPerson(_companyID);
                    }
                }
            },

            // show the error message if any problem
            error: function() {
                setContentForThanksModal('Sorry!', 'There is an error while sending your requests to us. Please try it later.');
                $('#thanksModal').modal('show');
            }
        });
        
        /**
         * Create the person object on Pigedrive
         * @param  {[type]} _companyID [description]
         * @return {[type]}            [description]
         */
        var createPerson = function(_companyID){
            var d = {
                    name: _firstName + ' ' + _lastName,
                    org_id: _companyID,
                    email: _email,
                    phone: _phone,
                    "7de1dfd897993aa83aa715d768290943dad086de":"132",
                    "c0bc3acc1ac02cd6e0d34016eb83f73ecc8a0154":"140"
                };

            d["48462cd976706d4272b3e2dc6aa94c48a144dc21"] = _requestTrial ? "156" : "155";

            $.ajax({
                url: 'https://api.pipedrive.com/v1/persons?api_token=' + PIPEDRIVE_KEY,
                method: 'POST',
                dataType: 'json',
                data: d,
                success: function(response) {
                    if (response && response.success) {
                        var _personID = response.data.id;
                        // create note for user
                        $.ajax({
                            url: 'https://api.pipedrive.com/v1/notes?api_token=' + PIPEDRIVE_KEY,
                            method: 'POST',
                            dataType: 'json',
                            data: {
                                content: _request,
                                person_id: _personID
                            },
                            success: function(response) {
                                if (response && response.success) {
                                    Parse.Cloud.run('contact', {
                                        name: _firstName + ' ' + _lastName,
                                        email: _email,
                                        phone: _phone,
                                        company: _company,
                                        title: _request,
                                        product: "Selerity Context on Symphony"
                                    }, function() {
                                        $contactForm.find('input, textarea, select').val('');
                                        setContentForThanksModal('Thank you!', 'A Selerity solutions representative will contact you shortly.');
                                        
                                        // hide the form
                                        _requestTrial ? $('#modal-request-private').modal('hide'): $('#modal-request').modal('hide');
                                    });

                                }
                            },
                            error: function() {
                                setContentForThanksModal('Sorry!', 'There is an error while sending your requests to us. Please try it later.');
                            }
                        });
                    }
                },
                error: function() {
                    setContentForThanksModal('Sorry!', 'There is an error while sending your requests to us. Please try it later.');
                }
            });
        };

        /**
         * Set content for the thanks/sorry popup and show it.
         * @param {[type]} title   [description]
         * @param {[type]} content [description]
         */
        var setContentForThanksModal = function(title, content) {
            $('#thanksModal').find('.modal-title').html(title);
            $('#thanksModal').find('.modal-body').html(content);
            $('#thanksModal').modal('show');
            $submitButton
            .attr('disabled', false)
            .addClass('hide-loading-state');
        };
    }
    
    // handle contact form
    $('#contact').validate({
        errorPlacement: function() {
        },

        highlight: function(element, errorClass, validClass) {
            $(element).parent().addClass('error');
        },

        unhighlight: function(element, errorClass, validClass) {
            $(element).parent().removeClass('error');
        },

        onfocusout: false,
        onclick: false,
        rules: {
            firstname: "required",
            lastname: "required",
            email: {
                required: true,
                email: true
            },
            company: "required"
        },

        invalidHandler: function() {
            console.log("There might something error");
        },

        submitHandler: submitHandler
    });


    // handle request private beta form
    $('#requestPrivateBeta').validate({
        errorPlacement: function() {
        },

        highlight: function(element, errorClass, validClass) {
            $(element).parent().addClass('error');
        },

        unhighlight: function(element, errorClass, validClass) {
            $(element).parent().removeClass('error');
        },

        onfocusout: false,
        onclick: false,
        rules: {
            firstname: "required",
            lastname: "required",
            email: {
                required: true,
                email: true
            },
            company: "required",
            about: "required"
        },

        invalidHandler: function() {
            console.log("There might something error");
        },

        submitHandler: submitHandler
    });



	/* SGI Product page */
	var
		$geographyBox = $('#geography-box'),
		$geographies = $geographyBox.find('.box-2'),
		$industryCoverage = $('#industry-coverage'),
		$pIndustries = $industryCoverage.find('.col-md-3'),
		$cIndustries = $industryCoverage.find('.radius'),
		$industryMetas = $('#industry-box').children('div');

	$geographyBox.on('click', '.box-2', function() {
		$geographies.removeClass('box-2-active').filter(this).addClass('box-2-active');
		$pIndustries.hide().filter('.' + this.id).show();
		$industryCoverage.find('img:visible').first().trigger('click');
	});

	$industryCoverage.on('click', 'img', function() {
		var $img = $(this);
		$cIndustries.removeClass('radius-active');
		$img.parent().addClass('radius-active');
		$industryMetas.hide().filter('#' + $img.attr('class')).show();
	});

	/* Careers page - Current Openings */
	$('#current-openings').load(BASE_URL + '/careers/current-openings.html');
});

