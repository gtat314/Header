var HeaderIcons = {
    'left': "<svg class='rotate180' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='m5 3 3-3 12 12L8 24l-3-3 9-9z'/></svg>"
};




/**
 * 
 * @param {Object}                   schema
 * @param {HTMLElement|CSSRule}     [schema.parent]
 * @param {Object}                   schema.main
 * @param {HTMLSourceElement}        schema.main.title
 * @param {HTMLSourceElement}       [schema.main.subtitle]
 * @param {Array}                   [schema.main.classes]
 * @param {SVGElement}              [schema.back]
 * @param {Object}                  [schema.left]
 * @param {URL}                      schema.left.link
 * @param {HTMLSourceElement}       [schema.left.title]
 * @param {SVGElement}              [schema.left.icon]
 * @param {HTMLSourceElement}       [schema.left.subtitle]
 * @param {Object}                  [schema.tag]
 * @param {String}                  [schema.tag.title]
 * @param {String}                  [schema.tag.separator]
 * @param {String}                  [schema.tag.site]
 * @param {Object}                  [schema.action]
 * @param {HTMLSourceElement}        schema.action.title
 * @param {Array}                   [schema.action.classes]
 * @param {SVGElement}              [schema.action.icon]
 * @param {Function}                [schema.action.onClick]
 * @param {Object[]}                [schema.action.eventListeners]
 * @param {String}                   schema.action.eventListeners[].type
 * @param {Function}                 schema.action.eventListeners[].listener
 */
