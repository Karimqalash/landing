/*   Project: Popup Lightbox 
 *   Author: Asif Mughal
 *   URL: www.codehim.com
 *   License: MIT License
 *   Copyright (c) 2019 - Asif Mughal
 */
/* File: jquery.popup.lightbox.js */
(function ($) {
	$.fn.popupLightbox = function (options) {

		var setting = $.extend({
			width: 560,
			height: 340,
			inAnimation: "ZoomIn",

		}, options);

		return this.each(function () {

			var target = $(this);

			var popupWindow = $section();

			var closeBtn = $button();

			var nextBtn = $button();

			var prevBtn = $button();

			var imgStat = $div();

			var imgFig = $figure();

			var capBar = $figcaption();

			var imgs = $(target).find("img");

			var totalImgs = imgs.length;

			var imgNum = 0;
			var current, thisCaption;


			$(nextBtn).addClass("btn-next")
				.appendTo(popupWindow);

			$(prevBtn).addClass("btn-prev")
				.appendTo(popupWindow);

			$(closeBtn).addClass("btn-close")
				.appendTo(popupWindow)
				.html("\&times;");

			$(imgStat).addClass("lightbox-status")
				.appendTo(popupWindow);


			$(imgFig).addClass("img-show")
				.appendTo(popupWindow);

			$(popupWindow).addClass("lightbox animated faster " + setting.inAnimation).appendTo("body");


			//set up unique number for each image 

			for (var i = 0; i < imgs.length; i++) {

				$(imgs).eq(i).attr({
					'data-num': i,
					'id': '#img' + i,
				});


			}

			if ($(window).width() > 620) {


				$(popupWindow).css({
					'width': '100%',
					'height': '100vh',
					'position': 'fixed',
					'top': '0',
					'left': '0',
					'zIndex': '999',
					'overflow': 'hidden',

				});

			} else {
				$(popupWindow).css({
					'width': '100%',
					'height': '100%',
					'top': 0,
					'left': 0,
				});


			}


			$(capBar).addClass("img-caption animated fadeInUp");


			$(imgs).click(function () {

				$(".stickyMenu").hide();

				var thisImg = $(this).clone();
				var thisNum = $(this).attr("data-num") * 1;
				var $caption = $(this).attr('alt');
				if ($(this).prop('alt') == false) {
					$caption = "This image has no caption";
				}


				imgNum = thisNum;

				if (thisNum + 1 == totalImgs) {
					$(nextBtn).hide();
					$(prevBtn).show();
				} else if (thisNum == 0) {
					$(prevBtn).hide();
					$(nextBtn).show();
				} else {
					$(nextBtn).show();
					$(prevBtn).show();
				}

				$(imgStat).html(thisNum + 1 + " / " + totalImgs);

				$(imgFig).html(thisImg)
					.parent().fadeIn();

				$(capBar).html($caption).appendTo(imgFig);

			});


			//Next image 

			$(nextBtn).click(function () {

				var y = totalImgs - 1;


				if (imgNum < y) {
					imgNum += 1;
				}

				if (imgNum + 1 == totalImgs) {
					$(nextBtn).hide();
				}

				$(prevBtn).fadeIn();


				$(imgFig).find("img").animate({
					'left': '-100%',
					'opacity': 0,
				}, 200, function () {

					$(imgFig).html($(imgs).eq(imgNum).clone());

					current = $(imgFig).find("img");

					thisCaption = $(current).attr("alt");

					if ($(current).prop('alt') == false) {
						thisCaption = "This image has no caption";
					}

					$(capBar).html(thisCaption).appendTo(imgFig);

					$(imgStat).html(imgNum + 1 + " / " + totalImgs);

				});


			});

			//Previous image 

			$(prevBtn).click(function () {


				if (imgNum > 0) {

					imgNum -= 1;
				}
				$(nextBtn).fadeIn();


				$(imgFig).find("img").animate({
					'right': '-100%',
					'opacity': 0,
				}, 200, function () {
					$(imgFig).html($(imgs).eq(imgNum).clone());

					current = $(imgFig).find("img");

					thisCaption = $(current).attr("alt");
					$(capBar).html(thisCaption).appendTo(imgFig);


					$(imgStat).html(imgNum + 1 + " / " + totalImgs);

				});

				if (imgNum == 0) {
					$(prevBtn).hide();
				}


			});


			function $div() {
				return document.createElement("div");
			}

			function $button() {
				return document.createElement("button");

			}

			function $section() {

				return document.createElement("section");

			}

			function $figure() {
				return document.createElement("figure");
			}

			function $figcaption() {
				return document.createElement("figcaption");

			}


			$(".btn-close").click(function () {
				$(".stickyMenu").show();
				$(this).parent().fadeOut();
				imgNum = 0;


			});


		});
	};

})(jQuery);