function Header ( schema ) {

    /**
     * 
     * @property
     * @private
     */
    this._schema = schema;

    /**
     * 
     * @property
     * @private
     */
    this._mainTitleElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._mainSubtitleElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._leftTitleElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._leftSubtitleElem = null;




    let iconLeftSrc     = HeaderIcons[ 'left' ];
    let headerElem      = null;

    if ( this._schema.hasOwnProperty( 'parent' ) ) {

        if ( typeof this._schema.parent === 'object' ) {

            headerElem = schema.parent;

        } else if ( typeof this._schema.parent === 'string' ) {

            headerElem = document.querySelector( schema.parent );

        }

    } else {

        headerElem = document.querySelector( 'header' );

    }

    let fragment = document.createDocumentFragment();

    if ( this._schema.hasOwnProperty( 'left' ) ) {

        if ( this._schema.left.hasOwnProperty( 'icon' ) ) {

            iconLeftSrc = this._schema.left.icon;

        }

        const leftElem = document.createElement( 'A' );
        leftElem.classList.add( 'leftMain' );
        leftElem.setAttribute( 'href', this._schema.left.link );
        fragment.appendChild( leftElem );

        const iconElem = document.createElement( 'SPAN' );
        iconElem.classList.add( 'icon' );
        iconElem.innerHTML = iconLeftSrc;
        leftElem.appendChild( iconElem );

        const textElem = document.createElement( 'DIV' );
        textElem.classList.add( 'text' );
        leftElem.appendChild( textElem );

        if ( this._schema.left.hasOwnProperty( 'title' ) ) {

            this._leftTitleElem = document.createElement( 'P' );
            this._leftTitleElem.classList.add( 'title' );
            this._leftTitleElem.innerHTML = this._schema.left.title;
            textElem.appendChild( this._leftTitleElem );

        }

        if ( this._schema.left.hasOwnProperty( 'subtitle' ) ) {

            this._leftSubtitleElem = document.createElement( 'SAMP' );
            this._leftSubtitleElem.classList.add( 'subtitle' );
            this._leftSubtitleElem.innerHTML = this._schema.left.subtitle;
            textElem.appendChild( this._leftSubtitleElem );

        }

    }

    if ( this._schema.hasOwnProperty( 'back' ) ) {

        const backElem = document.createElement( 'DIV' );
        backElem.classList.add( 'left' );
        fragment.appendChild( backElem );

        const iconElem = document.createElement( 'SPAN' );
        iconElem.classList.add( 'icon' );
        iconElem.innerHTML = this._schema.back;
        backElem.appendChild( iconElem );

        iconElem.addEventListener( 'click', this._evt_click_iconElem.bind( this ) );

    }

    if ( this._schema.hasOwnProperty( 'main' ) ) {

        const mainElem = document.createElement( 'DIV' );
        mainElem.classList.add( 'main' );
        fragment.appendChild( mainElem );

        if ( this._schema.main.hasOwnProperty( 'classes' ) ) {

            for ( const classStr of this._schema.main.classes ) {

                mainElem.classList.add( classStr );

            }

        }

        this._mainTitleElem = document.createElement( 'P' );
        this._mainTitleElem.classList.add( 'title' );
        this._mainTitleElem.innerHTML = this._schema.main.title;
        mainElem.appendChild( this._mainTitleElem );

        if ( this._schema.main.hasOwnProperty( 'subtitle' ) ) {

            this._mainSubtitleElem = document.createElement( 'SAMP' );
            this._mainSubtitleElem.classList.add( 'subtitle' );
            this._mainSubtitleElem.innerHTML = this._schema.main.subtitle;
            mainElem.appendChild( this._mainSubtitleElem );
    
        }

    }

    if ( this._schema.hasOwnProperty( 'action' ) ) {

        const actionElem = document.createElement( 'DIV' );
        actionElem.classList.add( 'action' );
        fragment.appendChild( actionElem );

        if ( this._schema.action.hasOwnProperty( 'classes' ) ) {

            for ( const classStr of this._schema.action.classes ) {

                actionElem.classList.add( classStr );

            }

        }

        if ( this._schema.action.hasOwnProperty( 'icon' ) ) {

            const actionIconElem = document.createElement( 'SPAN' );
            actionIconElem.classList.add( 'icon' );
            actionIconElem.innerHTML = this._schema.action.icon;
            actionElem.appendChild( actionIconElem );

        }

        const actionTitleElem = document.createElement( 'P' );
        actionTitleElem.classList.add( 'title' );
        actionTitleElem.innerHTML = this._schema.action.title;
        actionElem.appendChild( actionTitleElem );

        if ( this._schema.action.hasOwnProperty( 'eventListeners' ) ) {

            for ( const eventListener of this._schema.action.eventListeners ) {

                actionElem.addEventListener( eventListener.type, eventListener.listener );

            }

        }

        if ( this._schema.action.hasOwnProperty( 'onClick' ) ) {

            actionElem.addEventListener( 'click', this._schema.action.onClick );

        }

    }

    if ( this._schema.hasOwnProperty( 'subnav' ) ) {

        const subnavElem = document.createElement( 'DIV' );
        subnavElem.classList.add( 'subnav' );
        fragment.appendChild( subnavElem );

        if ( this._schema.subnav.hasOwnProperty( 'classes' ) ) {

            for ( const classStr of this._schema.subnav.classes ) {

                subnavElem.classList.add( classStr );

            }

        }

        for ( const button of this._schema.subnav.buttons ) {

            const buttonElem = document.createElement( 'A' );
            buttonElem.classList.add( 'subnavTitle' );
            buttonElem.innerHTML = button.title;
            buttonElem.setAttribute( 'href', button.link );
            subnavElem.appendChild( buttonElem );

            if ( button.link === window.location.pathname ) {

                buttonElem.classList.add( 'active' );

            }

        }

    }

    headerElem.appendChild( fragment );

    if ( this._schema.hasOwnProperty( 'tag' ) ) {

        let titleToTag;

        if ( this._schema.tag.hasOwnProperty( 'title' ) ) {

            titleToTag = this._schema.tag.title;

        } else {

            titleToTag = this._schema.main.title;

        }

        if ( this._schema.tag.hasOwnProperty( 'site' ) ) {

            if ( this._schema.tag.hasOwnProperty( 'separator' ) ) {

                titleToTag = titleToTag + ' ' + this._schema.tag.separator;

            } else {

                titleToTag = titleToTag + ' |';

            }

            titleToTag = titleToTag + ' ' + this._schema.tag.site;

        }

        document.title = titleToTag;

    }

    if ( document.querySelector( 'header .subnav a.active' ) ) {

        document.querySelector( 'header .subnav a.active' ).scrollIntoView( true );

    }

};

/**
 * 
 * @param {String} title 
 */
Header.prototype.setMainTitle = function( title ) {

    this._mainTitleElem.innerHTML = title;

};

/**
 * 
 * @param {String} subtitle 
 */
Header.prototype.setMainSubtitle = function( subtitle ) {

    this._mainSubtitleElem.innerHTML = subtitle;

};

/**
 * 
 * @param {String} title 
 */
Header.prototype.setLeftTitle = function( title ) {

    this._leftTitleElem.innerHTML = title;

    this._schema.left.title = title;

};

/**
 * 
 * @param {String} subtitle 
 */
Header.prototype.setLeftSubtitle = function( subtitle ) {

    this._leftSubtitleElem.innerHTML = subtitle;

    this._schema.left.subtitle = subtitle;

};




/**
 * 
 * @private
 */
Header.prototype._evt_click_iconElem = function() {

    window.parent.postMessage( 'clickHeaderBack', '*' );

    if ( document.referrer ) {

        location.href = document.referrer;

    } else {

        history.back();

    }

};