$(document).ready(function(){

  $(".img-container").popupLightbox();

  $('.single-item').slick({
  	dots: true,
  	infinite: true,
  	autoplay: true,
  	autoplaySpeed: 5000
  });

  $('.stickyMenu').smoothMenu({
	  stickyMenu: true,
	  slidingLine: true
	});

  if ( $( window ).width() < 600) {
  	$("nav").removeClass("stickyMenu");
  }else{
  	$("nav").addClass("stickyMenu");
  }
  
});

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: -34.397, lng: 150.644},
	  zoom: 8
	});
var marker = new google.maps.Marker({position: {lat: -34.397, lng: 150.644}, map: map});
}
/*!
JQuery Sticky Menu Plugin - 0.1.1
Copyright © 2018 Rajib karmaker
Licensed under the MIT license.
https://github.com/rajibchandrakarmaker/stickyNavigation.git
*/
;( function( $ ) {

    'use strict';
  
    var defaults = {
      menuSpeedAnimate:             600,
      pageNavigationSpeedAnimate:   1500,
      btnClassMenu:                 'btn-menu',
      stickyMenu:                   false,
      stickyMenuClassName:          'fixed',
      slidingLine:                  false,
      slidingLineClassName:         'sliding-line',
      slidingLineClassNameActive:   'active',
      slidingLineColor:             '#306EFF',
      slidingLineHeight:            '3px',
      slidingLineSpeedAnimate:      200,
      winMobWidth:                  585,
      trackedClassName:             'tracked'
    };
  
  
    function smoothMenu( element, options, Waypoint ) {
  
      this.config = $.extend( { }, defaults, options );
      this.element = element;
      this.Waypoint = Waypoint;
  
      this.init( );
  
    }
  
  
    smoothMenu.prototype.init = function( ) {
  
      var conf = this.config;
      this.getClasses( );
      this.smoothMenu( );
      this.smoothMenuStyles( );
  
      conf.stickyMenu && this.stickyMenu( );
      conf.slidingLine && this.slidingLine( );
  
    };
  
    smoothMenu.prototype.tools = {
  
      getMaxOfArray: function( arr ) {
  
          return Math.max.apply(null, arr);
  
      },
  
      getKeyByValue: function( obj, value ) {
  
          for ( var prop in obj ) {
              if ( obj.hasOwnProperty( prop ) ) {
                  if ( obj[ prop ] === value ) {
                      return prop;
                  }
              }
          }
  
      }
  
    };
  
  
    smoothMenu.prototype.getClasses = function( ) {
  
      var conf = this.config;
  
      function getClass( name ) {
        return '.' + name;
      };
  
      this.btnClassMenu = getClass( conf.btnClassMenu );
      this.slidingLineClassName = getClass( conf.slidingLineClassName );
      this.slidingLineClassNameActive = getClass( conf.slidingLineClassNameActive );
      this.trackedClassName = getClass( conf.trackedClassName );
  
    };
  
    smoothMenu.prototype.smoothMenuStyles = function( ) {
  
      var self = this,
        el = this.element,
        _window = $( window );
  
      el.css({
        'display': 'block',
        'position': 'relative',
        'width': '100%'
      });
  
      el.find( 'ul a' ).css({
        'cursor': 'pointer',
        'display': 'block',
        'text-decoration': 'none'
      });
  
      function refreshsmoothMenuStyles( ) {
  
        if ( _window.width() < self.config.winMobWidth ) {
          el.find( 'ul' ).css({
            'position': 'absolute',
            'width': '100%'
          });
          el.find( 'li' ).css({
            'display': 'block'
          });
          el.find( self.btnClassMenu ).css({
            'display': 'block',
            'text-decoration': 'none'
          });
        } else {
          el.find( 'ul' ).css({
            'width': '100%'
          });
          el.find( 'li' ).css({
            'display': 'inline-block'
          });
          el.find( self.btnClassMenu ).css({
            'display': 'none'
          });
        }
  
      }
  
      refreshsmoothMenuStyles( );
  
      _window.resize( function( ) {
  
        refreshsmoothMenuStyles( );
  
      });
  
    };
  
  
    smoothMenu.prototype.smoothMenu = function( ) {
  
      var conf = this.config,
          el = this.element,
          _window = $( window ),
          menuUl = el.find( 'ul' ),
          menuLi = el.find( 'li' ),
          btnMenu = el.find( this.btnClassMenu ),
          winMobWidth = conf.winMobWidth,
          top = 0;
  
      if ( _window.width( ) < winMobWidth ) {
        menuUl.hide( );
      }
  
      btnMenu.click( function( ) {
  
        menuUl.slideToggle( conf.menuSpeedAnimate );
  
      });
  
      menuLi.on( 'click', 'a', function( e ) {
        e.preventDefault( );
  
        var id = $( this ).attr( 'href' );
        top = $( id ).offset( ).top - menuLi.outerHeight( true );
  
  
        $( 'body, html' ).animate({
          scrollTop: top
        }, conf.pageNavigationSpeedAnimate);
  
      });
  
      _window.resize( function( ) {
  
        if ( _window.width( ) > winMobWidth ) {
          menuUl.removeAttr( 'style' );
        } else {
          menuUl.hide( );
        }
  
      });
  
    };
  
  
    smoothMenu.prototype.stickyMenu = function( ) {
  
      var conf = this.config,
          stickyMenuClassName = conf.stickyMenuClassName,
          el = this.element,
          _window = $( window ),
          menuClone = $( '<div/>' ).insertAfter( el ),
          menuHeight = 0, // height of menu
          menuPosition = 0, // height of menu
          menuClonePosition = 0, // position of  clone menu
          windowPosition = 0; // position of window
  
      function addStickyStyles( ) {
  
        el.addClass( stickyMenuClassName );
        el.css({
          'position': 'fixed',
          'top': '0',
        });
  
      }
  
      function removeStickyStyles( ) {
  
        el.removeClass( stickyMenuClassName );
        el.css({
          'position': 'relative',
          'top': '',
        });
  
      }
  
      function refresh( ) {
  
        menuHeight = el.outerHeight( true );
        menuPosition = menuClone.offset().top;
  
      }
  
      function refreshClone() {
  
        menuClonePosition = menuClonePosition === 0 ? menuPosition : menuClone.offset().top;
  
      }
  
      refresh( );
  
      menuClone.css( 'height', menuHeight ).hide( );
  
      refreshClone( );
  
      _window.resize( function () {
          refresh();
          refreshClone( );
      } );
  
      _window.scroll( function( ) {
  
        windowPosition = _window.scrollTop( );
  
        if ( windowPosition >= menuClonePosition +30 ) {
          addStickyStyles( );
          menuClone.show( );
        } else {
          removeStickyStyles( );
          menuClone.hide( );
        }
  
      });
  
    };
  
    smoothMenu.prototype.scrollSpy = function( heightMenu ) {
      var self = this,
          _window = $( window );
  
  
      function getCurrentSection( obj, num ) {
          var arr = [ ];
          for ( var key in obj ) {
            if ( obj.hasOwnProperty( key ) ) {
              var item = obj[ key ];
              if ( item <= num ) {
                arr.push( item );
              }
            }
          }
  
          if ( arr.length === 0 ) {
              return null;
          } else  if ( arr.length === 1 ) {
              return  self.tools.getKeyByValue( obj, arr[ 0 ] );
          }
  
          return self.tools.getKeyByValue( obj, self.tools.getMaxOfArray( arr ) );
      }
  
        var jSections = $( self.trackedClassName );
        var sections = { };
        jSections.each( function( index, element ) {
            sections[ element.id ] = element.offsetTop;
        });
  
        var curId, lastId;
  
        _window.scroll( function ( ) {
  
          var scrollPosition = _window.scrollTop( );
  
          curId = getCurrentSection( sections, scrollPosition + heightMenu + 35);
          if ( curId ) {
              if ( lastId !== curId ) {
                  lastId = curId;
                  self.changeMenuItem( curId );
              }
          }
  
        });
    }
  
  
    smoothMenu.prototype.slidingLine = function( ) {
  
      var self = this,
          conf = this.config,
          el = this.element,
          _window = $( window ),
          line,
          active = conf.slidingLineClassNameActive,
          activeLi,
          menuLi = el.find( 'li' ),
          lineWidth,
          liPos;
  
      function insertLine( ) {
  
        if ( el.find( self.slidingLineClassName ).length === 0 ) {
          line = $( '<div class="' + conf.slidingLineClassName + '">' ).appendTo( el );
        }
  
      }
  
      function refreshPosition( ) {
  
        activeLi = el.find( 'li.' + active );
        if ( activeLi.length !== 0 ) {
          lineWidth = activeLi.outerWidth( );
          liPos = activeLi.position( ).left;
        }
  
      }
  
      function setLine( ) {
  
        line.css({
          'position': 'absolute',
          'background-color': conf.slidingLineColor,
          'bottom': '0',
          'height': conf.slidingLineHeight
        }).animate({
          'left': liPos,
          'width': lineWidth
        }, conf.slidingLineSpeedAnimate);
  
      }
  
      function checkMob( ) {
  
        _window.width( ) > conf.winMobWidth ? line.show( ) : line.hide( );
  
      }
  
      function moveLine( ) {
  
        refreshPosition( );
        setLine( );
  
      }
  
      function refreshLine( ) {
  
        insertLine( );
        moveLine( );
        checkMob( );
  
      }
  
        self.changeMenuItem = function ( hash ) {
        menuLi.removeClass( active );
        menuLi.each(function( ) {
          if ( $( this ).children( 'a' ).attr( 'href' ).slice( 1 ) === hash ) {
            $( this ).addClass( active );
            moveLine( );
          }
  
        });
      }
  
      refreshLine( );
  
      if ( !$.isEmptyObject( self.Waypoint ) ) {
        var waypointTracked = $( self.trackedClassName );
  
        waypointTracked.waypoint({
          handler: function( ) {
              self.changeMenuItem( this.element.id );
          },
          offset: '30%'
        });
        waypointTracked.waypoint({
          handler: function( ) {
              self.changeMenuItem( this.element.id );
          },
          offset: -menuLi.outerHeight( true )
        });
      } else {
          self.scrollSpy( menuLi.outerHeight( true ) );
      }
  
      _window.resize( function( ) {
  
        refreshLine( );
  
      });
  
    };
  
  
    $.fn.smoothMenu = function( options ) {
  
      var first = this.first( );
      options = options || { };
      var Waypoint = window.Waypoint || { };
      new smoothMenu( first, options, Waypoint );
      return first;
  
    };
  
  } )( jQuery );
  